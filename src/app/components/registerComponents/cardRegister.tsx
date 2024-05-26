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

    useEffect(() => {
        if (password !== confirmPassword) {
            setSamePasswords(false);
        } else {
            setSamePasswords(true);
        }
    }, [password, confirmPassword]);

    return (
        <div className='h-full w-full flex justify-center items-center'>
            <div className="bg-slate-100 p-3 sm:p-6 w-full max-w-md rounded-xl shadow-md bg-opacity-80">
                <form onSubmit={handleSubmit} className="my-5">
                    <p className='text-2xl text-center my-3 md:text-3xl lg:my-5'>Registro</p>
                    <p className='text-center italic my-3 text-amber-800 lg:my-3'>Tu dirección nos servirá para enviarte nuestros productos</p>
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='text-lg md:text-xl'>
                            <label htmlFor="name">Nombre</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full shadow-md rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:shadow-amber-700 focus:ring-opacity-50"
                            />
                        </div>
                        <div className='text-lg md:text-xl'>
                            <label htmlFor="surname">Apellido</label>
                            <input
                                type="text"
                                name="surname"
                                id="surname"
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                                required
                                className="w-full shadow-md rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:shadow-amber-700 focus:ring-opacity-50"
                            />
                        </div>
                        <div className='text-lg md:text-xl'>
                            <label htmlFor="email">Correo electrónico</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full shadow-md rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:shadow-amber-700 focus:ring-opacity-50"
                            />
                        </div>
                        <div className='text-lg md:text-xl'>
                            <label htmlFor="password">Contraseña</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full shadow-md rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:shadow-amber-700 focus:ring-opacity-50"
                            />
                        </div>
                        <div className='text-lg md:text-xl'>
                            <label htmlFor="confirmPassword">Confirma tu contraseña</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="w-full shadow-md rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:shadow-amber-700 focus:ring-opacity-50"
                            />
                        </div>
                        <div className='text-lg md:text-xl'>
                            <label htmlFor="postalCode">Código Postal</label>
                            <input
                                type="text"
                                name="postalCode"
                                id="postalCode"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                required
                                className="w-full shadow-md rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:shadow-amber-700 focus:ring-opacity-50"
                            />
                        </div>
                        <div className='text-lg md:text-xl'>
                            <label htmlFor="locality">Localidad</label>
                            <input
                                type="text"
                                name="locality"
                                id="locality"
                                value={locality}
                                onChange={(e) => setLocality(e.target.value)}
                                required
                                className="w-full shadow-md rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:shadow-amber-700 focus:ring-opacity-50"
                            />
                        </div>
                        <div className='text-lg md:text-xl'>
                            <label htmlFor="province">Provincia</label>
                            <input
                                type="text"
                                name="province"
                                id="province"
                                value={province}
                                onChange={(e) => setProvince(e.target.value)}
                                required
                                className="w-full shadow-md rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:shadow-amber-700 focus:ring-opacity-50"
                            />
                        </div>
                        <div className='text-lg md:text-xl'>
                            <label htmlFor="street">Calle</label>
                            <input
                                type="text"
                                name="street"
                                id="street"
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                                required
                                className="w-full shadow-md rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:shadow-amber-700 focus:ring-opacity-50"
                            />
                        </div>
                        <div className='text-lg md:text-xl'>
                            <label htmlFor="number">Número</label>
                            <input
                                type="text"
                                name="number"
                                id="number"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                                required
                                className="w-full shadow-md rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:shadow-amber-700 focus:ring-opacity-50"
                            />
                        </div>
                        <div className='text-lg md:text-xl'>
                            <label htmlFor="floor">Piso</label>
                            <input
                                type="text"
                                name="floor"
                                id="floor"
                                value={floor || ''}
                                onChange={(e) => setFloor && setFloor(e.target.value)}
                                className="w-full shadow-md rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:shadow-amber-700 focus:ring-opacity-50"
                            />
                        </div>
                        <div className='text-lg md:text-xl'>
                            <label htmlFor="staircase">Escalera</label>
                            <input
                                type="text"
                                name="staircase"
                                id="staircase"
                                value={staircase || ''}
                                onChange={(e) => setStaircase && setStaircase(e.target.value)}
                                className="w-full shadow-md rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:shadow-amber-700 focus:ring-opacity-50"
                            />
                        </div>
                        <div className='text-lg md:text-xl'>
                            <label htmlFor="image">Imagen</label>
                            <input
                                type="file"
                                name="image"
                                id="image"
                                onChange={(e) => {
                                    if (setImage && e.target.files && e.target.files[0]) {
                                        setImage(e.target.files[0]);
                                    }
                                }}
                                className="w-full shadow-md rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:shadow-amber-700 focus:ring-opacity-50"
                            />
                        </div>

                        <div className='text-lg md:text-xl'>
                            <label htmlFor="phone">Teléfono</label>
                            <input
                                type="text"
                                name="phone"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                                className="w-full shadow-md rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:shadow-amber-700 focus:ring-opacity-50"
                            />
                        </div>
                    </div>
                    {!samePasswords && <div className="text-red-700 grid font-bold place-content-center my-6">Las contraseñas no coinciden</div>}
                    {error && <div className="text-red-700 grid font-bold place-content-center my-6">{error}</div>}
                    <div className='grid place-content-center'>
                        <button
                            type="submit"
                            disabled={!samePasswords}
                            className={`${!samePasswords ? "opacity-50 cursor-not-allowed" : ""} hover:from-amber-700 hover:to-amber-900 bg-gradient-to-t from-amber-600 to-amber-700 shadow-md transition-all active:scale-95 text-white font-bold py-2 mt-4 px-4 rounded-md`}
                        >
                            Registrarse
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CardRegister;
