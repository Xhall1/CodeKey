import React, { useState } from 'react';
import { motion } from 'framer-motion';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import FuturisticBackground from '../components/FuturisticBackground';
import { Lock, User, Bell, Globe, Trash2, X } from 'lucide-react';

const ConfigOption: React.FC<{ 
  icon: React.ReactNode, 
  title: string, 
  description: string, 
  action: () => void 
}> = ({ icon, title, description, action }) => (
  <motion.div 
    className="bg-black/50 rounded-xl p-6 flex items-center justify-between hover:bg-[#F160FE]/10 transition-all duration-300 cursor-pointer"
    whileHover={{ scale: 1.02 }}
    onClick={action}
  >
    <div className="flex items-center">
      <div className="text-[#F160FE] mr-4">
        {icon}
      </div>
      <div>
        <h3 className="text-white text-lg font-semibold">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </div>
    <div className="text-[#F160FE]">
      ❯
    </div>
  </motion.div>
);

const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-[#1A1A1A] p-8 rounded-2xl border border-[#F160FE]/20 shadow-[0_0_50px_rgba(241,96,254,0.3)] max-w-md w-full relative"
      >
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
        {children}
      </motion.div>
    </div>
  );
};

const ConfigurationPage: React.FC = () => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const handleDeleteAccount = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDeleteAccount = () => {
    // León do the logic to delete an account!
    console.log("Cuenta eliminada");
    setShowDeleteConfirm(false);
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // León do the logic to update profile!
    console.log("Perfil actualizado");
    setShowUpdateProfile(false);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    // León do the logic to change password!
    console.log("Contraseña cambiada");
    setShowChangePassword(false);
  };

  return (
    <div className="min-h-screen w-full flex flex-col relative bg-[#0D0D0D]">
      <FuturisticBackground />
      <NavBar />
      <main className="flex-grow flex flex-col items-center justify-center px-4 pt-24 pb-16 relative z-10">
        <div className="w-full max-w-4xl bg-black/30 backdrop-blur-md rounded-2xl border border-[#F160FE]/20 shadow-[0_0_50px_rgba(241,96,254,0.3)] p-8">
          <h1 className="text-3xl font-bold text-white mb-8">Configuración</h1>
          
          <div className="space-y-4">
            <ConfigOption 
              icon={<Lock size={24} />}
              title="Cambiar Contraseña"
              description="Actualiza tu contraseña para mantener tu cuenta segura"
              action={() => setShowChangePassword(true)}
            />
            
            <ConfigOption 
              icon={<User size={24} />}
              title="Actualizar Perfil"
              description="Modifica tu información personal y foto de perfil"
              action={() => setShowUpdateProfile(true)}
            />
            
            <ConfigOption 
              icon={<Bell size={24} />}
              title="Notificaciones"
              description="Configura tus preferencias de notificaciones"
              action={() => console.log("Configurar notificaciones")}
            />
                       
            <ConfigOption 
              icon={<Globe size={24} />}
              title="Idioma"
              description="Cambia el idioma de la interfaz"
              action={() => console.log("Cambiar idioma")}
            />
            
            <ConfigOption 
              icon={<Trash2 size={24} />}
              title="Eliminar Cuenta"
              description="Elimina permanentemente tu cuenta y todos tus datos"
              action={handleDeleteAccount}
            />
          </div>
        </div>
      </main>
      <Footer />

      <Modal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        title="¿Estás seguro?"
      >
        <p className="text-gray-300 mb-6">Esta acción eliminará permanentemente tu cuenta y todos tus datos. No podrás recuperarlos después.</p>
        <div className="flex justify-end space-x-4">
          <button 
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            onClick={() => setShowDeleteConfirm(false)}
          >
            Cancelar
          </button>
          <button 
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            onClick={confirmDeleteAccount}
          >
            Eliminar Cuenta
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={showUpdateProfile}
        onClose={() => setShowUpdateProfile(false)}
        title="Actualizar Perfil"
      >
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">Nombre</label>
            <input type="text" id="name" name="name" className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#F160FE]" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
            <input type="email" id="email" name="email" className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#F160FE]" />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="px-4 py-2 bg-[#F160FE] text-white rounded-md hover:bg-[#F160FE]/80 transition-colors">
              Actualizar Perfil
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={showChangePassword}
        onClose={() => setShowChangePassword(false)}
        title="Cambiar Contraseña"
      >
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-300">Contraseña Actual</label>
            <input type="password" id="currentPassword" name="currentPassword" className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#F160FE]" />
          </div>
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300">Nueva Contraseña</label>
            <input type="password" id="newPassword" name="newPassword" className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#F160FE]" />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">Confirmar Nueva Contraseña</label>
            <input type="password" id="confirmPassword" name="confirmPassword" className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#F160FE]" />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="px-4 py-2 bg-[#F160FE] text-white rounded-md hover:bg-[#F160FE]/80 transition-colors">
              Cambiar Contraseña
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ConfigurationPage;