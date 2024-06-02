'use client'

import Products from "@/app/components/productsComponents/products";
import { LoadingWave } from "@/app/components/general/skeletons";
import { Suspense, useEffect } from "react";
import useUserStore from "../../../../store/authStore";

export default function StorePage() {
    return (
        <div className="w-auto h-auto">
            <Suspense fallback={<LoadingWave />}>
                <Products />
            </Suspense>
        </div>
    );
}
