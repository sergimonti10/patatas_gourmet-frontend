'use client';

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    Pagination,
    SortDescriptor,
    useDisclosure,
    Divider,
    Card,
    CardHeader,
    CardBody,
    Avatar,
    Tooltip,
} from "@nextui-org/react";
import { CiSearch, CiTrash } from "react-icons/ci";
import { FaSortUp, FaSortDown, FaArrowRight } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { Order } from '@/services/definitions';
import { IMAGE_PRODUCTS_BASE_URL, IMAGE_USERS_BASE_URL, ORDERS_BASE_URL } from '@/services/links';
import useUserStore from '../../../../store/authStore';
import { toast } from 'react-toastify';
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import { FcCancel } from "react-icons/fc";

export default function OrdersTable() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [filterValue, setFilterValue] = useState<string>("");
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [page, setPage] = useState<number>(1);
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "date_order",
        direction: "descending",
    });
    const { token, role, user } = useUserStore();
    const router = useRouter();
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        fetch(ORDERS_BASE_URL, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                if (role === 'user') {
                    const filteredOrders = data.filter((order: Order) => order.id_user === user.id);
                    setOrders(filteredOrders);
                } else {
                    setOrders(data);
                }
            })
            .catch(error => console.error('Error fetching orders:', error));
    }, [token, role, user]);

    const handleSortChange = (column: keyof Order) => {
        setSortDescriptor(prev => {
            if (prev.column === column) {
                return {
                    column,
                    direction: prev.direction === "ascending" ? "descending" : "ascending",
                };
            } else {
                return {
                    column,
                    direction: "ascending",
                };
            }
        });
    };

    const filteredItems = useMemo(() => {
        if (!filterValue) return orders;
        return orders.filter(order =>
            order.id.toString().includes(filterValue) ||
            order.status.toLowerCase().includes(filterValue.toLowerCase())
        );
    }, [orders, filterValue]);

    const sortedItems = useMemo(() => {
        const sorted = [...filteredItems];
        sorted.sort((a, b) => {
            const first = a[sortDescriptor.column as keyof Order] ?? '';
            const second = b[sortDescriptor.column as keyof Order] ?? '';
            if (first < second) return sortDescriptor.direction === "ascending" ? -1 : 1;
            if (first > second) return sortDescriptor.direction === "ascending" ? 1 : -1;
            return 0;
        });
        return sorted;
    }, [filteredItems, sortDescriptor]);

    const paginatedItems = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return sortedItems.slice(start, end);
    }, [sortedItems, page, rowsPerPage]);

    const totalPages = useMemo(() => Math.ceil(filteredItems.length / rowsPerPage), [filteredItems, rowsPerPage]);

    const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterValue(event.target.value);
        setPage(1);
    }, []);

    const cancelOrder = async (orderId: number) => {
        try {
            await fetch(`${ORDERS_BASE_URL}/${orderId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
            toast.success(`¡Pedido ${orderId} eliminado correctamente!`);
        } catch (error) {
            toast.error(`Error al cancelar el pedido ${orderId}`);
        }
    };

    const toMySQLDateFormat = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const updateOrder = async (orderId: number, currentStatus: Order['status']): Promise<void> => {
        const statusOrder: Order['status'][] = ['pendiente', 'procesando', 'reparto', 'entregado', 'cancelado'];
        const nextStatusIndex: number = statusOrder.indexOf(currentStatus) + 1;

        if (nextStatusIndex >= statusOrder.length) {
            toast.error(`No se puede actualizar el pedido ${orderId} porque ya está en el estado final.`);
            return;
        }

        const nextStatus: Order['status'] = statusOrder[nextStatusIndex];
        let updateData: any = { status: nextStatus };

        if (nextStatus === 'entregado') {
            updateData.date_deliver = toMySQLDateFormat(new Date());
        }

        try {
            const response = await fetch(`${ORDERS_BASE_URL}/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateData)
            });

            if (response.ok) {
                setOrders((prevOrders: Order[]): Order[] =>
                    prevOrders.map((order: Order): Order =>
                        order.id === orderId ? { ...order, ...updateData } : order
                    )
                );
                toast.success(`¡Pedido ${orderId} actualizado a ${nextStatus} correctamente!`);
            } else {
                toast.error(`Error al actualizar el pedido ${orderId}`);
            }
        } catch (error) {
            toast.error(`Error al actualizar el pedido ${orderId}`);
        }
    };

    const setOrderToCancelled = async (orderId: number): Promise<void> => {
        try {
            const response = await fetch(`${ORDERS_BASE_URL}/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: 'cancelado' })
            });

            if (response.ok) {
                setOrders((prevOrders: Order[]): Order[] =>
                    prevOrders.map((order: Order): Order =>
                        order.id === orderId ? { ...order, status: 'cancelado' } : order
                    )
                );
                toast.success(`¡Pedido ${orderId} ha sido cancelado correctamente!`);
            } else {
                toast.error(`Error al cancelar el pedido ${orderId}`);
            }
        } catch (error) {
            toast.error(`Error al cancelar el pedido ${orderId}`);
        }
    };

    const openOrderDetails = async (orderId: number) => {
        try {
            const response = await fetch(`${ORDERS_BASE_URL}/${orderId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Error fetching order details');
            }

            const data = await response.json();
            console.log(data);
            setSelectedOrder(data);
            onOpen();
        } catch (error) {
            console.error('Error fetching order details:', error);
            toast.error('Error al obtener los detalles del pedido');
        }
    };

    return (
        <div className="w-full flex flex-col items-center justify-center m-5 p-4">
            <h1 className="text-4xl font-bold mb-20">Panel de Pedidos</h1>
            <Input
                isClearable
                classNames={{
                    base: "w-full sm:max-w-[33%]",
                    inputWrapper: "border-1",
                }}
                placeholder="Buscar por ID o estado..."
                size="sm"
                startContent={<CiSearch className="text-default-300" />}
                value={filterValue}
                variant="bordered"
                onClear={() => setFilterValue("")}
                onChange={handleSearchChange}
            />
            <div className="w-full overflow-auto">
                <Table>
                    <TableHeader>
                        <TableColumn onClick={() => handleSortChange('id')} className='cursor-pointer text-md'>
                            Número de Pedido {sortDescriptor.column === 'id' && (sortDescriptor.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />)}
                        </TableColumn>
                        <TableColumn onClick={() => handleSortChange('date_order')} className='cursor-pointer text-md'>
                            Fecha de Pedido {sortDescriptor.column === 'date_order' && (sortDescriptor.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />)}
                        </TableColumn>
                        <TableColumn onClick={() => handleSortChange('date_deliver')} className='cursor-pointer text-md'>
                            Fecha de Entrega {sortDescriptor.column === 'date_deliver' && (sortDescriptor.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />)}
                        </TableColumn>
                        <TableColumn onClick={() => handleSortChange('status')} className='cursor-pointer text-md'>
                            Estado {sortDescriptor.column === 'status' && (sortDescriptor.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />)}
                        </TableColumn>
                        <TableColumn className='text-md text-center'>Acciones</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {paginatedItems.map((order) => (
                            <TableRow className='cursor-pointer' key={order.id} onClick={() => openOrderDetails(order.id)}>
                                <TableCell className="hover:bg-gray-100 text-sm">{order.id}</TableCell>
                                <TableCell className="hover:bg-gray-100 text-sm">{order.date_order}</TableCell>
                                <TableCell className="hover:bg-gray-100 text-sm">{order.date_deliver || 'N/A'}</TableCell>
                                <TableCell className="hover:bg-gray-100 text-sm">{order.status}</TableCell>
                                <TableCell className="hover:bg-red-100 text-center">
                                    {role === 'super-admin' && (
                                        <Tooltip content="Eliminar">
                                            <Button isIconOnly radius="full" size="sm" variant="light" onClick={(e) => { e.stopPropagation(); cancelOrder(order.id); }}>
                                                <CiTrash className="text-red-700 h-4 w-4" />
                                            </Button>
                                        </Tooltip>
                                    )}
                                    {role === 'admin' && (order.status !== 'entregado' && order.status !== 'cancelado') && (
                                        <Tooltip content="Actualizar">
                                            <Button isIconOnly radius="full" size="sm" variant="light" onClick={(e) => { e.stopPropagation(); updateOrder(order.id, order.status); }}>
                                                <FaArrowRight className="text-amber-900 h-4 w-4" />
                                            </Button>
                                        </Tooltip>
                                    )}
                                    {role === 'user' && (order.status === 'pendiente') && (
                                        <Tooltip content="Cancelar">
                                            <Button isIconOnly radius="full" size="sm" variant="light" onClick={(e) => { e.stopPropagation(); setOrderToCancelled(order.id); }}>
                                                <FcCancel className="h-4 w-4" />
                                            </Button>
                                        </Tooltip>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <Pagination
                total={totalPages}
                initialPage={1}
                page={page}
                onChange={setPage}
                classNames={{
                    cursor: "bg-foreground text-background",
                }}
                showControls
                showShadow
                className="py-4"
            />

            {selectedOrder && (
                <Modal size="3xl" isOpen={isOpen} onClose={onClose} className="overflow-auto max-h-[80vh] bg-slate-100 text-amber-950">
                    <ModalContent>
                        {() => (
                            <>
                                <ModalHeader>
                                    <h2>Detalles del Pedido #{selectedOrder.id}</h2>
                                </ModalHeader>
                                <ModalBody>
                                    <p><strong>Fecha de Pedido:</strong> {selectedOrder.date_order}</p>
                                    <p><strong>Fecha de Entrega:</strong> {selectedOrder.date_deliver || 'N/A'}</p>
                                    <p><strong>Estado:</strong> {selectedOrder.status}</p>
                                    <p><strong>Total Precio:</strong> {selectedOrder.total_price} €</p>
                                    <p><strong>Total Productos:</strong> {selectedOrder.total_products}</p>

                                    <Divider className="my-6" />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {selectedOrder.products.map(product => (
                                            <Card key={product.id} className='bg-amber-50 text-amber-950'>
                                                <CardHeader>
                                                    <Avatar isBordered radius="full" size="lg" src={`${IMAGE_PRODUCTS_BASE_URL}${product.image}`} />
                                                    <div className="ml-4">
                                                        <h4 className="font-bold">{product.name}</h4>
                                                        <p><strong>Precio Unitario:</strong> {product.pivot.unit_price} €</p>
                                                        <p><strong>Cantidad:</strong> {product.pivot.quantity}</p>
                                                        <p><strong>Total:</strong> {product.pivot.quantity * product.pivot.unit_price} €</p>
                                                    </div>
                                                </CardHeader>
                                            </Card>
                                        ))}
                                    </div>

                                    <Divider className="my-6" />

                                    <Card className="mb-6 bg-amber-50 text-amber-950">
                                        <CardHeader>
                                            <Avatar isBordered radius="full" size="md" src={`${IMAGE_USERS_BASE_URL}${selectedOrder.user.image}`} />
                                            <div className="ml-4">
                                                <h4 className="font-bold">{selectedOrder.user.name} {selectedOrder.user.surname}</h4>
                                                <p>{selectedOrder.user.email}</p>
                                            </div>
                                        </CardHeader>
                                        <CardBody>
                                            <p><strong>Teléfono:</strong> {selectedOrder.user.phone}</p>
                                            <p><strong>Código Postal:</strong> {selectedOrder.user.postal_code}</p>
                                            <p><strong>Localidad:</strong> {selectedOrder.user.locality}</p>
                                            <p><strong>Provincia:</strong> {selectedOrder.user.province}</p>
                                            <p><strong>Calle:</strong> {selectedOrder.user.street}</p>
                                            <p><strong>Número:</strong> {selectedOrder.user.number}</p>
                                            <p><strong>Piso:</strong> {selectedOrder.user.floor}</p>
                                            <p><strong>Escalera:</strong> {selectedOrder.user.staircase}</p>
                                        </CardBody>
                                    </Card>
                                </ModalBody>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            )}
        </div>
    );
}
