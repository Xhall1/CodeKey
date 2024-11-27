import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";
import logo from "../assets/images/codekey_unimayor.png";
import text from "../assets/images/CodeKeyUnimayor.png";
import Modal from "../components/Modal";

const API_URL = "http://localhost:3000/api/v1";

const SignUp: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatedPassword, setRepeatedPassword] = useState<string>("");
  const [modalMessage, setModalMessage] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validación de campos completos
    if (!name || !email || !password || !repeatedPassword) {
      setModalMessage("Por favor complete todos los campos");
      setShowModal(true);
      return;
    }

    // Validación de contraseñas iguales
    if (password !== repeatedPassword) {
      setModalMessage("Las contraseñas no coinciden");
      setShowModal(true);
      return;
    }

    // Validación de complejidad de contraseña
    const isStrongPassword = (pass: string): boolean => {
      const hasUppercase = /[A-Z]/.test(pass);
      const hasLowercase = /[a-z]/.test(pass);
      const hasNumber = /[0-9]/.test(pass);

      return hasUppercase && hasLowercase && hasNumber;
    };

    if (!isStrongPassword(password)) {
      setModalMessage(
        "Contraseña debe tener al menos una mayúscula, una minúscula y un número"
      );
      setShowModal(true);
      return;
    }

    // Validación de dominio de correo
    if (!email.endsWith("@unimayor.edu.co")) {
      setModalMessage("El correo debe ser del dominio @unimayor.edu.co");
      setShowModal(true);
      return;
    }

    try {
      await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password,
        repeatedPassword,
      });

      // Limpiar campos después de registro exitoso
      setName("");
      setEmail("");
      setPassword("");
      setRepeatedPassword("");

      // Mostrar mensaje de éxito
      setModalMessage(
        `Registro exitoso. Por favor, verifica tu cuenta a través del enlace enviado a tu correo electrónico (${email}).`
      );
      setShowModal(true);
    } catch (error) {
      console.error("Error durante el registro:", error);

      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data.message || "Error en el registro";

        setModalMessage(errorMessage);
      } else {
        setModalMessage("Error en el registro. Por favor, intente de nuevo.");
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
              />
              <i>Nombre completo</i>
            </div>
            <div className="inputBox">
              <input
                type="email"
                required
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
              <i>Correo (@unimayor.edu.co)</i>
            </div>
            <div className="inputBox">
              <input
                type="password"
                required
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
              />
              <i>Contraseña</i>
            </div>
            <div className="inputBox">
              <input
                type="password"
                required
                value={repeatedPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setRepeatedPassword(e.target.value)
                }
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
      {showModal && <Modal message={modalMessage} onClose={closeModal} />}
    </section>
  );
};

export default SignUp;
