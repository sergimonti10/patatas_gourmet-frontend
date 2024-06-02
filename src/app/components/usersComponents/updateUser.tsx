import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import CardUpdateUser from "./cardUpdateUser";
import useUserStore from '../../../../store/authStore';
import { USER_ID_BASE_URL } from "@/services/links";
import { toast } from "react-toastify";

interface UpdateUserProps {
    router: ReturnType<typeof useRouter>;
    params: { id: string };
}

const UpdateUser = ({ router, params }: UpdateUserProps) => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [postal_code, setPostalCode] = useState("");
    const [locality, setLocality] = useState("");
    const [province, setProvince] = useState("");
    const [street, setStreet] = useState("");
    const [number, setNumber] = useState("");
    const [floor, setFloor] = useState("");
    const [staircase, setStaircase] = useState("");
    const [phone, setPhone] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [error, setError] = useState("");
    const { token } = useUserStore();
    const { id } = params;

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('surname', surname);
        formData.append('postal_code', postal_code);
        formData.append('locality', locality);
        formData.append('province', province);
        formData.append('street', street);
        formData.append('number', number);
        formData.append('floor', floor);
        formData.append('staircase', staircase);
        formData.append('phone', phone);
        if (image) {
            formData.append('image', image);
        }
        formData.append('_method', 'PUT');

        formData.forEach((value, key) => {
            console.log(key, value);
        });

        try {
            const userResponse = await fetch(`${USER_ID_BASE_URL}${id}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (!userResponse.ok) {
                const errorData = await userResponse.json();
                toast.error(`Error: ${errorData.message}`);
                throw new Error(errorData.message || 'Error al actualizar el usuario');
            }

            const data = await userResponse.json();
            console.log(data);
            toast.success("¡Usuario actualizado correctamente!");
            window.location.reload();
        } catch (error: any) {
            console.error('Error:', error);
            setError(error.message || 'Ha ocurrido un error al intentar actualizar el usuario.');
        }
    };


    return (
        <CardUpdateUser
            handleSubmit={handleSubmit}
            name={name}
            surname={surname}
            postal_code={postal_code}
            locality={locality}
            province={province}
            street={street}
            number={number}
            floor={floor}
            staircase={staircase}
            phone={phone}
            image={image}
            setName={setName}
            setSurname={setSurname}
            setPostalCode={setPostalCode}
            setLocality={setLocality}
            setProvince={setProvince}
            setStreet={setStreet}
            setNumber={setNumber}
            setFloor={setFloor}
            setStaircase={setStaircase}
            setPhone={setPhone}
            setImage={setImage}
            error={error}
            userId={id}
        />
    );
};

export default UpdateUser;
