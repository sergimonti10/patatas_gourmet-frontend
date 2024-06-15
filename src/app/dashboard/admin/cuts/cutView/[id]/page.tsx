'use client';

import CutDetailLoader from '@/app/components/cutComponents/cutDetailLoader';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import useUserStore from '../../../../../../../store/authStore';
import { useEffect } from 'react';

interface CutDetailProps {
    params: {
        id: string;
    };
}

export default function CutViewPage({ params }: CutDetailProps) {
    const { user } = useUserStore();

    useEffect(() => {
        if (!user) {
            window.location.href = '/';
        }
    }, [user]);

    return (
        <div className="w-auto h-auto">
            <header className="flex items-center py-4 w-full z-20">
                <div className="flex items-center justify-start">
                    <Link href="/dashboard/admin/cuts" className="flex items-center justify-center z-20 mx-4">
                        <FaArrowLeft className="w-8 h-8 text-amber-950 transition-all active:scale-95 hover:filter hover:scale-105 hover:drop-shadow-[0_0_10px_rgba(255,255,255,1)]" />
                    </Link>
                </div>
            </header>
            <CutDetailLoader params={params} />
        </div>
    );
}
