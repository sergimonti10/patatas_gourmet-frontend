'use client'

import Products from "@/app/components/productsComponents/products";
import { LoadingWave } from "@/app/components/general/skeletons";
import { Suspense, useEffect } from "react";
import useUserStore from "../../../../store/authStore";

export default function InvoicesPage() {

    const { user } = useUserStore();

    // useEffect(() => {
    //     if (!user) {
    //         window.location.href = '/';      Esto no va a hacer falta, alomejor en las paginas de edicion y creacion y en el navbar y sidenav
    //     }
    // }, [user]);

    return (
        <div className="w-auto h-auto">
            <Suspense fallback={<LoadingWave />}>
                <Products />
            </Suspense>
        </div>
    );
}
