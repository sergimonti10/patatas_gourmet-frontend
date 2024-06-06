'use client';

import React, { useEffect } from 'react';
import { Card, CardBody, Avatar, Button, Divider } from '@nextui-org/react';
import useCartStore from '../../../../store/cartStore';
import { FaTrashAlt } from 'react-icons/fa';
import { Product } from '@/services/definitions';
import { IMAGE_PRODUCTS_BASE_URL } from '@/services/links';
import { FaPlus, FaMinus } from 'react-icons/fa';

interface GroupedProduct {
    product: Product;
    quantity: number;
}

const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(price);
};

const CartPage: React.FC = () => {
    const cart = useCartStore((state) => state.cart);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const clearCart = useCartStore((state) => state.clearCart);
    const incrementQuantity = useCartStore((state) => state.incrementQuantity);
    const decrementQuantity = useCartStore((state) => state.decrementQuantity);
    const initializeCart = useCartStore((state) => state.initializeCart);

    useEffect(() => {
        initializeCart();
    }, [initializeCart]);

    const getTotalPrice = (): string => {
        const total = groupedCart.reduce((sum: number, { product, quantity }: GroupedProduct) => sum + product.price * quantity, 0);
        return formatPrice(total);
    };

    const groupCartItems = (cart: Product[]): GroupedProduct[] => {
        const grouped: { [key: string]: GroupedProduct } = {};

        cart.forEach((product) => {
            if (grouped[product.id]) {
                grouped[product.id].quantity += 1;
            } else {
                grouped[product.id] = { product, quantity: 1 };
            }
        });

        return Object.values(grouped);
    };

    const groupedCart = groupCartItems(cart);

    return (
        <div className="container mx-auto p-2 overflow-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">Carrito de Compras</h1>
            <div className="flex flex-col gap-4">
                {cart.length === 0 ? (
                    <p className="text-center text-amber-950">
                        Tu carrito está vacío
                    </p>
                ) : (
                    groupedCart.map(({ product, quantity }) => (
                        <Card key={product.id} className="w-full mx-auto text-amber-950">
                            <CardBody className="flex flex-col md:flex-row justify-between items-center">
                                <div className="flex items-center">
                                    <Avatar
                                        isBordered
                                        radius="full"
                                        size="lg"
                                        src={`${IMAGE_PRODUCTS_BASE_URL}${product.image}`}
                                        alt={product.name}
                                        className="mr-4"
                                    />
                                    <div className="flex flex-col gap-1 items-start justify-center">
                                        <h4 className="text-lg font-semibold">{product.name}</h4>
                                        <p className="text-sm text-default-600">Precio: {formatPrice(product.price)}</p>
                                        <div className="flex items-center">
                                            <Button onClick={() => decrementQuantity(product.id)}>
                                                <FaMinus />
                                            </Button>
                                            <p className="text-sm text-default-600 mx-2">Cantidad: {quantity}</p>
                                            <Button onClick={() => incrementQuantity(product.id)}>
                                                <FaPlus />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row items-center md:ml-auto">
                                    <p className="text-sm font-bold text-default-600 md:mr-4">Total: {formatPrice(product.price * quantity)}</p>
                                    <Button color="danger" onClick={() => removeFromCart(product.id)}>
                                        <FaTrashAlt /> Eliminar
                                    </Button>
                                </div>
                            </CardBody>
                        </Card>
                    ))
                )}
            </div>
            {cart.length > 0 && (
                <>
                    <Divider className="my-6" />
                    <div className="flex justify-between items-center max-w-[600px] mx-auto">
                        <p className="text-xl font-bold">Total:</p>
                        <p className="text-xl font-bold">{getTotalPrice()}</p>
                    </div>
                    <Button color="danger" className="mt-4 mx-auto" onClick={clearCart}>
                        Vaciar Carrito
                    </Button>
                </>
            )}
        </div>
    );
};

export default CartPage;
