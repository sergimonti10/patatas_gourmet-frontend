import React, { useState } from "react";
import CardUpdateProduct from "./cardUpdateProduct";
import { useRouter, useSearchParams } from 'next/navigation';
import useUserStore from '../../../../store/authStore';
import { PRODUCT_ID_BASE_URL } from "@/services/links";
import { toast } from "react-toastify";

interface UpdateProductProps {
    router: ReturnType<typeof useRouter>;
    params: {
        id: string;
    }
}

const UpdateProduct = ({ router, params }: UpdateProductProps) => {
    const { id } = params;
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [weight, setWeight] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [image2, setImage2] = useState<File | null>(null);
    const [idCut, setIdCut] = useState<string | null>(null);
    const [error, setError] = useState("");
    const { token } = useUserStore();

    console.log("id product:", id);

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        // Verifica si todos los campos requeridos tienen valores
        console.log("nombre: ", name);
        console.log("peso: ", weight);
        console.log("precio: ", price);
        console.log("descripcion: ", description);
        console.log("corte: ", idCut);
        console.log("nombre: ", name);


        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('weight', weight);
        if (image) {
            formData.append('image', image);
        }
        if (image2) {
            formData.append('image2', image2);
        }
        formData.append('id_cut', idCut || '');

        console.log("FormData:", formData);

        try {
            const response = await fetch(`${PRODUCT_ID_BASE_URL}${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                credentials: 'include',
                body: formData,
            });

            if (!response.ok) {
                toast.error("Error al actualizar el producto");
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al actualizar el producto');
            }

            const data = await response.json();
            console.log(data);
            toast.success("¡Producto actualizado correctamente!");
            router.push('/dashboard/admin/products');
        } catch (error: any) {
            console.error('Error:', error);
            setError(error.message || 'Ha ocurrido un error al intentar actualizar el producto.');
        }
    };

    return (
        <CardUpdateProduct
            handleSubmit={handleSubmit}
            name={name}
            description={description}
            price={price}
            weight={weight}
            image={image}
            image2={image2}
            id_cut={idCut}
            setName={setName}
            setDescription={setDescription}
            setPrice={setPrice}
            setWeight={setWeight}
            setImage={setImage}
            setImage2={setImage2}
            setIdCut={setIdCut}
            error={error}
            productId={id}
        />
    );
};

export default UpdateProduct;
