'use client'

import Products from "@/app/ui/productsComponents/products";
import { ProductCardSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import useUserStore from "../../../../store/authStore";

export default async function InvoicesPage() {

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
