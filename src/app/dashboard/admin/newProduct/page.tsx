'use client'

import { useRouter } from "next/navigation";
import CreateProduct from "@/app/components/productsComponents/createProduct";
import { LoadingWave } from "@/app/components/general/skeletons";
import { Suspense, useEffect } from "react";
import useUserStore from "../../../../../store/authStore";

export default function RegisterPage() {
    const router = useRouter();

    const { user } = useUserStore();

    useEffect(() => {
        if (!user) {
            window.location.href = '/';
        }
    }, [user]);

    return (
        <div className="w-auto h-auto">
            <Suspense fallback={<LoadingWave />}>
                <CreateProduct router={router} />
            </Suspense>
        </div>
    );
}
