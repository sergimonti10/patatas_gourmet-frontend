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
    PopoverContent,
    Image
} from "@nextui-org/react";
import { CiSearch } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { CiTrash } from "react-icons/ci";
import { GoPencil } from "react-icons/go";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { User } from '@/services/definitions';
import { IMAGE_USERS_BASE_URL, USERS_BASE_URL, USER_ID_BASE_URL } from '@/services/links';
import useUserStore from '../../../../../store/authStore';
import { Popover } from '@nextui-org/react';
import { toast } from 'react-toastify';

export default function UserTable() {
    const [users, setUsers] = useState<User[]>([]);
    const [filterValue, setFilterValue] = useState<string>("");
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [page, setPage] = useState<number>(1);
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "name",
        direction: "ascending",
    });
    const router = useRouter();
    const { token } = useUserStore();
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);


    useEffect(() => {
        fetch(USERS_BASE_URL, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                const usersWithRoles = data.map((user: User) => ({
                    ...user,
                    role: user.role
                }));
                setUsers(usersWithRoles);
            })
            .catch(error => console.error('Error fetching users:', error));
    }, [token]);

    const handleSortChange = (column: keyof User) => {
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
        if (!filterValue) return users;
        return users.filter(user =>
            user.name.toLowerCase().includes(filterValue.toLowerCase())
        );
    }, [users, filterValue]);

    const sortedItems = useMemo(() => {
        const sorted = [...filteredItems];
        sorted.sort((a, b) => {
            const first = a[sortDescriptor.column as keyof User];
            const second = b[sortDescriptor.column as keyof User];
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

    const deleteUser = async (userId: number) => {
        try {
            await fetch(`${USER_ID_BASE_URL}${userId}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                credentials: 'include',
            });
            setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
            toast.success("¡Usuario eliminado correctamente!")
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const confirmDelete = (user: User) => {
        setSelectedUser(user);
        setIsPopoverOpen(true);
    };

    const handleDelete = () => {
        if (selectedUser) {
            deleteUser(selectedUser.id);
            setIsPopoverOpen(false);
        }
    };

    const showUser = (userId: number) => {
        router.push(`/dashboard/admin/users/userView/${userId}`);
    };

    const editUser = (userId: number) => {
        router.push(`/dashboard/admin/users/userUpdate/${userId}`);
    };

    return (
        <div className="w-full flex flex-col items-center justify-center m-5 p-4">
            <h1 className="text-4xl font-bold mb-20">Panel de Usuario</h1>
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
                        <TableColumn onClick={() => handleSortChange('surname')} className='cursor-pointer text-md'>
                            Apellido {sortDescriptor.column === 'surname' && (sortDescriptor.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />)}
                        </TableColumn>
                        <TableColumn onClick={() => handleSortChange('email')} className='cursor-pointer text-md'>
                            Correo Electrónico {sortDescriptor.column === 'email' && (sortDescriptor.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />)}
                        </TableColumn>
                        <TableColumn onClick={() => handleSortChange('postal_code')} className='cursor-pointer text-md'>
                            Código Postal {sortDescriptor.column === 'postal_code' && (sortDescriptor.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />)}
                        </TableColumn>
                        <TableColumn onClick={() => handleSortChange('locality')} className='cursor-pointer text-md'>
                            Localidad {sortDescriptor.column === 'locality' && (sortDescriptor.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />)}
                        </TableColumn>
                        <TableColumn onClick={() => handleSortChange('province')} className='cursor-pointer text-md'>
                            Provincia {sortDescriptor.column === 'province' && (sortDescriptor.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />)}
                        </TableColumn>
                        <TableColumn onClick={() => handleSortChange('street')} className='cursor-pointer text-md'>
                            Calle {sortDescriptor.column === 'street' && (sortDescriptor.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />)}
                        </TableColumn>
                        <TableColumn onClick={() => handleSortChange('number')} className='cursor-pointer text-md'>
                            Número {sortDescriptor.column === 'number' && (sortDescriptor.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />)}
                        </TableColumn>
                        <TableColumn onClick={() => handleSortChange('floor')} className='cursor-pointer text-md'>
                            Piso {sortDescriptor.column === 'floor' && (sortDescriptor.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />)}
                        </TableColumn>
                        <TableColumn onClick={() => handleSortChange('staircase')} className='cursor-pointer text-md'>
                            Escalera {sortDescriptor.column === 'staircase' && (sortDescriptor.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />)}
                        </TableColumn>
                        <TableColumn onClick={() => handleSortChange('phone')} className='cursor-pointer text-md'>
                            Teléfono {sortDescriptor.column === 'phone' && (sortDescriptor.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />)}
                        </TableColumn>
                        <TableColumn onClick={() => handleSortChange('role')} className='cursor-pointer text-md'>
                            Rol {sortDescriptor.column === 'role' && (sortDescriptor.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />)}
                        </TableColumn>
                        <TableColumn className='text-md'>Acciones</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {paginatedItems.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell className="hover:bg-gray-100">
                                    <Image
                                        src={`${IMAGE_USERS_BASE_URL}${user.image}`}
                                        alt={user.name}
                                        className='w-10 h-10 rounded-xl'
                                    />
                                </TableCell>
                                <TableCell className="hover:bg-gray-100 text-sm">{user.name}</TableCell>
                                <TableCell className="hover:bg-gray-100 text-sm">{user.surname}</TableCell>
                                <TableCell className="hover:bg-gray-100 text-sm">{user.email}</TableCell>
                                <TableCell className="hover:bg-gray-100 text-sm">{user.postal_code}</TableCell>
                                <TableCell className="hover:bg-gray-100 text-sm">{user.locality}</TableCell>
                                <TableCell className="hover:bg-gray-100 text-sm">{user.province}</TableCell>
                                <TableCell className="hover:bg-gray-100 text-sm">{user.street}</TableCell>
                                <TableCell className="hover:bg-gray-100 text-sm">{user.number}</TableCell>
                                <TableCell className="hover:bg-gray-100 text-sm">{user.floor}</TableCell>
                                <TableCell className="hover:bg-gray-100 text-sm">{user.staircase}</TableCell>
                                <TableCell className="hover:bg-gray-100 text-sm">{user.phone}</TableCell>
                                <TableCell className="hover:bg-gray-100 text-sm">{user.role}</TableCell>
                                <TableCell className="hover:bg-gray-100">
                                    <div className="flex gap-2">
                                        <Button isIconOnly radius="full" size="sm" variant="light" onClick={() => editUser(user.id)}>
                                            <Tooltip content="Editar">
                                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50 active:scale-90 transition-all">
                                                    <GoPencil className="text-green-500 h-4 w-4" />
                                                </span>
                                            </Tooltip>
                                        </Button>
                                        <Button isIconOnly radius="full" size="sm" variant="light" onClick={() => showUser(user.id)}>
                                            <Tooltip content="Detalles">
                                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50 active:scale-90 transition-all">
                                                    <IoEyeOutline className="text-blue-400 h-4 w-4" />
                                                </span>
                                            </Tooltip>
                                        </Button>
                                        <Button isIconOnly radius="full" size="sm" variant="light">
                                            <Tooltip content="Eliminar">
                                                <Popover isOpen={isPopoverOpen} onClose={() => setIsPopoverOpen(false)} backdrop="blur">
                                                    <PopoverTrigger>
                                                        <span onClick={() => confirmDelete(user)} className="text-lg text-danger cursor-pointer active:opacity-50 active:scale-90 transition-all">
                                                            <CiTrash className="text-red-700 h-4 w-4" />
                                                        </span>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-[240px]">
                                                        <div className="p-4">
                                                            <p>¿Estás seguro de que quieres eliminar este usuario?</p>
                                                            <div className="flex justify-end mt-4">
                                                                <Button onClick={() => setIsPopoverOpen(false)} variant="light" size="sm" className="mr-2 hover:shadow-lg hover:scale-110">Cancelar</Button>
                                                                <Button onClick={handleDelete} className='text-red-600 hover:shadow-lg hover:scale-110'>Eliminar</Button>
                                                            </div>
                                                        </div>
                                                    </PopoverContent>
                                                </Popover>
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
