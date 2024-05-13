import { fetchProducts } from "@/app/lib/data";
import { Product } from "@/app/lib/definitions";

export default async function Products() {
    const products = await fetchProducts();

    return (
        <div className="container mx-auto">
            <h1 className="mt-5 mb-4 text-center text-3xl font-bold">Invoices Page</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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