import ProductDetailLoader from '@/app/components/productsComponents/productDetailLoader';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

interface ProductDetailProps {
    params: {
        id: string;
    };
}

export default function ProductViewPage({ params }: ProductDetailProps) {
    return (
        <div className="w-full h-full overflow-auto">
            <header className="flex items-center py-4 w-full z-20">
                <div className="flex items-center justify-start">
                    <Link href="/dashboard/admin/products" className="flex items-center justify-center z-20 mx-4">
                        <FaArrowLeft className="w-8 h-8 text-amber-950 transition-all active:scale-95 hover:filter hover:scale-105 hover:drop-shadow-[0_0_10px_rgba(255,255,255,1)]" />
                    </Link>
                </div>
            </header>
            <ProductDetailLoader params={params} />
        </div>
    );
}
