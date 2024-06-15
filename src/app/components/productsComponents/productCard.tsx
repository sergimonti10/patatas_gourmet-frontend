'use client'

import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { Card, CardFooter, Image, Button, Tooltip } from "@nextui-org/react";
import { BASE_URL, IMAGE_PRODUCTS_BASE_URL } from "@/services/links";
import { Product, Review, User } from "../../../services/definitions";
import { FaCartPlus } from "react-icons/fa6";
import Link from "next/link";
import useCartStore from "../../../../store/cartStore";

interface ProductCardProps {
    product: Product;
    user?: User;
}

export default function ProductCard({ product, user }: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const { addToCart } = useCartStore();
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`${BASE_URL}products/${product.id}/reviews`);
                if (!response.ok) {
                    throw new Error('Error al cargar las valoraciones');
                }
                let data: Review[] = await response.json();
                data = data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
                setReviews(data);
            } catch (error: any) {
                toast.error(error.message);
            }
        };

        fetchReviews();
    }, [product.id]);

    const handleButtonClick = () => {
        if (!user) {
            toast.warning("Debe registrarse para realizar una compra.");
        } else {
            addToCart(product);
            toast.success(`Producto añadido al carrito: ${product.name}`);
        }
    }

    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= rating; i++) {
            stars.push(
                <span className="text-amber-500">★</span>
            );
        }
        return stars;
    };

    const calculateAverageRating = (reviews: Review[]) => {
        if (reviews.length === 0) return "-";
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        return (totalRating / reviews.length).toFixed(1);
    };

    return (
        <Card
            isFooterBlurred
            className="w-52 sm:w-72 lg:w-80 h-auto mx-auto"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link href={`/dashboard/store/${product.id}`} passHref>
                <Image
                    removeWrapper
                    alt={product.name}
                    className="z-0 w-full h-full object-cover cursor-pointer"
                    src={`${IMAGE_PRODUCTS_BASE_URL}${product.image}`}
                    loading="lazy"
                />
            </Link>
            <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                <div>
                    {isHovered ? (
                        <>
                            <p className="text-amber-950 font-bold">Precio: {product.price} €</p>
                            <p className="text-amber-950 font-bold">Peso: {product.weight} kg</p>
                        </>
                    ) : (
                        <>
                            <p className="text-amber-950 font-bold">{product.name}</p>
                            {reviews.length > 0 && <h2 className="text-amber-950 font-bold">{renderStars(Number(calculateAverageRating(reviews)))} ({calculateAverageRating(reviews)}/5)</h2>}
                        </>
                    )}
                </div>
                <Tooltip content="Añadir al carrito" placement="top">
                    <Button
                        className="text-tiny bg-amber-950"
                        color="primary"
                        radius="full"
                        size="sm"
                        onClick={handleButtonClick}
                    >
                        <FaCartPlus className="w-5 h-5" />
                    </Button>
                </Tooltip>
            </CardFooter>
        </Card>
    );
}
