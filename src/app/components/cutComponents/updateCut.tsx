import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import CardUpdateCut from "./cardUpdateCut";
import useUserStore from '../../../../store/authStore';
import { CUT_ID_BASE_URL } from "@/services/links";
import { toast } from "react-toastify";

interface UpdateCutProps {
    router: ReturnType<typeof useRouter>;
    params: { id: string };
}

const UpdateCut = ({ router, params }: UpdateCutProps) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [weight, setWeight] = useState("");
    const [error, setError] = useState("");
    const { token } = useUserStore();
    const { id } = params;

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('weight', weight);
        formData.append('_method', 'PUT');

        try {
            const cutsResponse = await fetch(`${CUT_ID_BASE_URL}${id}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (!cutsResponse.ok) {
                const errorData = await cutsResponse.json();
                toast.error(`Error: ${errorData.message}`);
                throw new Error(errorData.message || 'Error al actualizar el corte');
            }

            const data = await cutsResponse.json();
            toast.success("¡Corte actualizado correctamente!");
            router.push('/dashboard/admin/cuts');
        } catch (error: any) {
            console.error('Error:', error);
            setError(error.message || 'Ha ocurrido un error al intentar actualizar el corte.');
        }
    };


    return (
        <CardUpdateCut
            handleSubmit={handleSubmit}
            name={name}
            description={description}
            weight={weight}
            setName={setName}
            setDescription={setDescription}
            setWeight={setWeight}
            error={error}
            cutId={id}
        />
    );
};

export default UpdateCut;
