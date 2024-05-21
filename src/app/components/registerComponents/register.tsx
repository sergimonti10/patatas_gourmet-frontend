import React, { useState } from "react";
import CardRegister from "./cardRegister";
import { useRouter } from 'next/navigation';
import useUserStore from '../../../../store/authStore';

interface RegisterProps {
    router: ReturnType<typeof useRouter>;
}

const Register = ({ router }: RegisterProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [locality, setLocality] = useState("");
    const [province, setProvince] = useState("");
    const [street, setStreet] = useState("");
    const [number, setNumber] = useState("");
    const [floor, setFloor] = useState("");
    const [staircase, setStaircase] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const { setUser, user, role, token, setToken, setRole } = useUserStore();

    console.log("User", user);
    console.log("Role", role);
    console.log("Token", token);

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('name', name);
        formData.append('surname', surname);
        formData.append('postal_code', postalCode);
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

        try {
            const registerResponse = await fetch('http://127.0.0.1:8000/api/register', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                },
                body: formData,
            });

            const data = await registerResponse.json();

            if (registerResponse.ok) {
                setUser(data.user);
                setToken(data.auth_token);
                setRole(data.roles);
                router.push('/dashboard');
            } else {
                throw new Error(data.message || 'Error al registrar');
            }
        } catch (error: any) {
            console.error('Error:', error);
            setError(error.message || 'Ha ocurrido un error al intentar registrar.');
        }
    };

    return (
        <CardRegister
            handleSubmit={handleSubmit}
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            error={error}
            name={name}
            surname={surname}
            postalCode={postalCode}
            locality={locality}
            province={province}
            street={street}
            number={number}
            floor={floor}
            staircase={staircase}
            image={image}
            phone={phone}
            setName={setName}
            setSurname={setSurname}
            setPostalCode={setPostalCode}
            setLocality={setLocality}
            setProvince={setProvince}
            setStreet={setStreet}
            setNumber={setNumber}
            setFloor={setFloor}
            setStaircase={setStaircase}
            setImage={setImage}
            setPhone={setPhone}
        />
    );
};

export default Register;
