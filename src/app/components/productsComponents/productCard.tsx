import { useState } from "react";
import { toast } from 'react-toastify';
import { Card, CardFooter, Image, Button } from "@nextui-org/react";
import { IMAGE_PRODUCTS_BASE_URL } from "@/services/links";
import { Product, User } from "../../../services/definitions";
import { FaCartPlus } from "react-icons/fa6";
import Link from "next/link";

interface ProductCardProps {
    product: Product;
    user?: User;
}

export default function ProductCard({ product, user }: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    const handleButtonClick = () => {
        if (!user) {
            toast.warning("Debe registrarse para realizar una compra.");
        } else {
            console.log(`Product purchased: ${product.name}`);
        }
    }

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
                        <p className="text-amber-950 font-bold">{product.name}</p>
                    )}
                </div>
                <Button
                    className="text-tiny bg-amber-950"
                    color="primary"
                    radius="full"
                    size="sm"
                    onClick={handleButtonClick}
                >
                    <FaCartPlus className="w-5 h-5" />
                </Button>
            </CardFooter>
        </Card>
    );
}
