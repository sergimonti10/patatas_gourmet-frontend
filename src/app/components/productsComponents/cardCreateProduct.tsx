import React, { useState, useEffect } from 'react';
import { Input, Select, SelectItem, Button } from "@nextui-org/react";
import { CUTS_BASE_URL } from '@/services/links';
import useUserStore from '../../../../store/authStore';

interface Cut {
    id: string;
    name: string;
}

interface CardProps {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    name: string;
    description: string;
    price: string;
    weight: string;
    image: File | null;
    image2: File | null;
    id_cut: string | null;
    setName: (name: string) => void;
    setDescription: (description: string) => void;
    setPrice: (price: string) => void;
    setWeight: (weight: string) => void;
    setImage: (image: File | null) => void;
    setImage2: (image: File | null) => void;
    setIdCut: (id_cut: string | null) => void;
    error: string;
}

const CardCreateProduct: React.FC<CardProps> = ({
    handleSubmit, name, description, price, weight, image, image2, id_cut,
    setName, setDescription, setPrice, setWeight, setImage, setImage2, setIdCut, error
}) => {
    const [cuts, setCuts] = useState<Cut[]>([]);
    const { token } = useUserStore();

    useEffect(() => {
        fetch(CUTS_BASE_URL, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => setCuts(data))
            .catch(error => console.error('Error fetching cuts:', error));
    }, [token]);

    return (
        <div className='h-full w-full flex justify-center items-center'>
            <div className="bg-slate-100 p-3 sm:p-6 w-full max-w-md rounded-xl shadow-md bg-opacity-80 hover:shadow-lg transform transition duration-300 hover:scale-105">
                <form onSubmit={handleSubmit} className="my-5">
                    <p className='text-2xl text-center my-3 md:text-3xl lg:my-5'>Crear Producto</p>
                    <div className='grid grid-cols-1 gap-4'>
                        <div className='text-lg md:text-xl'>
                            <Input
                                type="text"
                                label="Nombre"
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
                                label="Descripción"
                                variant="bordered"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                className="max-w-xs"
                            />
                        </div>
                        <div className='text-lg md:text-xl'>
                            <Input
                                type="number"
                                label="Precio"
                                variant="bordered"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                                className="max-w-xs"
                            />
                        </div>
                        <div className='text-lg md:text-xl'>
                            <Input
                                type="number"
                                label="Peso"
                                variant="bordered"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                required
                                className="max-w-xs"
                            />
                        </div>
                        <div className='text-lg md:text-xl'>
                            <label htmlFor="image">Imagen</label>
                            <input
                                type="file"
                                id="image"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        setImage(e.target.files[0]);
                                    }
                                }}
                                required
                                className="w-full shadow-md rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:shadow-amber-700 focus:ring-opacity-50"
                            />
                        </div>
                        <div className='text-lg md:text-xl'>
                            <label htmlFor="image2">Imagen 2</label>
                            <input
                                type="file"
                                id="image2"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        setImage2(e.target.files[0]);
                                    }
                                }}
                                required
                                className="w-full shadow-md rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:shadow-amber-700 focus:ring-opacity-50"
                            />
                        </div>
                        <div className="text-lg md:text-xl">
                            <label htmlFor="id_cut">Tipo de Corte</label>
                            <Select
                                label="Selecciona un corte"
                                className="max-w-xs"
                                name="id_cut"
                                id="id_cut"
                                value={id_cut || ''}
                                onChange={(e) => setIdCut(e.target.value)}
                            >
                                {cuts.map((cut) => (
                                    <SelectItem key={cut.id} value={cut.id}>
                                        {cut.name}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>
                    </div>
                    {error && <div className="text-red-700 grid font-bold place-content-center my-6">{error}</div>}
                    <div className='mt-8 grid place-content-center'>
                        <Button
                            type='submit'
                            radius="full"
                            className="bg-gradient-to-tr from-amber-600 to-yellow-400 text-white shadow-lg"
                        >
                            Crear Producto
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CardCreateProduct;
