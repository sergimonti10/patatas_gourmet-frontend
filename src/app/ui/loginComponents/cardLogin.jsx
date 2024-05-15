import React from 'react';

const CardLogin = ({ handleSubmit, email, password, setEmail, setPassword, error }) => {
  return (
    <div className="centered-container">
      <div className="card-container">
        <form onSubmit={handleSubmit} className="form-container">
          <label className='centered-items'>Inicio de sesión</label>
          <label htmlFor="email" className='left-items'>Correo electrónico</label>
          <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label htmlFor="password" className='left-items'>Contraseña</label>
          <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <div className="error-message">{error}</div>}
          <button className='button'>Iniciar sesión</button>
          {/* <p className='link'>¿Olvidaste tu contraseña?</p> Añadir link */}
          {/* <Button className='button'>Registrarse</Button> */}
        </form>
      </div>
    </div>
  );
};

export default CardLogin;
