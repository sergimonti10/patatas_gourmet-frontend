import { useEffect, useState } from "react";
import { fetchProducts } from "../../../services/data";
import { Product } from "../../../services/definitions";
import useUserStore from "../../../../store/authStore";
import { IMAGE_USERS_BASE_URL, IMAGE_PRODUCTS_BASE_URL } from "@/services/links";
import { LoadingWave } from "../general/skeletons";
import { Button } from "@nextui-org/react";

export default function Products() {
    const { user, token } = useUserStore();
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
        return <div><LoadingWave /></div>;
    }

    return (
        <div className="container p-4 flex flex-col items-center">
            <img
                src={`${IMAGE_USERS_BASE_URL}${user.image}`}
                alt={user.name}
                className="w-40 h-40 rounded-full mb-2" />
            <h1 className="mt-5 mb-4 text-center text-3xl font-bold">Invoices Page</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {products.map((product: Product) => (
                    <div
                        key={product.id}
                        className="bg-white rounded-lg shadow-md p-4 overflow-auto h-60 lg:h-72 w-60 lg:w-72">
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
