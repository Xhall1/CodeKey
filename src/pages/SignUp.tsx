import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css'; 
import logo from '../assets/images/codekey_unimayor.png'; 
import text from '../assets/images/CodeKeyUnimayor.png';
import Modal from '../components/Modal'; 

const API_URL = 'http://localhost:3000/api/v1';

const SignUp: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatedPassword, setRepeatedPassword] = useState<string>('');
  const [modalMessage, setModalMessage] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
  
    if (!email.endsWith('@unimayor.edu.co')) {
      setModalMessage('El correo debe ser del dominio @unimayor.edu.co');
      setShowModal(true);
      return;
    }

    if (password !== repeatedPassword) {
      setModalMessage('Las contraseñas no coinciden');
      setShowModal(true);
      return;
    }

    try {
      console.log('Enviando solicitud de registro al backend...');
      const response = await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password,
        repeatedPassword
      });

      console.log('Respuesta del servidor:', response.data);
  
      setName('');
      setEmail('');
      setPassword('');
      setRepeatedPassword('');
    
      setModalMessage(`Registro exitoso. Por favor, verifica tu cuenta a través del enlace enviado a tu correo electrónico (${email}).`);
      setShowModal(true);
    } catch (error) {
      console.error('Error durante el registro:', error);
      if (axios.isAxiosError(error) && error.response) {
        console.error('Respuesta de error del servidor:', error.response.data);
        if (error.response.status === 400) {
          setModalMessage(`Error en el registro: ${error.response.data.message}`);
        } else {
          setModalMessage('Error en el registro. Por favor, intente de nuevo.');
        }
      } else {
        setModalMessage('Error en el registro. Por favor, intente de nuevo.');
      }
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
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
          <h2>Registrate</h2>
          <form className="form" onSubmit={handleSubmit}>
            <div className="inputBox">
              <input 
                type="text" 
                required 
                value={name} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} 
              />
              <i>Nombre completo</i>
            </div>
            <div className="inputBox">
              <input 
                type="email" 
                required 
                value={email} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} 
              />
              <i>Correo (@unimayor.edu.co)</i>
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
            <div className="inputBox">
              <input 
                type="password" 
                required 
                value={repeatedPassword} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRepeatedPassword(e.target.value)} 
              />
              <i>Repetir Contraseña</i>
            </div>
            <div className="links">
              <a href="#">Olvidé la contraseña</a>
              <Link to="/Login">Iniciar sesión</Link> 
            </div>
            <div className="inputBox">
              <input type="submit" value="Registrarse" />
            </div>
          </form>
        </div>
      </div>
      {showModal && (
        <Modal 
          message={modalMessage} 
          onClose={closeModal} 
        />
      )}
    </section>
  );
};

export default SignUp;