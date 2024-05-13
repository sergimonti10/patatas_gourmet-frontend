import Products from "@/app/ui/invoices/products";
import { ProductCardSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";

export default async function InvoicesPage() {

    return (
        <div>
            <Suspense fallback={<ProductCardSkeleton />}>
                <Products />
            </Suspense>
        </div>
    );
}
