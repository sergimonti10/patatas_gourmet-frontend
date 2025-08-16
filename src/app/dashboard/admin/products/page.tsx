'use client'

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
    Image,
    Tooltip,
    PopoverTrigger,
    PopoverContent
} from "@nextui-org/react";
import { CiSearch } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { CiTrash } from "react-icons/ci";
import { GoPencil } from "react-icons/go";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { Product } from '@/services/definitions';
import { IMAGE_PRODUCTS_BASE_URL, PRODUCTS_BASE_URL, PRODUCT_ID_BASE_URL } from '@/services/links';
import useUserStore from '../../../../../store/authStore';
import { Popover } from '@nextui-org/react';
import { toast } from 'react-toastify';

export default function ProductTable() {
    const [products, setProducts] = useState<Product[]>([]);
    const [filterValue, setFilterValue] = useState<string>("");
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [page, setPage] = useState<number>(1);
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "name",
        direction: "ascending",
    });
    const router = useRouter();
    const { token, user, role } = useUserStore();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isPopoverOpen, setIsPopoverOpen] = useState<number | null>(null);

    useEffect(() => {
        if (!user || !role.includes('super-admin')) {
            window.location.href = '/';
        }
    }, [user, role]);


    useEffect(() => {
        fetch(PRODUCTS_BASE_URL)
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const handleSortChange = (column: keyof Product) => {
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
        if (!filterValue) return products;
        return products.filter(product =>
            product.name.toLowerCase().includes(filterValue.toLowerCase())
        );
    }, [products, filterValue]);

    const sortedItems = useMemo(() => {
        const sorted = [...filteredItems];
        sorted.sort((a, b) => {
            const first = a[sortDescriptor.column as keyof Product] ?? '';
            const second = b[sortDescriptor.column as keyof Product] ?? '';
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

    const deleteProduct = async (productId: number) => {
        try {
            await fetch(`${PRODUCT_ID_BASE_URL}${productId}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                // credentials: 'include',
            });
            setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
            toast.success("¡Producto eliminado correctamente!")
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const confirmDelete = (product: Product) => {
        setSelectedProduct(product);
        setIsPopoverOpen(product.id);
    };

    const handleDelete = () => {
        if (selectedProduct) {
            deleteProduct(selectedProduct.id);
            setIsPopoverOpen(null);
        }
    };

    const showProduct = (productId: number) => {
        router.push(`/dashboard/admin/products/productView/${productId}`);
    };

    const editProduct = (productId: number) => {
        router.push(`/dashboard/admin/products/productUpdate/${productId}`);
    };

    return (
        <div className="w-full flex flex-col items-center justify-center m-5 p-4">
            <h1 className="text-4xl font-bold mb-20">Panel de Productos</h1>
            <Input
                isClearable
                classNames={{
                    base: "w-full sm:max-w-[33%]",
                    inputWrapper: "border-1",
                }}
                placeholder="Buscar por nombre..."
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
                        <TableColumn className='text-md'>Imagen</TableColumn>
                        <TableColumn onClick={() => handleSortChange('name')} className='cursor-pointer text-md'>
                            Nombre {sortDescriptor.column === 'name' && (sortDescriptor.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />)}
                        </TableColumn>
                        <TableColumn onClick={() => handleSortChange('description')} className='cursor-pointer text-md'>
                            Descripción {sortDescriptor.column === 'description' && (sortDescriptor.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />)}
                        </TableColumn>
                        <TableColumn onClick={() => handleSortChange('price')} className='cursor-pointer text-md'>
                            Precio/€ {sortDescriptor.column === 'price' && (sortDescriptor.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />)}
                        </TableColumn>
                        <TableColumn onClick={() => handleSortChange('weight')} className='cursor-pointer text-md'>
                            Peso/kg {sortDescriptor.column === 'weight' && (sortDescriptor.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />)}
                        </TableColumn>
                        <TableColumn className='text-md'>
                            Tipo de Corte
                        </TableColumn>
                        <TableColumn className='text-md text-center'>Acciones</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {paginatedItems.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell className="hover:bg-gray-100">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        className='w-10 h-10 rounded-xl'
                                    />
                                </TableCell>
                                <TableCell className="hover:bg-gray-100 text-sm">{product.name}</TableCell>
                                <TableCell className="hover:bg-gray-100 text-sm">{product.description}</TableCell>
                                <TableCell className="hover:bg-gray-100 text-sm">{product.price}</TableCell>
                                <TableCell className="hover:bg-gray-100 text-sm">{product.weight}</TableCell>
                                <TableCell className="hover:bg-gray-100 text-sm">{product.cut ? product.cut.name : 'N/A'}</TableCell>
                                <TableCell className="hover:bg-gray-100">
                                    <div className="flex gap-2">
                                        <Button isIconOnly radius="full" size="sm" variant="light" onClick={() => editProduct(product.id)}>
                                            <Tooltip content="Editar">
                                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50 active:scale-90 transition-all">
                                                    <GoPencil className="text-green-500 h-4 w-4" />
                                                </span>
                                            </Tooltip>
                                        </Button>
                                        <Button isIconOnly radius="full" size="sm" variant="light" onClick={() => showProduct(product.id)}>
                                            <Tooltip content="Detalles">
                                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50 active:scale-90 transition-all">
                                                    <IoEyeOutline className="text-blue-400 h-4 w-4" />
                                                </span>
                                            </Tooltip>
                                        </Button>
                                        <Button isIconOnly radius="full" size="sm" variant="light">
                                            <Tooltip content="Eliminar">
                                                <span>
                                                    <Popover isOpen={isPopoverOpen === product.id} onClose={() => setIsPopoverOpen(null)} backdrop="blur">
                                                        <PopoverTrigger>
                                                            <span onClick={() => confirmDelete(product)} className="text-lg text-danger cursor-pointer active:opacity-50 active:scale-90 transition-all">
                                                                <CiTrash className="text-red-700 h-4 w-4" />
                                                            </span>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-[240px]">
                                                            <div className="p-4">
                                                                <p>¿Estás seguro de que quieres eliminar este producto?</p>
                                                                <div className="flex justify-end mt-4">
                                                                    <Button onClick={() => setIsPopoverOpen(null)} variant="flat">Cancelar</Button>
                                                                    <Button onClick={handleDelete} color='danger'>Eliminar</Button>
                                                                </div>
                                                            </div>
                                                        </PopoverContent>
                                                    </Popover>
                                                </span>
                                            </Tooltip>
                                        </Button>
                                    </div>
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
        </div>
    );
}
