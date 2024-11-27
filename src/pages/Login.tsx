import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import Modal from '@/components/Modal';
import logo from '../assets/images/codekey_unimayor.png';
import text from '../assets/images/CodeKeyUnimayor.png';
import axios from 'axios';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [modalMessage, setModalMessage] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);

  const API_URL = 'http://localhost:3000/api/v1';

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@unimayor\.edu\.co$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setModalMessage('El correo debe ser del dominio @unimayor.edu.co');
      setShowModal(true);
      return;
    }

    if (password === '') {
      setModalMessage('Por favor ingresa tu contraseña');
      setShowModal(true);
      return;
    }

    try {

      //Peticion al login
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });

      //Guardo el token en el localStorage
      const { token } = response.data;
      localStorage.setItem('authToken', token);
      navigate('/recursos');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { message } = error.response.data;
        setModalMessage(`Error al iniciar sesión ${message}`);
        setShowModal(true);

      } else {
        setModalMessage('Hubo un problema con la solicitud. Intenta más tarde.');
        setShowModal(true);
      }
    }
  };

  const handleCloseModal = (): void => {
    setShowModal(false);
  };

  const handleRegisterRedirect = (): void => {
    navigate('/signup');
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
              <i>Correo</i>
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
              {/* Redirigir al olvido de contraseña */}
              <Link to="/forgot-password">Olvidé la contraseña</Link>
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
          message={modalMessage}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
};

export default Login;
