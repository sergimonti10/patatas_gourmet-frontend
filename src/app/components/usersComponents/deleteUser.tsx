import { USER_ID_BASE_URL } from '@/services/links';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useUserStore from '../../../../store/authStore';
import { Button, Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react';
import { CiUser } from "react-icons/ci";
import { BiError } from "react-icons/bi";

export default function PageDeleteUser() {
    const { token, logout, user } = useUserStore();
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

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
            toast.success("¡Usuario eliminado correctamente!");
            logout();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleDeleteClick = () => {
        setIsPopoverOpen(true);
    };

    const handleConfirmDelete = () => {
        deleteUser(user.id);
        setIsPopoverOpen(false);
    };

    const handleCancelDelete = () => {
        setIsPopoverOpen(false);
    };

    return (
        <div className="bg-red-100 w-full my-20 mx-auto p-4 border-2 border-red-500 rounded-lg flex flex-col items-center">
            <div className='mb-6 text-center text-4xl text-red-600 flex items-center'>
                <BiError className="mr-2" />
                Eliminar usuario
            </div>
            <Popover
                isOpen={isPopoverOpen}
                onOpenChange={setIsPopoverOpen}
                showArrow
                offset={10}
                placement="bottom"
                backdrop="blur"
            >
                <PopoverTrigger>
                    <Button color="danger" variant="bordered" startContent={<CiUser />} onClick={handleDeleteClick}>
                        Eliminar usuario
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[240px] p-4">
                    <div className="flex flex-col items-center">
                        <p className="text-small font-bold text-foreground mb-2">
                            Confirmar eliminación
                        </p>
                        <p className="text-sm text-center mb-4">
                            ¿Estás seguro de que quieres eliminar el usuario?
                        </p>
                        <div className="flex gap-2">
                            <Button color="danger" onClick={handleConfirmDelete}>
                                Confirmar
                            </Button>
                            <Button variant="flat" onClick={handleCancelDelete}>
                                Cancelar
                            </Button>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}
