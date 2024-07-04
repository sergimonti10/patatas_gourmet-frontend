import React, { useState, useEffect } from 'react';
import { Button, Input } from "@nextui-org/react";
import { USER_ID_BASE_URL, IMAGE_USERS_BASE_URL } from '@/services/links';
import useUserStore from '../../../../store/authStore';

interface CardProps {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    name: string;
    surname: string;
    postal_code: string;
    locality: string;
    province: string;
    street: string;
    number: string;
    floor: string;
    staircase: string;
    phone: string;
    image: File | null;
    setName: (name: string) => void;
    setSurname: (surname: string) => void;
    setPostalCode: (postal_code: string) => void;
    setLocality: (locality: string) => void;
    setProvince: (province: string) => void;
    setStreet: (street: string) => void;
    setNumber: (number: string) => void;
    setFloor: (floor: string) => void;
    setStaircase: (staircase: string) => void;
    setPhone: (phone: string) => void;
    setImage: (image: File | null) => void;
    error: string;
    userId: string;
}

const CardUpdateUser: React.FC<CardProps> = ({
    handleSubmit, name, surname, postal_code, locality, province, street, number, floor, staircase, phone, image,
    setName, setSurname, setPostalCode, setLocality, setProvince, setStreet, setNumber, setFloor, setStaircase, setPhone, setImage, error, userId
}) => {
    const { token } = useUserStore();
    const [userImage, setUserImage] = useState('');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        fetch(`${USER_ID_BASE_URL}${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setName(data.name);
                setSurname(data.surname);
                setPostalCode(data.postal_code);
                setLocality(data.locality);
                setProvince(data.province);
                setStreet(data.street);
                setNumber(data.number);
                setFloor(data.floor);
                setStaircase(data.staircase);
                setPhone(data.phone);
                setUserImage(data.image ? `${data.image}` : "/images/user.png");
            })
            .catch(error => console.error('Error fetching user:', error));
    }, [userId, token, setName, setSurname, setPostalCode, setLocality, setProvince, setStreet, setNumber, setFloor, setStaircase, setPhone]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='h-full w-full flex justify-center items-center'>
            <div className="bg-slate-100 p-3 sm:p-6 w-full max-w-md rounded-xl shadow-md bg-opacity-80 hover:shadow-lg transform transition duration-300 hover:scale-105 overflow-auto">
                <form onSubmit={handleSubmit} className="my-5">
                    <p className='text-2xl text-center my-3 md:text-3xl lg:my-5'>Actualizar Usuario</p>
                    <p className='text-center italic my-3 text-red-800 lg:my-3'>Los campos con * son obligatorios.</p>
                    <div className='grid grid-cols-1 gap-4'>
                        <div className='text-lg md:text-xl'>
                            <Input
                                type="text"
                                label="Nombre*"
                                variant="bordered"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="max-w-s"
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
                                className="max-w-s"
                            />
                        </div>
                        <div className='text-lg md:text-xl'>
                            <Input
                                type="text"
                                label="Código Postal*"
                                variant="bordered"
                                value={postal_code}
                                onChange={(e) => setPostalCode(e.target.value)}
                                required
                                className="max-w-s"
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
                                className="max-w-s"
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
                                className="max-w-s"
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
                                className="max-w-s"
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
                                className="max-w-s"
                            />
                        </div>
                        <div className='text-lg md:text-xl'>
                            <Input
                                type="text"
                                label="Piso"
                                variant="bordered"
                                value={floor}
                                onChange={(e) => setFloor(e.target.value)}
                                className="max-w-s"
                            />
                        </div>
                        <div className='text-lg md:text-xl'>
                            <Input
                                type="text"
                                label="Escalera"
                                variant="bordered"
                                value={staircase}
                                onChange={(e) => setStaircase(e.target.value)}
                                className="max-w-s"
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
                                className="max-w-s"
                            />
                        </div>
                        <div className='text-lg md:text-xl'>
                            <label htmlFor="image">Imagen</label>
                            {userImage && (
                                <img src={userImage} alt="Imagen usuario" className="h-20 w-20 rounded-xl mb-2" />
                            )}
                            <input
                                type="file"
                                id="image"
                                onChange={handleImageChange}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-100 file:text-amber-950 hover:file:bg-amber-200"
                            />
                        </div>
                        {selectedImage && (
                            <div className='text-start mt-4'>
                                <p className='text-lg'>Imagen seleccionada</p>
                                <img src={selectedImage} alt="Imagen usuario" className="h-20 w-20 rounded-xl mb-2" />
                            </div>
                        )}
                    </div>
                    <div className='mt-8 text-center'>
                        <Button type='submit' radius="full" className="bg-gradient-to-tr from-amber-600 to-yellow-400 text-white shadow-lg">
                            Actualizar
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CardUpdateUser;
