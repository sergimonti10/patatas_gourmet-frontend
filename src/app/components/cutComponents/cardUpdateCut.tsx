import React, { useState, useEffect } from 'react';
import { Button, Input } from "@nextui-org/react";
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
    weight: string;
    setName: (name: string) => void;
    setDescription: (description: string) => void;
    setWeight: (weight: string) => void;
    error: string;
    cutId: string;
}

const CardUpdateCut: React.FC<CardProps> = ({
    handleSubmit, name, description, weight,
    setName, setDescription, setWeight, error, cutId
}) => {
    const { token } = useUserStore();

    useEffect(() => {
        fetch(`${CUTS_BASE_URL}/${cutId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setName(data.name);
                setDescription(data.description);
                setWeight(data.weight);
            })
            .catch(error => console.error('Error fetching cut:', error));
    }, [cutId, token, setName, setDescription, setWeight]);

    return (
        <div className='h-full w-full flex justify-center items-center'>
            <div className="bg-slate-100 p-3 sm:p-6 w-full max-w-md rounded-xl shadow-md bg-opacity-80 hover:shadow-lg transform transition duration-300 hover:scale-105">
                <form onSubmit={handleSubmit} className="my-5">
                    <p className='text-2xl text-center my-3 md:text-3xl lg:my-5'>Actualizar Corte</p>
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
                                label="Peso"
                                variant="bordered"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                required
                                className="max-w-xs"
                            />
                        </div>
                    </div>
                    {error && <div className="text-red-700 grid font-bold place-content-center my-6">{error}</div>}
                    <div className='mt-8 grid place-content-center'>
                        <Button
                            type='submit'
                            radius="full"
                            className="bg-gradient-to-tr from-amber-600 to-yellow-400 text-white shadow-lg"
                        >
                            Actualizar Corte
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CardUpdateCut;
