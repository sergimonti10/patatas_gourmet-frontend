import React, { useState } from "react";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import useUserStore from '../../../../store/authStore';
import { CUTS_BASE_URL } from "@/services/links";
import CardCreateCut from "./cardCreateCut";

interface CreateCutProps {
    router: ReturnType<typeof useRouter>;
}

const CreateCut = ({ router }: CreateCutProps) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [weight, setWeight] = useState("");
    const [error, setError] = useState("");
    const { token } = useUserStore();

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        const cutData = { name, description, weight };

        try {
            const cutsResponse = await fetch(CUTS_BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                credentials: 'include',
                body: JSON.stringify(cutData),
            });

            if (!cutsResponse.ok) {
                toast.error("Error al crear el corte");
                const errorData = await cutsResponse.json();
                throw new Error(errorData.message || 'Error al crear el corte');
            }

            const data = await cutsResponse.json();
            console.log(data);
            toast.success("Corte creado correctamente");

            // Añadir un toast
            router.push('/dashboard/admin');
        } catch (error: any) {
            console.error('Error:', error);
            setError(error.message || 'Ha ocurrido un error al intentar crear el corte.');
            toast.error(error.message || 'Ha ocurrido un error al intentar crear el corte.');
        }
    };

    return (
        <CardCreateCut
            handleSubmit={handleSubmit}
            name={name}
            description={description}
            weight={weight}
            setName={setName}
            setDescription={setDescription}
            setWeight={setWeight}
            error={error}
        />
    );
};

export default CreateCut;
