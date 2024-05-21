'use client'

import Products from "@/app/components/productsComponents/products";
import { ProductCardSkeleton } from "@/app/components/general/skeletons";
import { Suspense } from "react";
import useUserStore from "../../../../store/authStore";

export default function InvoicesPage() {

    const { user } = useUserStore();

    if (!user) {
        window.location.href = '/';
    }

    return (
        <div>
            <Suspense fallback={<ProductCardSkeleton />}>
                <Products />
            </Suspense>
        </div>
    );
}
