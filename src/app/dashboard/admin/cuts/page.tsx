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
import { Cut } from '@/services/definitions';
import { CUTS_BASE_URL, CUT_ID_BASE_URL } from '@/services/links';
import useUserStore from '../../../../../store/authStore';
import { Popover } from '@nextui-org/react';
import { toast } from 'react-toastify';

export default function CutTable() {
    const [cuts, setCuts] = useState<Cut[]>([]);
    const [filterValue, setFilterValue] = useState<string>("");
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [page, setPage] = useState<number>(1);
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "name",
        direction: "ascending",
    });
    const router = useRouter();
    const { token, user, role } = useUserStore();
    const [selectedCut, setSelectedCut] = useState<Cut | null>(null);
    const [isPopoverOpen, setIsPopoverOpen] = useState<number | null>(null);

    useEffect(() => {
        if (!user || !role.includes('super-admin')) {
            window.location.href = '/';
        }
    }, [user, role]);


    useEffect(() => {
        fetch(CUTS_BASE_URL, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => setCuts(data))
            .catch(error => console.error('Error fetching cuts:', error));
    }, [token]);

    const handleSortChange = (column: keyof Cut) => {
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
        if (!filterValue) return cuts;
        return cuts.filter(cut =>
            cut.name.toLowerCase().includes(filterValue.toLowerCase())
        );
    }, [cuts, filterValue]);

    const sortedItems = useMemo(() => {
        const sorted = [...filteredItems];
        sorted.sort((a, b) => {
            const first = a[sortDescriptor.column as keyof Cut];
            const second = b[sortDescriptor.column as keyof Cut];
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

    const deleteCut = async (cutId: number) => {
        try {
            await fetch(`${CUT_ID_BASE_URL}${cutId}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                // credentials: 'include',
            });
            setCuts(prevCuts => prevCuts.filter(cut => cut.id !== cutId));
            toast.success("¡Corte eliminado correctamente!")
        } catch (error) {
            console.error('Error deleting cut:', error);
        }
    };

    const confirmDelete = (cut: Cut) => {
        setSelectedCut(cut);
        setIsPopoverOpen(cut.id);
    };

    const handleDelete = () => {
        if (selectedCut) {
            deleteCut(selectedCut.id);
            setIsPopoverOpen(null);
        }
    };

    const showCut = (cutId: number) => {
        router.push(`/dashboard/admin/cuts/cutView/${cutId}`);
    };

    const editCut = (cutId: number) => {
        router.push(`/dashboard/admin/cuts/cutUpdate/${cutId}`);
    };

    return (
        <div className="w-full flex flex-col items-center justify-center m-5 p-4">
            <h1 className="text-4xl font-bold mb-20">Panel de Corte</h1>
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
                        <TableColumn onClick={() => handleSortChange('name')} className='cursor-pointer text-md'>
                            Nombre {sortDescriptor.column === 'name' && (sortDescriptor.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />)}
                        </TableColumn>
                        <TableColumn onClick={() => handleSortChange('description')} className='cursor-pointer text-md'>
                            Descripción {sortDescriptor.column === 'description' && (sortDescriptor.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />)}
                        </TableColumn>
                        <TableColumn onClick={() => handleSortChange('weight')} className='cursor-pointer text-md'>
                            Peso/g {sortDescriptor.column === 'weight' && (sortDescriptor.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />)}
                        </TableColumn>
                        <TableColumn className='text-md text-center'>
                            Acciones
                        </TableColumn>
                    </TableHeader>
                    <TableBody>
                        {paginatedItems.map((cut) => (
                            <TableRow key={cut.id}>
                                <TableCell className="hover:bg-gray-100 text-sm">{cut.name}</TableCell>
                                <TableCell className="hover:bg-gray-100 text-sm">{cut.description}</TableCell>
                                <TableCell className="hover:bg-gray-100 text-sm">{cut.weight}</TableCell>
                                <TableCell className="hover:bg-gray-100">
                                    <div className="flex gap-2">
                                        <Button isIconOnly radius="full" size="sm" variant="light" onClick={() => editCut(cut.id)}>
                                            <Tooltip content="Editar">
                                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50 active:scale-90 transition-all">
                                                    <GoPencil className="text-green-500 h-4 w-4" />
                                                </span>
                                            </Tooltip>
                                        </Button>
                                        <Button isIconOnly radius="full" size="sm" variant="light" onClick={() => showCut(cut.id)}>
                                            <Tooltip content="Detalles">
                                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50 active:scale-90 transition-all">
                                                    <IoEyeOutline className="text-blue-400 h-4 w-4" />
                                                </span>
                                            </Tooltip>
                                        </Button>
                                        <Button isIconOnly radius="full" size="sm" variant="light">
                                            <Tooltip content="Eliminar">
                                                <span>
                                                    <Popover isOpen={isPopoverOpen === cut.id} onClose={() => setIsPopoverOpen(null)} backdrop="blur">
                                                        <PopoverTrigger>
                                                            <span onClick={() => confirmDelete(cut)} className="text-lg text-danger cursor-pointer active:opacity-50 active:scale-90 transition-all">
                                                                <CiTrash className="text-red-700 h-4 w-4" />
                                                            </span>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-[240px]">
                                                            <div className="p-4">
                                                                <p>¿Estás seguro de que quieres eliminar este corte?</p>
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
