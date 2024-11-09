import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface ProfileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 mt-2 w-48 bg-black/80 backdrop-blur-md rounded-md shadow-lg border border-[#F160FE]/20"
          style={{ top: '100%' }}
        >
          <div className="flex flex-col p-2 space-y-2">
            <Link 
              to="/perfil" 
              className="text-white px-4 py-2 rounded-md hover:bg-[#F160FE]/20 transition duration-200 flex items-center"
              onClick={onClose}
            >
              <span className="mr-2">👤</span> Mi Perfil
            </Link>
            <Link 
              to="/configuracion" 
              className="text-white px-4 py-2 rounded-md hover:bg-[#F160FE]/20 transition duration-200 flex items-center"
              onClick={onClose}
            >
              <span className="mr-2">⚙️</span> Configuración
            </Link>
            <Link 
              to="/login" 
              className="text-white px-4 py-2 rounded-md hover:bg-[#F160FE]/20 transition duration-200 flex items-center"
              onClick={onClose}
            >
              <span className="mr-2">🚪</span> Cerrar Sesión
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProfileMenu;