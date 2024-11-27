import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '@/components/Modal';
import logo from '../assets/images/codekey_unimayor.png';
import text from '../assets/images/CodeKeyUnimayor.png';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@unimayor\.edu\.co$/;
    return emailRegex.test(email);
  };

  const handleResetPassword = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setError('El correo debe ser del dominio @unimayor.edu.co');
      setShowModal(true);
      return;
    }


    setSuccess('Se ha enviado un enlace de restablecimiento de contraseña a tu correo electrónico.');
    setShowModal(true);
  };

  const handleCloseModal = (): void => {
    setShowModal(false);
    setError('');
    setSuccess('');
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-[#0D0D0D] p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <img src={logo} alt="Codekey Logo" className="w-24 h-24 mb-4" />
          <img src={text} alt="Text CodeKey" className="w-48" />
        </div>

        <div className="bg-black/30 backdrop-blur-md rounded-2xl border border-[#F160FE]/20 shadow-[0_0_50px_rgba(241,96,254,0.3)] p-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Olvidé mi Contraseña</h2>
          <form className="space-y-6" onSubmit={handleResetPassword}>
            <div className="relative">
              <input
                type="text"
                required
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b-2 border-[#F160FE] text-white px-3 py-2 focus:outline-none focus:border-[#7B2FFE] transition-colors peer"
                placeholder=" "
              />
              <label className="absolute left-3 top-2 text-[#F160FE] transition-all duration-300 transform -translate-y-6 scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Correo Electrónico
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#F160FE] to-[#7B2FFE] text-white py-2 rounded-md hover:from-[#7B2FFE] hover:to-[#F160FE] transition-all duration-300 shadow-lg hover:shadow-[#F160FE]/50"
            >
              Restablecer Contraseña
            </button>
          </form>
          <div className="mt-4 text-center">
            <Link to="/login" className="text-[#F160FE] hover:text-[#7B2FFE] transition-colors">
              Volver al Inicio de Sesión
            </Link>
          </div>
        </div>
      </div>

      {showModal && (
        <Modal 
          message={error || success} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
};

export default ForgotPassword;