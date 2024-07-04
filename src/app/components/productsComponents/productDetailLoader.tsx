'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/services/definitions';
import { IMAGE_PRODUCTS_BASE_URL, PRODUCT_ID_BASE_URL } from '@/services/links';
import { Image, Button, Input } from '@nextui-org/react';
import { toast } from 'react-toastify';
import { LoadingCard } from '@/app/components/general/skeletons';
import useCartStore from '../../../../store/cartStore';
import useUserStore from '../../../../store/authStore';

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
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCartStore();
    const { user } = useUserStore();

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

    // const handleAddToCart = () => {
    //     if (!user) {
    //         toast.warning("Debe registrarse para realizar una compra.");
    //         return;
    //     }
    //     if (quantity === 0) {
    //         toast.warning("Debe añadir al menos una unidad para añadir al carrito");
    //         return;
    //     }
    //     if (product) {
    //         for (let i = 0; i < quantity; i++) {
    //             addToCart(product);
    //         }
    //         toast.success(`Añadido al carrito: ${quantity} x ${product.name}`);
    //     }
    // };

    const handleAddToCart = () => {
        if (!user) {
            toast.warning("Debe registrarse para realizar una compra.");
            return;
        }
        if (quantity === 0) {
            toast.warning("Debe añadir al menos una unidad para añadir al carrito");
            return;
        }
        if (product) {
            for (let i = 0; i < quantity; i++) {
                addToCart({ id: product.id, price: product.price });
            }
            toast.success(`Añadido al carrito: ${quantity} x ${product.name}`);
        }
    };


    return (
        <div className="container mx-auto p-4 max-w-screen-lg">
            <h1 className="text-3xl font-bold mb-4">{product?.name}</h1>
            <div className="relative m-5 w-1/2 h-auto mb-4 group">
                <div className="relative overflow-hidden shadow-lg rounded-lg transition-all duration-300 ease-in-out group-hover:perspective-1000">
                    <img
                        src={product?.image}
                        alt={product?.name}
                        className="w-full h-auto object-cover rounded-lg shadow-lg transition-all duration-300 ease-in-out group-hover:rotate-x-10 group-hover:-translate-y-2.5 group-hover:translate-z-5"
                        loading="lazy"
                    />
                    <img
                        src={product?.image2}
                        alt={product?.name}
                        className="absolute bottom-0 left-0 right-0 transform translate-y-10 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-y-0 z-10"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></div>
                </div>
            </div>
            <p className='text-xl my-4 font-bold border rounded-md p-4'>{product?.description}</p>
            <p className="text-xl mb-2 font-bold border rounded-md p-4">Precio: {product?.price} €</p>
            <p className="text-xl mb-2 font-bold border rounded-md p-4">Peso: {product?.weight} kg</p>
            <p className="text-xl mb-2 font-bold border rounded-md p-4">Tipo de corte: {product?.cut?.name}</p>
            <div className="flex flex-col items-center mt-4">
                Añadir cantidad <Input
                    type="number"
                    value={quantity.toString()}
                    min={1}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="mb-4 max-w-24"
                    aria-label="Cantidad"
                />
                <Button
                    size="lg"
                    color='warning'
                    variant='shadow'
                    className="w-full text-white"
                    onClick={handleAddToCart}
                >
                    Añadir al carrito
                </Button>
            </div>
        </div>
    );
};

export default ProductDetailLoader;
