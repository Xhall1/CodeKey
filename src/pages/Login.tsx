import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import Modal from '@/components/Modal';
import logo from '../assets/images/codekey_unimayor.png';
import text from '../assets/images/CodekeyUnimayor.png';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@unimayor\.edu\.co$/;
    return emailRegex.test(email);
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setError('El correo debe ser del dominio @unimayor.edu.co');
      setShowModal(true);
      return;
    }

    if (password === '') {
      setError('Por favor ingresa tu contraseña');
      setShowModal(true);
      return;
    }

    setError('');
    navigate('/about');
  };

  const handleCloseModal = (): void => {
    setShowModal(false);
    setError('');
  };

  return (
    <section>
      {[...Array(200)].map((_, index) => (
        <span key={index}></span>
      ))}

      <div className="logo-container">
        <img src={logo} alt="Codekey Logo" className="logo" />
        <img src={text} alt="Text CodeKey" className="additional-image" />
      </div>

      <div className="signin">
        <div className="content">
          <h2>Iniciar Sesión</h2>
          <form className="form" onSubmit={handleLogin}> 
            <div className="inputBox">
              <input 
                type="text" 
                required 
                value={email} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} 
              /> 
              <i>Usuario</i>
            </div>
            <div className="inputBox">
              <input 
                type="password" 
                required 
                value={password} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} 
              /> 
              <i>Contraseña</i>
            </div>
            <div className="links">
              <a href="#">Olvidé la contraseña</a>
              <Link to="/signup">Registrate</Link> 
            </div>
            <div className="inputBox">
              <input type="submit" value="Iniciar Sesión" />
            </div>
          </form>
        </div>
      </div>

      {showModal && (
        <Modal 
          message={error} 
          onClose={handleCloseModal} 
        />
      )}
    </section>
  );
};

export default Login;