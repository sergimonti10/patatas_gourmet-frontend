import ProductDetailLoader from '@/app/components/productsComponents/productDetailLoader';
import Reviews from '@/app/components/productsComponents/reviews';

interface ProductDetailProps {
    params: {
        id: string;
    };
}

export default function ProductDetail({ params }: ProductDetailProps) {
    return (
        <div className="w-auto h-auto">
            <ProductDetailLoader params={params} />
            <Reviews params={params} />
        </div>
    );
}
