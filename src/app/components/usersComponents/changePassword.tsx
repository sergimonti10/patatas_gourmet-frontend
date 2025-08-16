import React, { useState } from 'react';
import useUserStore from '../../../../store/authStore';
import { Button, Input } from '@nextui-org/react';
import { BiError } from 'react-icons/bi';
import { AUTH_BASE_URL } from '@/services/links';
import { toast } from 'react-toastify';

export default function ChangePassword() {
    const { token } = useUserStore();
    const [showForm, setShowForm] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }
        try {
            const response = await fetch(`${AUTH_BASE_URL}change-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                // credentials: 'include',
                body: JSON.stringify({
                    current_password: currentPassword,
                    new_password: newPassword,
                    new_password_confirmation: confirmPassword,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || 'Contraseña actual incorrecta');
                return;
            }

            setError('');
            setShowForm(false);
            toast.success('Contraseña modificada con éxito');
        } catch (err) {
            setError('');
            toast.error('La nueva contraseña debe tener al menos 8 caracteres');
        }
    };

    return (
        <div className="bg-yellow-100 w-full my-20 mx-auto p-4 border-2 border-yellow-500 rounded-lg flex flex-col items-center">
            <div className="mb-6 text-center text-4xl text-yellow-600 flex items-center">
                <BiError className="mr-2" />
                Modificar contraseña
            </div>
            <Button
                onClick={() => setShowForm(!showForm)}
                className="bg-yellow-500 text-white mb-4"
            >
                {showForm ? 'Cancelar' : 'Modificar contraseña'}
            </Button>
            {showForm && (
                <div className="bg-slate-100 p-3 sm:p-6 w-full max-w-md rounded-xl shadow-md hover:shadow-lg transform transition duration-300 hover:scale-105 overflow-auto">
                    <form onSubmit={handleSubmit} className="my-5">
                        <div className="grid grid-cols-1 gap-4">
                            <div className="text-lg md:text-xl">
                                <Input
                                    type="password"
                                    label="Contraseña actual"
                                    variant="bordered"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    required
                                    className="w-full"
                                />
                            </div>
                            <div className="text-lg md:text-xl">
                                <Input
                                    type="password"
                                    label="Nueva contraseña"
                                    variant="bordered"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    className="w-full"
                                />
                            </div>
                            <div className="text-lg md:text-xl">
                                <Input
                                    type="password"
                                    label="Confirmar nueva contraseña"
                                    variant="bordered"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="w-full"
                                />
                            </div>
                        </div>

                        {error && <div className="text-red-700 grid font-bold place-content-center my-6">{error}</div>}
                        <div className="mt-8 grid place-content-center">
                            <Button
                                type="submit"
                                radius="full"
                                className="bg-gradient-to-tr from-amber-600 to-yellow-400 text-white shadow-lg"
                            >
                                Cambiar contraseña
                            </Button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
