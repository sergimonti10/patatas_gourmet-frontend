import { useEffect, useState } from "react";
import { fetchProducts } from "../../../services/data";
import { Product } from "../../../services/definitions";
import useUserStore from "../../../../store/authStore";
import { LoadingWave } from "../general/skeletons";
import ProductCard from "./productCard";

export default function Products() {
    const { user, token } = useUserStore();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsData = await fetchProducts();
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
        <div className="container mx-auto p-4 max-w-screen-lg">
            <h1 className="mt-5 mb-10 text-center text-3xl font-bold">¡Disfruta de la calidad de nuestros productos!</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                {products.map((product: Product) => (
                    <ProductCard key={product.id} product={product} user={user} />
                ))}
            </div>
        </div>
    );
}
