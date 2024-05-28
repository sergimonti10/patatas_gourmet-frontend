'use client'

import { useRouter } from "next/navigation";
import { LoadingWave } from "@/app/components/general/skeletons";
import { Suspense, useEffect } from "react";
import useUserStore from "../../../../../../../store/authStore";
import UpdateProduct from "@/app/components/productsComponents/updateProduct";

export default function ProductUpdatePage() {
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
                <UpdateProduct router={router} />
            </Suspense>
        </div>
    );
}