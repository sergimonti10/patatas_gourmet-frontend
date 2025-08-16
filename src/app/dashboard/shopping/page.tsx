// 'use client';

// import React, { useEffect, useState } from 'react';
// import { Card, CardBody, Avatar, Button, Divider } from '@nextui-org/react';
// import useCartStore from '../../../../store/cartStore';
// import { FaTrashAlt } from 'react-icons/fa';
// import { Product } from '@/services/definitions';
// import { DOWNLOAD_PDF_BASE_URL, IMAGE_PRODUCTS_BASE_URL, ORDERS_BASE_URL } from '@/services/links';
// import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
// import { toast } from 'react-toastify';
// import useUserStore from '../../../../store/authStore';
// import { LoadingOverlay } from '@/app/components/general/skeletons';

// interface GroupedProduct {
//     product: Product;
//     quantity: number;
// }

// interface CartProduct {
//     id: number;
//     quantity: number;
//     unit_price: number;
// }

// export default function CartPage() {
//     const cart = useCartStore((state) => state.cart);
//     const removeFromCart = useCartStore((state) => state.removeFromCart);
//     const clear = useCartStore((state) => state.clearCart);
//     const { addToCart, removeProductFromCart } = useCartStore();
//     const initializeCart = useCartStore((state) => state.initializeCart);
//     const { user, token } = useUserStore();
//     const [showPaymentForm, setShowPaymentForm] = useState(false);
//     const [cardNumber, setCardNumber] = useState('');
//     const [expiryDate, setExpiryDate] = useState('');
//     const [cvv, setCvv] = useState('');
//     const [cardHolderName, setCardHolderName] = useState('');
//     const [isLoading, setIsLoading] = useState(false);

//     useEffect(() => {
//         if (!user) {
//             window.location.href = '/';
//         }
//     }, [user]);

//     useEffect(() => {
//         initializeCart();
//     }, [initializeCart]);

//     const getTotalPrice = (): number => {
//         const total = groupedCart.reduce((sum: number, { product, quantity }: GroupedProduct) => sum + product.price * quantity, 0);
//         return total;
//     };

//     const clearCart = () => {
//         clear();
//         setShowPaymentForm(false);
//     }

//     const groupCartItems = (cart: Product[]): GroupedProduct[] => {
//         const grouped: { [key: string]: GroupedProduct } = {};

//         cart.forEach((product) => {
//             if (grouped[product.id]) {
//                 grouped[product.id].quantity += 1;
//             } else {
//                 grouped[product.id] = { product, quantity: 1 };
//             }
//         });

//         return Object.values(grouped);
//     };

//     const groupedCart = groupCartItems(cart);

//     const handlePurchaseClick = () => {
//         setShowPaymentForm(true);
//     };

//     const toMySQLDateFormat = (date: Date) => {
//         const year = date.getFullYear();
//         const month = String(date.getMonth() + 1).padStart(2, '0');
//         const day = String(date.getDate()).padStart(2, '0');
//         const hours = String(date.getHours()).padStart(2, '0');
//         const minutes = String(date.getMinutes()).padStart(2, '0');
//         const seconds = String(date.getSeconds()).padStart(2, '0');
//         return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
//     };

//     const handleConfirmPurchase = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         setIsLoading(true); // Mostrar pantalla de carga

//         const groupedProducts = cart.reduce((acc: { [key: number]: CartProduct }, item: Product) => {
//             if (acc[item.id]) {
//                 acc[item.id].quantity += 1;
//             } else {
//                 acc[item.id] = {
//                     id: item.id,
//                     quantity: 1,
//                     unit_price: parseFloat(item.price.toString())
//                 };
//             }
//             return acc;
//         }, {});

//         const orderData = {
//             date_order: toMySQLDateFormat(new Date()),
//             status: 'pendiente',
//             total_price: getTotalPrice(),
//             total_products: cart.length,
//             id_user: user.id,
//             products: Object.values(groupedProducts)
//         };

