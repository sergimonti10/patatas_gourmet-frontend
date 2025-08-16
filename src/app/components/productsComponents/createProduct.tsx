import React, { useState } from "react";
import CardCreateProduct from "./cardCreateProduct";
import { useRouter } from 'next/navigation';
import useUserStore from '../../../../store/authStore';
import { PRODUCTS_BASE_URL } from "@/services/links";
import { toast } from "react-toastify";

interface CreateProductProps {
    router: ReturnType<typeof useRouter>;
}

const CreateProduct = ({ router }: CreateProductProps) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [weight, setWeight] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [image2, setImage2] = useState<File | null>(null);
    const [idCut, setIdCut] = useState<string | null>(null);
    const [error, setError] = useState("");
    const { token } = useUserStore();

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

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

        try {

            const productsResponse = await fetch(PRODUCTS_BASE_URL, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                // credentials: 'include',
                body: formData,
            });

            if (!productsResponse.ok) {
                toast.error("Error al crear el producto");
                const errorData = await productsResponse.json();
                throw new Error(errorData.message || 'Error al crear el producto');
            }

            const data = await productsResponse.json();
            console.log(data);
            toast.success("¡Producto creado correctamente!");
            router.push('/dashboard/admin');
        } catch (error: any) {
            console.error('Error:', error);
            setError(error.message || 'Ha ocurrido un error al intentar crear el producto.');
        }
    };

    return (
        <CardCreateProduct
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
        />
    );
};

export default CreateProduct;
