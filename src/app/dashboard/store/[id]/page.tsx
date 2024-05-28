import ProductDetailLoader from '@/app/components/productsComponents/productDetailLoader';

interface ProductDetailProps {
    params: {
        id: string;
    };
}

export default function ProductDetail({ params }: ProductDetailProps) {
    return (
        <div className="w-auto h-auto">
            <ProductDetailLoader params={params} />
        </div>
    );
}