//         try {
//             const response = await fetch(ORDERS_BASE_URL, {
//                 method: 'POST',
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'application/json',
//                     'Accept': 'application/json',
//                 },
//                 body: JSON.stringify(orderData),
//             });

//             if (response.ok) {
//                 const order = await response.json();
//                 toast.success('Compra realizada con éxito');
//                 setShowPaymentForm(false);
//                 clearCart();

//                 // toast.promise(
//                 //     fetch(`${DOWNLOAD_PDF_BASE_URL}/${order.id}`, {
//                 //         method: 'GET',
//                 //         headers: {
//                 //             'Authorization': `Bearer ${token}`,
//                 //             'Accept': 'application/pdf',
//                 //         },
//                 //     }).then(async (pdfResponse) => {
//                 //         if (pdfResponse.ok) {
//                 //             const blob = await pdfResponse.blob();
//                 //             const url = window.URL.createObjectURL(blob);
//                 //             const a = document.createElement('a');
//                 //             a.href = url;
//                 //             a.download = `factura_patatas-gourmet_${order.id}.pdf`;
//                 //             document.body.appendChild(a);
//                 //             a.click();
//                 //             a.remove();
//                 //             window.URL.revokeObjectURL(url);
//                 //             return "Factura generada correctamente";
//                 //         } else {
//                 //             throw new Error('Error al generar la factura');
//                 //         }
//                 //     }),
//                 //     {
//                 //         pending: 'Generando factura...',
//                 //         success: 'Factura generada correctamente',
//                 //         error: 'Error al generar la factura',
//                 //     }
//                 // );
//             } else {
//                 toast.error('Error al realizar la compra');
//             }
//         } catch (error) {
//             toast.error('Error al realizar la compra');
//         } finally {
//             setIsLoading(false); // Ocultar pantalla de carga
//         }
//     };


