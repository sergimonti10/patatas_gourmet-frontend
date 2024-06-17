import React from 'react';
import { Button, Input } from '@nextui-org/react';

const CardLogin = ({ handleSubmit, email, password, setEmail, setPassword, error }) => {
  return (
    <div className='h-full w-full flex justify-center items-center'>
      <div className="bg-slate-100 p-3 sm:p-6 w-full max-w-md rounded-xl shadow-md hover:shadow-lg transform transition duration-300 hover:scale-105 overflow-auto">
        <form onSubmit={handleSubmit} className="my-5">
          <p className='text-2xl text-center my-3 md:text-3xl lg:my-5'>Inicio de sesión</p>
          <div className='grid grid-cols-1 gap-4'>
            <div className='text-lg md:text-xl'>
              <Input
                type="email"
                label="Correo electrónico"
                variant="bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <div className='text-lg md:text-xl'>
              <Input
                type="password"
                label="Contraseña"
                variant="bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
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
              Iniciar sesión
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CardLogin;
