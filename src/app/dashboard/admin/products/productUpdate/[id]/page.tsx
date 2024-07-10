'use client'

import { useRouter } from "next/navigation";
import { LoadingWave } from "@/app/components/general/skeletons";
import { Suspense, useEffect } from "react";
import useUserStore from "../../../../../../../store/authStore";
import UpdateProduct from "@/app/components/productsComponents/updateProduct";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

interface ProductDetailProps {
    params: {
        id: string;
    };
}

export default function ProductUpdatePage({ params }: ProductDetailProps) {
    const router = useRouter();

    const { user, role } = useUserStore();

    useEffect(() => {
        if (!user || !role.includes('super-admin')) {
            window.location.href = '/';
        }
    }, [user, role]);


    return (
        <div className="w-auto h-auto">
            <Suspense fallback={<LoadingWave />}>
                <header className="flex items-center py-4 w-full z-20">
                    <div className="flex items-center justify-start">
                        <Link href="/dashboard/admin/products" className="flex items-center justify-center z-20 mx-4">
                            <FaArrowLeft className="w-8 h-8 text-amber-950 transition-all active:scale-95 hover:filter hover:scale-105 hover:drop-shadow-[0_0_10px_rgba(255,255,255,1)]" />
                        </Link>
                    </div>
                </header>
                <UpdateProduct router={router} params={params} />
            </Suspense>
        </div>
    );
}