//     return (
//         <div className="container mx-auto p-2 overflow-auto">
//             <h1 className="text-3xl font-bold mb-6 text-center">Carrito de Compras</h1>
//             <div className="flex flex-col gap-4">
//                 {cart.length === 0 ? (
//                     <p className="text-center text-amber-950">
//                         Tu carrito está vacío
//                     </p>
//                 ) : (
//                     groupedCart.map(({ product, quantity }) => (
//                         <Card key={product.id} className="w-full mx-auto text-amber-950">
//                             <CardBody className="flex flex-col md:flex-row justify-between items-center">
//                                 <div className="flex items-center">
//                                     <Avatar
//                                         isBordered
//                                         radius="full"
//                                         size="lg"
//                                         src={product.image}
//                                         alt={product.name}
//                                         className="mr-4"
//                                     />
//                                     <div className="flex flex-col gap-1 items-start justify-center">
//                                         <h4 className="text-lg font-semibold">{product.name}</h4>
//                                         <p className="text-sm text-default-600">Precio/Unidad: {product.price} €</p>
//                                         <p className="text-sm text-default-600">Peso: {product.weight * quantity} kg</p>
//                                         <div className="flex items-center">
//                                             <button onClick={() => removeProductFromCart(product.id)}>
//                                                 <CiCircleMinus />
//                                             </button>
//                                             <p className="text-sm text-default-600 mx-2">Cantidad: {quantity}</p>
//                                             <button onClick={() => addToCart(product)}>
//                                                 <CiCirclePlus />
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="flex flex-col md:flex-row items-center md:ml-auto">
//                                     <p className="text-sm font-bold text-default-600 md:mr-4">Total: {product.price * quantity} €</p>
//                                     <Button color="danger" onClick={() => removeFromCart(product.id)}>
//                                         <FaTrashAlt /> Eliminar
//                                     </Button>
//                                 </div>
//                             </CardBody>
//                         </Card>
//                     ))
//                 )}
//             </div>
//             {cart.length > 0 && (
//                 <>
//                     <Divider className="my-6" />
//                     <div className="flex justify-between items-center max-w-[600px] mx-auto mb-2">
//                         <p className="text-xl font-bold">Subtotal:</p>
//                         <p className="text-xl font-bold">{getTotalPrice()} €</p>
//                     </div>
//                     <div className="flex justify-between items-center max-w-[600px] mx-auto">
//                         <p className="text-xl font-bold">Total (IVA: 21%):</p>
//                         <p className="text-xl font-bold">{(getTotalPrice() * 1.21).toFixed(2)} €</p>
//                     </div>
//                     <div className="flex justify-between mt-4 mx-auto max-w-[600px]">
//                         <Button color="danger" onClick={clearCart}>
//                             Vaciar Carrito
//                         </Button>
//                         <Button color="success" className="text-white" onClick={handlePurchaseClick}>
//                             Comprar
//                         </Button>
//                     </div>
//                 </>
//             )}
//             <div className={`${showPaymentForm ? 'block' : 'hidden'} mt-8`}>
//                 <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
//                     <h2 className="text-2xl font-bold mb-2">Detalles de Pago</h2>
//                     <h4 className="font-bold italic mb-4">La dirección del envío es la que figura en tu perfil</h4>
//                     <div className={`relative ${isLoading ? 'pointer-events-none' : ''}`}>
//                         {isLoading && <LoadingOverlay />}
//                         <form className="space-y-4" onSubmit={handleConfirmPurchase}>
//                             <div>
//                                 <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
//                                     Número de Tarjeta
//                                 </label>
//                                 <input
//                                     id="cardNumber"
//                                     type="number"
//                                     className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                                     value={cardNumber}
//                                     onChange={(e) => setCardNumber(e.target.value)}
//                                     required
//                                 />
//                             </div>
//                             <div>
//                                 <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
//                                     Fecha de Caducidad (MM/YY)
//                                 </label>
//                                 <input
//                                     id="expiryDate"
//                                     type="number"
//                                     className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                                     value={expiryDate}
//                                     onChange={(e) => setExpiryDate(e.target.value)}
//                                     required
//                                 />
//                             </div>
//                             <div>
//                                 <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
//                                     Código CVV
//                                 </label>
//                                 <input
//                                     id="cvv"
//                                     type="number"
//                                     className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                                     value={cvv}
//                                     onChange={(e) => setCvv(e.target.value)}
//                                     required
//                                 />
//                             </div>
//                             <div>
//                                 <label htmlFor="cardHolderName" className="block text-sm font-medium text-gray-700">
//                                     Nombre del Titular
//                                 </label>
//                                 <input
//                                     id="cardHolderName"
//                                     type="text"
//                                     className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                                     value={cardHolderName}
//                                     onChange={(e) => setCardHolderName(e.target.value)}
//                                     required
//                                 />
//                             </div>
//                             <div className="flex justify-end">
//                                 <Button color="warning" className="text-white" type="submit">
//                                     Confirmar Compra
//                                 </Button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardBody, Avatar, Button, Divider } from '@nextui-org/react';
import useCartStore from '../../../../store/cartStore';
import { FaTrashAlt } from 'react-icons/fa';
import { Product } from '@/services/definitions';
import { DOWNLOAD_PDF_BASE_URL, IMAGE_PRODUCTS_BASE_URL, ORDERS_BASE_URL } from '@/services/links';
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { toast } from 'react-toastify';
import useUserStore from '../../../../store/authStore';
import { LoadingOverlay } from '@/app/components/general/skeletons';

interface GroupedProduct {
    product: Product;
    quantity: number;
}

