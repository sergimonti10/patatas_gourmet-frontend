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
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@nextui-org/react";
import { CiSearch, CiTrash } from "react-icons/ci";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import { IoMdMore } from "react-icons/io";
import { useRouter } from 'next/navigation';
import { Order } from '@/services/definitions';
import { DOWNLOAD_PDF_BASE_URL, IMAGE_PRODUCTS_BASE_URL, IMAGE_USERS_BASE_URL, ORDERS_BASE_URL } from '@/services/links';
import useUserStore from '../../../../store/authStore';
import { toast } from 'react-toastify';
import { Modal, ModalContent, ModalHeader, ModalBody, DateRangePicker, RangeValue, DateValue } from "@nextui-org/react";
import { FcCancel } from "react-icons/fc";
import { fontClasses } from '@/app/components/fonts';
import { LoadingTable } from '@/app/components/general/skeletons';

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
    const [dateRange, setDateRange] = useState<RangeValue<DateValue> | null>(null);
    const [isPopoverOpen, setIsPopoverOpen] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            window.location.href = '/';
        }
    }, [user]);

    useEffect(() => {
        fetch(ORDERS_BASE_URL, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                if (role.includes('user')) {
                    const filteredOrders = data.filter((order: Order) => order.id_user === user.id);
                    setOrders(filteredOrders);
                    setIsLoading(false);
                } else {
                    setOrders(data);
                    setIsLoading(false);
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

    const convertDateValueToDate = (dateValue: DateValue): Date => {
        const { year, month, day } = dateValue;
        return new Date(year, month - 1, day);
    };

    const filteredItems = useMemo(() => {
        let filtered = orders;

        if (filterValue) {
            filtered = filtered.filter(order =>
                order.id.toString().includes(filterValue) ||
                order.status.toLowerCase().includes(filterValue.toLowerCase()) ||
                order.user.email.toLowerCase().includes(filterValue.toLocaleLowerCase())
            );
        }
        if (dateRange && dateRange.start && dateRange.end) {
            const startDate = convertDateValueToDate(dateRange.start);
            const endDate = convertDateValueToDate(dateRange.end);
            endDate.setDate(endDate.getDate() + 1)

            filtered = filtered.filter(order => {
                const orderDate = new Date(order.date_order);
                return orderDate >= startDate && orderDate <= endDate;
            });
        }

        return filtered;
    }, [orders, filterValue, dateRange]);

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

    const handleStatusChange = async (orderId: number, newStatus: Order['status']) => {
        let updateData: { status: Order['status']; date_deliver?: string } = { status: newStatus };

        if (newStatus === 'entregado') {
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
                setOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order.id === orderId ? { ...order, ...updateData } : order
                    )
                );
                toast.success(`¡Pedido ${orderId} actualizado a ${newStatus} correctamente!`);
            } else {
                toast.error(`Error al actualizar el pedido ${orderId}`);
            }
        } catch (error) {
            toast.error(`Error al actualizar el pedido ${orderId}`);
        }
        setIsPopoverOpen(null);
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

    const generateInvoice = async (orderId: number) => {
        return toast.promise(
            fetch(`${DOWNLOAD_PDF_BASE_URL}/${orderId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/pdf',
                },
            }).then(async (pdfResponse) => {
                if (pdfResponse.ok) {
                    const blob = await pdfResponse.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `factura_patatas-gourmet_${orderId}.pdf`;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    window.URL.revokeObjectURL(url);
                    return "Factura generada correctamente";
                } else {
                    throw new Error('Error al generar la factura');
                }
            }),
            {
                pending: 'Generando factura...',
                success: 'Factura generada correctamente',
                error: 'Error al generar la factura',
            }
        );
    };

    const confirmDelete = (order: Order) => {
        setSelectedOrder(order);
        setIsPopoverOpen(order.id);
    };

    const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(event.target.value));
        setPage(1);
    };

    return (
        <>
            <div className="flex justify-between items-center w-full mb-4">
                <DateRangePicker
                    label="Rango de fechas"
                    className="max-w-xs mb-4"
                    onChange={setDateRange}
                />
                <select
                    value={rowsPerPage}
                    onChange={handleRowsPerPageChange}
                    className="border p-2 rounded"
                >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </select>
            </div>
            <div className="w-full flex flex-col items-center justify-center m-5 p-4">
                <h1 className="text-4xl font-bold mb-20">Panel de Pedidos</h1>
                <Input
                    isClearable
                    classNames={{
                        base: "w-full sm:max-w-[33%]",
                        inputWrapper: "border-1",
                    }}
                    placeholder="Buscar por ID, estado o email..."
                    size="sm"
                    startContent={<CiSearch className="text-default-300" />}
                    value={filterValue}
                    variant="bordered"
                    onClear={() => setFilterValue("")}
                    onChange={handleSearchChange}
                />
                <div className="w-full overflow-auto">
                    {Array.isArray(role) && role.includes('user') && orders.length === 0 ? (
                        <h3 className='text-center m-10'>¡Todavía no tienes ningún pedido, realiza tu primer pedido!</h3>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableColumn onClick={() => handleSortChange('id')} className='cursor-pointer text-md'>
                                    Número de Pedido {sortDescriptor.column === 'id' && (sortDescriptor.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />)}
                                </TableColumn>
                                <TableColumn onClick={() => handleSortChange('id_user')} className='cursor-pointer text-md'>
                                    Usuario {sortDescriptor.column === 'id_user' && (sortDescriptor.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />)}
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
                            {isLoading ? (
                                <TableBody>
                                    {Array.from({ length: 10 }).map((_, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="hover:bg-amber-50 text-sm">
                                                <div className="animate-pulse bg-gray-300 h-4 w-16 rounded"></div>
                                            </TableCell>
                                            <TableCell className="hover:bg-amber-50 text-sm">
                                                <div className="animate-pulse bg-gray-300 h-4 w-32 rounded"></div>
                                            </TableCell>
                                            <TableCell className="hover:bg-amber-50 text-sm">
                                                <div className="animate-pulse bg-gray-300 h-4 w-24 rounded"></div>
                                            </TableCell>
                                            <TableCell className="hover:bg-amber-50 text-sm">
                                                <div className="animate-pulse bg-gray-300 h-4 w-24 rounded"></div>
                                            </TableCell>
                                            <TableCell className="hover:bg-amber-50 text-sm">
                                                <div className="animate-pulse bg-gray-300 h-4 w-20 rounded"></div>
                                            </TableCell>
                                            <TableCell className="hover:bg-amber-50 text-center">
                                                <div className="flex justify-center">
                                                    <div className="animate-pulse bg-gray-300 h-8 w-8 rounded-full"></div>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>) : (
                                <TableBody>
                                    {paginatedItems.map((order) => (
                                        <TableRow className='cursor-pointer' key={order.id} onClick={(e) => { if (isPopoverOpen !== order.id) openOrderDetails(order.id); }}>
                                            <TableCell className="hover:bg-amber-50 text-sm">{order.id}</TableCell>
                                            <TableCell className="hover:bg-amber-50 text-sm">{order.user?.email}</TableCell>
                                            <TableCell className="hover:bg-amber-50 text-sm">{order.date_order}</TableCell>
                                            <TableCell className="hover:bg-amber-50 text-sm">{order.date_deliver || 'N/A'}</TableCell>
                                            <TableCell className="hover:bg-amber-50 text-sm">{order.status}</TableCell>
                                            <TableCell className="hover:bg-amber-50 text-center">
                                                {role && role.includes('super-admin') ? (
                                                    <Tooltip content="Eliminar">
                                                        <Button isIconOnly radius="full" size="sm" variant="light" onClick={(e) => { e.stopPropagation(); cancelOrder(order.id); }}>
                                                            <CiTrash className="text-red-700 h-4 w-4" />
                                                        </Button>
                                                    </Tooltip>
                                                ) : role && role.includes('admin') && (order.status !== 'entregado' && order.status !== 'cancelado') ? (
                                                    <Tooltip content="Actualizar estado">
                                                        <span>
                                                            <Popover isOpen={isPopoverOpen === order.id} onOpenChange={(open) => setIsPopoverOpen(open ? order.id : null)} showArrow offset={10} placement="bottom" backdrop="blur">
                                                                <PopoverTrigger>
                                                                    <Button isIconOnly radius="full" size="sm" variant="light" onClick={(e) => { e.stopPropagation(); setIsPopoverOpen(order.id); }}>
                                                                        <IoMdMore className="text-amber-900 h-4 w-4" />
                                                                    </Button>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-[240px]">
                                                                    <div className="p-3">
                                                                        <p>Actualizar estado del pedido {order.id}</p>
                                                                        <div className="flex flex-col mt-4 gap-1">
                                                                            <Button color='warning' onClick={() => handleStatusChange(order.id, 'procesando')} variant="flat">Procesando</Button>
                                                                            <Button color='warning' onClick={() => handleStatusChange(order.id, 'reparto')} variant="flat">Reparto</Button>
                                                                            <Button color='warning' onClick={() => handleStatusChange(order.id, 'entregado')} variant="flat">Entregado</Button>
                                                                        </div>
                                                                    </div>
                                                                </PopoverContent>
                                                            </Popover>
                                                        </span>
                                                    </Tooltip>
                                                ) : role && role.includes('user') && (order.status === 'pendiente') ? (
                                                    <Tooltip content="Cancelar">
                                                        <Button isIconOnly radius="full" size="sm" variant="light" onClick={(e) => { e.stopPropagation(); setOrderToCancelled(order.id); }}>
                                                            <FcCancel className="h-4 w-4" />
                                                        </Button>
                                                    </Tooltip>
                                                ) : null}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            )}
                        </Table>
                    )}
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
                    <Modal size="3xl" isOpen={isOpen} onClose={onClose} className={`overflow-auto max-h-[80vh] bg-slate-100 text-amber-950 ${fontClasses['font-unna']}`}>
                        <ModalContent>
                            {() => (
                                <>
                                    <ModalHeader className='flex justify-between items-center'>
                                        <h2>Detalles del Pedido #{selectedOrder.id}</h2>
                                        {/* <Button
                                            size="lg"
                                            color='warning'
                                            variant='shadow'
                                            className="text-white mx-8 my-4"
                                            onClick={() => generateInvoice(selectedOrder.id)}
                                        >
                                            Generar factura
                                        </Button> */}
                                    </ModalHeader>
                                    <ModalBody>
                                        <p><strong>Fecha de Pedido:</strong> {selectedOrder.date_order}</p>
                                        <p><strong>Fecha de Entrega:</strong> {selectedOrder.date_deliver || 'N/A'}</p>
                                        <p><strong>Estado:</strong> {selectedOrder.status}</p>
                                        <p><strong>Subotal Precio:</strong> {selectedOrder.total_price} €</p>
                                        <p><strong>Total Precio (IVA: 21%):</strong> {(selectedOrder.total_price * 1.21).toFixed(2)} €</p>
                                        <p><strong>Total Productos:</strong> {selectedOrder.total_products}</p>

                                        <Divider className="my-6" />

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {selectedOrder.products.map(product => (
                                                <Card key={product.id} className='bg-amber-50 text-amber-950'>
                                                    <CardHeader>
                                                        <Avatar isBordered radius="full" size="lg" src={product.image} />
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
                                                <Avatar isBordered radius="full" size="md" src={selectedOrder.user?.image} />
                                                <div className="ml-4">
                                                    <h4 className="font-bold">{selectedOrder.user?.name} {selectedOrder.user?.surname}</h4>
                                                    <p>{selectedOrder.user?.email}</p>
                                                </div>
                                            </CardHeader>
                                            <CardBody>
                                                <p><strong>Teléfono:</strong> {selectedOrder.user?.phone}</p>
                                                <p><strong>Código Postal:</strong> {selectedOrder.user?.postal_code}</p>
                                                <p><strong>Localidad:</strong> {selectedOrder.user?.locality}</p>
                                                <p><strong>Provincia:</strong> {selectedOrder.user?.province}</p>
                                                <p><strong>Calle:</strong> {selectedOrder.user?.street}</p>
                                                <p><strong>Número:</strong> {selectedOrder.user?.number}</p>
                                                <p><strong>Piso:</strong> {selectedOrder.user?.floor}</p>
                                                <p><strong>Escalera:</strong> {selectedOrder.user?.staircase}</p>
                                            </CardBody>
                                        </Card>
                                    </ModalBody>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                )}
            </div>
        </>
    );
}
