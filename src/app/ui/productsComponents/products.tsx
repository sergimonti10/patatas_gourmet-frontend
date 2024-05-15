'use client'

import { useEffect, useState } from "react";
import { fetchProducts } from "@/app/lib/data";
import { Product } from "@/app/lib/definitions";
import useUserStore from "../../../../store/authStore";

export default function Products() {
    const { user, token, role } = useUserStore();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsData = await fetchProducts({ token });
                setProducts(productsData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto">
            <p>User: {JSON.stringify(user)}</p>
            <p>Role: {role}</p>
            <p>Token: {token}</p>
            <h1 className="mt-5 mb-4 text-center text-3xl font-bold">Invoices Page</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map((product: Product) => (
                    <div key={product.id} className="bg-white rounded-lg shadow-md p-4">
                        <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                        <p className="text-gray-600">{product.description}</p>
                        <p className="text-gray-700">Precio: ${product.price}</p>
                        <p className="text-gray-700">Peso: {product.weight} g</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