export default function CartPage() {
    // Ahora el store expone un MAPA id->qty (y mantiene los mismos métodos de tu UI)
    const cartMap = useCartStore((s) => s.cart);
    const addToCart = useCartStore((s) => s.addToCart);                    // +1
    const removeProductFromCart = useCartStore((s) => s.removeProductFromCart); // -1
    const removeFromCart = useCartStore((s) => s.removeFromCart);          // quitar todos de ese id
    const clear = useCartStore((s) => s.clearCart);
    const initializeCart = useCartStore((s) => s.initializeCart);
    const totalItems = useCartStore((s) => s.getCartCount());

    const { user, token } = useUserStore();
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [cardHolderName, setCardHolderName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Índice de productos (para “hacer join” con el mapa)
    const [productsIndex, setProductsIndex] = useState<Record<number, Product>>({});

    useEffect(() => {
        if (!user) window.location.href = '/';
    }, [user]);

    useEffect(() => {
        initializeCart();
    }, [initializeCart]);

    // Construimos base de productos a partir de ORDERS_BASE_URL (…/api/orders → …/api/products)
    const PRODUCTS_BASE_URL = React.useMemo(
        () => ORDERS_BASE_URL.replace(/\/orders\/?$/, '/products'),
        []
    );

    // Carga los productos por los ids que haya en el carrito
    useEffect(() => {
        const ids = Object.keys(cartMap).map(Number);
        if (ids.length === 0) { setProductsIndex({}); return; }

        (async () => {
            try {
                // Intento de batch (?ids=1,2,3). Si no existe, hacemos fallback por id.
                let list: Product[] = [];
                try {
                    const r = await fetch(`${PRODUCTS_BASE_URL}?ids=${ids.join(',')}`);
                    if (r.ok) list = await r.json();
                } catch { /* ignore */ }

                if (!list.length) {
                    const items = await Promise.all(ids.map(async (id) => {
                        const r = await fetch(`${PRODUCTS_BASE_URL}/${id}`);
                        return r.ok ? await r.json() : null;
                    }));
                    list = items.filter(Boolean) as Product[];
                }

                const idx: Record<number, Product> = {};
                list.forEach(p => { idx[p.id] = p; });
                setProductsIndex(idx);
            } catch (e) {
                console.error('Error loading cart products', e);
            }
        })();
    }, [PRODUCTS_BASE_URL, JSON.stringify(cartMap)]);

    // Agrupado para la UI
    const groupedCart: GroupedProduct[] = useMemo(() => (
        Object.entries(cartMap).map(([id, qty]) => ({
            product: productsIndex[Number(id)],
            quantity: Number(qty),
        })).filter(g => !!g.product)
    ), [cartMap, productsIndex]);

    const getTotalPrice = (): number =>
        groupedCart.reduce((sum, { product, quantity }) => sum + Number(product.price) * quantity, 0);

    const clearCart = () => { clear(); setShowPaymentForm(false); };
    const handlePurchaseClick = () => setShowPaymentForm(true);

    const toMySQLDateFormat = (date: Date) => {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        const h = String(date.getHours()).padStart(2, '0');
        const mi = String(date.getMinutes()).padStart(2, '0');
        const s = String(date.getSeconds()).padStart(2, '0');
        return `${y}-${m}-${d} ${h}:${mi}:${s}`;
    };

    const handleConfirmPurchase = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const productsPayload = Object.entries(cartMap).map(([id, qty]) => ({
            id: Number(id),
            quantity: Number(qty),
            unit_price: Number(productsIndex[Number(id)]?.price ?? 0),
        }));

        const orderData = {
            date_order: toMySQLDateFormat(new Date()),
            status: 'pendiente',
            total_price: getTotalPrice(),
            total_products: totalItems, // suma de cantidades
            id_user: user.id,
            products: productsPayload,
        };

        try {
            const response = await fetch(ORDERS_BASE_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (response.ok) {
                // const order = await response.json();
                toast.success('Compra realizada con éxito');
                setShowPaymentForm(false);
                clearCart();
                // (si quieres, aquí reactivas la descarga de factura)
            } else {
                toast.error('Error al realizar la compra');
            }
        } catch {
            toast.error('Error al realizar la compra');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-2 overflow-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">Carrito de Compras</h1>

            <div className="flex flex-col gap-4">
                {totalItems === 0 ? (
                    <p className="text-center text-amber-950">Tu carrito está vacío</p>
                ) : (
                    groupedCart.map(({ product, quantity }) => (
                        <Card key={product.id} className="w-full mx-auto text-amber-950">
                            <CardBody className="flex flex-col md:flex-row justify-between items-center">
                                <div className="flex items-center">
                                    <Avatar
                                        isBordered
                                        radius="full"
                                        size="lg"
                                        src={product.image}
                                        alt={product.name}
                                        className="mr-4"
                                    />
                                    <div className="flex flex-col gap-1 items-start justify-center">
                                        <h4 className="text-lg font-semibold">{product.name}</h4>
                                        <p className="text-sm text-default-600">Precio/Unidad: {product.price} €</p>
                                        <p className="text-sm text-default-600">Peso: {(product.weight ?? 0) * quantity} kg</p>
                                        <div className="flex items-center">
                                            <button onClick={() => removeProductFromCart(product.id)}>
                                                <CiCircleMinus />
                                            </button>
                                            <p className="text-sm text-default-600 mx-2">Cantidad: {quantity}</p>
                                            <button onClick={() => addToCart(product)}>
                                                <CiCirclePlus />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row items-center md:ml-auto">
                                    <p className="text-sm font-bold text-default-600 md:mr-4">
                                        Total: {Number(product.price) * quantity} €
                                    </p>
                                    <Button color="danger" onClick={() => removeFromCart(product.id)}>
                                        <FaTrashAlt /> Eliminar
                                    </Button>
                                </div>
                            </CardBody>
                        </Card>
                    ))
                )}
            </div>

            {totalItems > 0 && (
                <>
                    <Divider className="my-6" />
                    <div className="flex justify-between items-center max-w-[600px] mx-auto mb-2">
                        <p className="text-xl font-bold">Subtotal:</p>
                        <p className="text-xl font-bold">{getTotalPrice()} €</p>
                    </div>
                    <div className="flex justify-between items-center max-w-[600px] mx-auto">
                        <p className="text-xl font-bold">Total (IVA: 21%):</p>
                        <p className="text-xl font-bold">{(getTotalPrice() * 1.21).toFixed(2)} €</p>
                    </div>
                    <div className="flex justify-between mt-4 mx-auto max-w-[600px]">
                        <Button color="danger" onClick={clearCart}>Vaciar Carrito</Button>
                        <Button color="success" className="text-white" onClick={handlePurchaseClick}>Comprar</Button>
                    </div>
                </>
            )}

            <div className={`${showPaymentForm ? 'block' : 'hidden'} mt-8`}>
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
                    <h2 className="text-2xl font-bold mb-2">Detalles de Pago</h2>
                    <h4 className="font-bold italic mb-4">La dirección del envío es la que figura en tu perfil</h4>
                    <div className={`relative ${isLoading ? 'pointer-events-none' : ''}`}>
                        {isLoading && <LoadingOverlay />}
                        <form className="space-y-4" onSubmit={handleConfirmPurchase}>
                            <div>
                                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                                    Número de Tarjeta
                                </label>
                                <input
                                    id="cardNumber"
                                    type="number"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    value={cardNumber}
                                    onChange={(e) => setCardNumber(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                                    Fecha de Caducidad (MM/YY)
                                </label>
                                <input
                                    id="expiryDate"
                                    type="number"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    value={expiryDate}
                                    onChange={(e) => setExpiryDate(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                                    Código CVV
                                </label>
                                <input
                                    id="cvv"
                                    type="number"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    value={cvv}
                                    onChange={(e) => setCvv(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="cardHolderName" className="block text-sm font-medium text-gray-700">
                                    Nombre del Titular
                                </label>
                                <input
                                    id="cardHolderName"
                                    type="text"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    value={cardHolderName}
                                    onChange={(e) => setCardHolderName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <Button color="warning" className="text-white" type="submit">
                                    Confirmar Compra
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
