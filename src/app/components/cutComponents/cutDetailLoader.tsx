'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Cut } from '@/services/definitions';
import { CUT_ID_BASE_URL } from '@/services/links';
import { toast } from 'react-toastify';
import { LoadingCard } from '@/app/components/general/skeletons';
import useUserStore from '../../../../store/authStore';

interface CutDetailProps {
    params: {
        id: string;
    };
}

const CutDetailLoader = ({ params }: CutDetailProps) => {
    const { id } = params;
    const router = useRouter();
    const [cut, setCut] = useState<Cut | null>(null);
    const [loading, setLoading] = useState(true);
    const { token } = useUserStore();

    useEffect(() => {
        const fetchCut = async () => {
            try {
                const response = await fetch(`${CUT_ID_BASE_URL}${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('No se ha encontrado el corte');
                }
                const data: Cut = await response.json();
                setCut(data);
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
        <div className="container mx-auto p-4 max-w-screen-lg">
            <h1 className="text-3xl font-bold mb-4">{cut?.name}</h1>
            <p className='text-xl my-4 font-bold border rounded-md p-4'>{cut?.description}</p>
            <p className="text-xl mb-2 font-bold border rounded-md p-4">Peso: {cut?.weight} kg</p>
        </div>
    );
};

export default CutDetailLoader;
