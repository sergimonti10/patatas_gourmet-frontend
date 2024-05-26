'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/services/definitions';
import { IMAGE_PRODUCTS_BASE_URL, PRODUCT_ID_BASE_URL } from '@/services/links';
import { Image } from '@nextui-org/react';
import { toast } from 'react-toastify';
import { LoadingCard } from '@/app/components/general/skeletons';

interface ProductDetailProps {
    params: {
        id: string;
    };
}

const ProductDetailLoader = ({ params }: ProductDetailProps) => {
    const { id } = params;
    const router = useRouter();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${PRODUCT_ID_BASE_URL}${id}`);
                if (!response.ok) {
                    throw new Error('No se ha encontrado el producto');
                }
                const data: Product = await response.json();
                setProduct(data);
                setLoading(false);
            } catch (error) {
                console.error('Error en el servidor:', error);
                toast.error('Producto no encontrado');
                router.push('/dashboard/store');
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id, router]);

    if (loading) {
        return <LoadingCard />;
    }

    return (
        <div className="container mx-auto p-4 max-w-screen-lg">
            <h1 className="text-3xl font-bold mb-4">{product?.name}</h1>
            <div className="relative m-5 w-full h-auto mb-4 group">
                <div className="relative overflow-hidden shadow-lg rounded-lg transition-all duration-300 ease-in-out group-hover:perspective-1000">
                    <img
                        src={`${IMAGE_PRODUCTS_BASE_URL}${product?.image}`}
                        alt={product?.name}
                        className="w-full h-auto object-cover rounded-lg shadow-lg transition-all duration-300 ease-in-out group-hover:rotate-x-10 group-hover:-translate-y-2.5 group-hover:translate-z-5"
                    />
                    <img
                        src={`${IMAGE_PRODUCTS_BASE_URL}${product?.image2}`}
                        alt={product?.name}
                        className="absolute bottom-0 left-0 right-0 transform translate-y-10 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-y-0 z-10"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></div>
                </div>
            </div>
            <p className="text-xl mb-2 font-bold border rounded-md p-4">Precio: {product?.price} €</p>
            <p className="text-xl mb-2 font-bold border rounded-md p-4">Peso: {product?.weight}</p>
            <p className='text-xl my-4 font-bold border rounded-md p-4'>{product?.description}</p>
        </div>
    );
};

export default ProductDetailLoader;
