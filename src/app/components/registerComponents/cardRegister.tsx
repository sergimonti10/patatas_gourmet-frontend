import { Input, Button } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';

interface CardProps {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    email: string;
    password: string;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    error: string;
    name: string;
    surname: string;
    postalCode: string;
    locality: string;
    province: string;
    street: string;
    number: string;
    floor?: string;
    staircase?: string;
    image?: File | null;
    phone: string;
    setName: (name: string) => void;
    setSurname: (surname: string) => void;
    setPostalCode: (postalCode: string) => void;
    setLocality: (locality: string) => void;
    setProvince: (province: string) => void;
    setStreet: (street: string) => void;
    setNumber: (number: string) => void;
    setFloor?: (floor: string) => void;
    setStaircase?: (staircase: string) => void;
    setImage?: (image: File | null) => void;
    setPhone: (phone: string) => void;
}

const CardRegister: React.FC<CardProps> = ({
    handleSubmit, email, password, setEmail, setPassword, error,
    name, surname, postalCode, locality, province, street, number, floor, staircase, image, phone,
    setName, setSurname, setPostalCode, setLocality, setProvince, setStreet, setNumber, setFloor, setStaircase, setImage, setPhone
}) => {
    const [confirmPassword, setConfirmPassword] = useState('');
    const [samePasswords, setSamePasswords] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        if (password !== confirmPassword) {
            setSamePasswords(false);
        } else {
            setSamePasswords(true);
        }
    }, [password, confirmPassword]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (setImage && e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
            setSelectedImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    return (
        <div className='h-full w-full flex justify-center items-center'>
            <div className="bg-slate-100 p-3 sm:p-6 w-full max-w-md rounded-xl shadow-md hover:shadow-lg transform transition duration-300 hover:scale-105 overflow-auto">
                <form onSubmit={handleSubmit} className="my-5">
                    <p className='text-2xl text-center my-3 md:text-3xl lg:my-5'>Registro</p>
                    <p className='text-center italic my-3 text-amber-800 lg:my-3'>Tu dirección nos servirá para enviarte nuestros productos</p>
                    <p className='text-center italic my-3 text-red-800 lg:my-3'>Los campos con * son obligatorios.</p>
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='text-lg md:text-xl'>
                            <Input
                                type="text"
                                label="Nombre*"
                                variant="bordered"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="max-w-xs"
                            />
                        </div>
                        <div className='text-lg md:text-xl'>
                            <Input
                                type="text"
                                label="Apellido*"
                                variant="bordered"
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                                required
                                className="max-w-xs"
                            />
                        </div>
                        <div className='text-lg md:text-xl'>
                            <Input
                                type="email"
                                label="Correo electrónico*"
                                variant="bordered"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="max-w-xs"
                            />
                        </div>
                        <div className='text-lg md:text-xl'>
                            <Input
                                type="password"
                                label="Contraseña*"
                                variant="bordered"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="max-w-xs"
                            />
                        </div>
                        <div className='text-lg md:text-xl'>
                            <Input
                                type="password"
                                label="Confirma tu contraseña*"
                                variant="bordered"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="max-w-xs"
                            />
                        </div>
                        <div className='text-lg md:text-xl'>
                            <Input
                                type="text"
                                label="Código Postal*"
                                variant="bordered"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                required
                                className="max-w-xs"
                            />
                        </div>
                        <div className='text-lg md:text-xl'>
                            <Input
                                type="text"
                                label="Localidad*"
                                variant="bordered"
                                value={locality}
                                onChange={(e) => setLocality(e.target.value)}
                                required
                                className="max-w-xs"
                            />
                        </div>
                        <div className='text-lg md:text-xl'>
                            <Input
                                type="text"
                                label="Provincia*"
                                variant="bordered"
                                value={province}
                                onChange={(e) => setProvince(e.target.value)}
                                required
                                className="max-w-xs"
                            />
                        </div>
                        <div className='text-lg md:text-xl'>
                            <Input
                                type="text"
                                label="Calle*"
                                variant="bordered"
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                                required
                                className="max-w-xs"
                            />
                        </div>
                        <div className='text-lg md:text-xl'>
                            <Input
                                type="text"
                                label="Número*"
                                variant="bordered"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                                required
                                className="max-w-xs"
                            />
                        </div>
                        <div className='text-lg md:text-xl'>
                            <Input
                                type="text"
                                label="Piso"
                                variant="bordered"
                                value={floor || ''}
                                onChange={(e) => setFloor && setFloor(e.target.value)}
                                className="max-w-xs"
                            />
                        </div>
                        <div className='text-lg md:text-xl'>
                            <Input
                                type="text"
                                label="Escalera"
                                variant="bordered"
                                value={staircase || ''}
                                onChange={(e) => setStaircase && setStaircase(e.target.value)}
                                className="max-w-xs"
                            />
                        </div>
                        <div className='text-lg md:text-xl'>
                            <Input
                                type="text"
                                label="Teléfono*"
                                variant="bordered"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                                className="max-w-xs"
                            />
                        </div>
                    </div>
                    <div className='text-lg md:text-xl my-2'>
                        <label htmlFor="image">Imagen</label>
                        <input
                            type="file"
                            name="image"
                            id="image"
                            onChange={handleImageChange}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-100 file:text-amber-950 hover:file:bg-amber-200"
                        />
                    </div>
                    {selectedImage && (
                        <div className="mt-4 flex flex-col items-center">
                            <p>Imagen seleccionada</p>
                            <img src={selectedImage} alt="Imagen usuario" className="rounded-xl w-20 h-20" />
                        </div>
                    )}
                    {!samePasswords && <div className="text-red-700 grid font-bold place-content-center my-6">Las contraseñas no coinciden</div>}
                    {error && <div className="text-red-700 grid font-bold place-content-center my-6">{error}</div>}
                    <div className='mt-8 grid place-content-center'>
                        <Button
                            type="submit"
                            disabled={!samePasswords}
                            className={`${!samePasswords ? "opacity-50 cursor-not-allowed" : ""} bg-gradient-to-tr from-amber-600 to-yellow-400 text-white shadow-lg`}
                        >
                            Registrarse
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CardRegister;
