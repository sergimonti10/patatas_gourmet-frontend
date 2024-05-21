import React from 'react';

const CardLogin = ({ handleSubmit, email, password, setEmail, setPassword, error }) => {
  return (
    <div className='h-5/6 grid place-content-center'>
      <div className="bg-slate-100 p-3 sm:p-6 w-full max-w-md rounded-xl shadow-md bg-opacity-80">
        <form onSubmit={handleSubmit} className="my-5">
          <p className='text-2xl text-center my-3 md:text-3xl lg:my-5'>Inicio de sesión</p>
          <div className='my-5 text-lg md:text-xl'>
            <label htmlFor="email">Correo electrónico</label>
            <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full shadow-md rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:shadow-amber-700 focus:ring-opacity-50" />
          </div>
          <div className='mb-7 text-lg md:text-xl'>
            <label htmlFor="password">Contraseña</label>
            <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full shadow-md rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:shadow-amber-700 focus:ring-opacity-50" />
          </div>

          {error && <div className="text-red-700 grid font-bold place-content-center mb-4">{error}</div>}
          <div className='grid place-content-center'>
            <button className="hover:from-amber-700 hover:to-amber-900 bg-gradient-to-t from-amber-600 to-amber-700 shadow-md transition-all active:scale-95 text-white font-bold py-2 px-4 rounded-md">Iniciar sesión</button>
          </div>
          {/* <p className='link text-center'>¿Olvidaste tu contraseña?</p> Añadir link */}
          {/* <Button className='button'>Registrarse</Button> */}
        </form>
      </div>
    </div>
  );
};

export default CardLogin;
