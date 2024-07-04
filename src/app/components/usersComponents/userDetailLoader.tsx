'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/services/definitions';
import { IMAGE_USERS_BASE_URL, USER_ID_BASE_URL } from '@/services/links';
import { Image } from '@nextui-org/react';
import { toast } from 'react-toastify';
import { LoadingCard } from '@/app/components/general/skeletons';
import useUserStore from '../../../../store/authStore';

interface UserDetailProps {
    params: {
        id: string;
    };
}

const UserDetailLoader = ({ params }: UserDetailProps) => {
    const { id } = params;
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const { token } = useUserStore();

    useEffect(() => {
        const fetchCut = async () => {
            try {
                const response = await fetch(`${USER_ID_BASE_URL}${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('No se ha encontrado el corte');
                }
                const data: User = await response.json();
                setUser(data);
                setLoading(false);
            } catch (error) {
                console.error('Error en el servidor:', error);
                toast.error('Corte no encontrado');
                router.push('/dashboard/admin/cuts');
            }
        };

        if (id) {
            fetchCut();
        }
    }, [id, router, token]);

    if (loading) {
        return <LoadingCard />;
    }

    return (
        <div className="container mx-auto p-4 grid place-content-center">
            <h1 className="text-3xl font-bold mb-4 text-center">{user?.name} {user?.surname}</h1>
            <div className="relative m-5 w-full h-auto mb-4 group flex justify-center">
                <Image
                    isBlurred
                    width={240}
                    className="m-5"
                    src={user?.image}
                    alt={`${user?.name} ${user?.surname}`}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p className="text-xl font-bold border rounded-md p-4">Email: {user?.email}</p>
                <p className="text-xl font-bold border rounded-md p-4">Teléfono: {user?.phone}</p>
                <p className="text-xl font-bold border rounded-md p-4">Código Postal: {user?.postal_code}</p>
                <p className="text-xl font-bold border rounded-md p-4">Localidad: {user?.locality}</p>
                <p className="text-xl font-bold border rounded-md p-4">Provincia: {user?.province}</p>
                <p className="text-xl font-bold border rounded-md p-4">Calle: {user?.street}</p>
                <p className="text-xl font-bold border rounded-md p-4">Número: {user?.number}</p>
                {user?.floor && (
                    <p className="text-xl font-bold border rounded-md p-4">Piso: {user?.floor}</p>
                )}
                {user?.staircase && (
                    <p className="text-xl font-bold border rounded-md p-4">Escalera: {user?.staircase}</p>
                )}
            </div>
        </div>
    );
};

export default UserDetailLoader;
