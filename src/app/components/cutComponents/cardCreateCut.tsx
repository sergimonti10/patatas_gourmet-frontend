import React, { useState } from 'react';
import { Input } from "@nextui-org/react";

interface CardCreateCutProps {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    name: string;
    description: string;
    weight: string;
    setName: (name: string) => void;
    setDescription: (description: string) => void;
    setWeight: (weight: string) => void;
    error: string;
}

const CardCreateCut: React.FC<CardCreateCutProps> = ({
    handleSubmit, name, description, weight,
    setName, setDescription, setWeight, error
}) => {
    return (
        <div className='h-full w-full flex justify-center items-center'>
            <div className="bg-slate-100 p-3 sm:p-6 w-full max-w-md rounded-xl shadow-md bg-opacity-80 hover:shadow-lg transform transition duration-300 hover:scale-105">
                <form onSubmit={handleSubmit} className="my-5">
                    <p className='text-2xl text-center my-3 md:text-3xl lg:my-5'>Crear Corte</p>
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
                    <div className='grid place-content-center'>
                        <button
                            type="submit"
                            className="hover:from-amber-700 hover:to-amber-900 bg-gradient-to-t from-amber-600 to-amber-700 shadow-md transition-all active:scale-95 text-white font-bold py-2 mt-4 px-4 rounded-md"
                        >
                            Registrar Corte
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CardCreateCut;
