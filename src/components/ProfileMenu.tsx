import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const ProfileMenu = ({ isOpen, onClose }) => {
  return (
    <div
      className={`absolute right-0 mt-2 w-48 bg-black rounded-md shadow-lg transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      style={{ top: '100%' }}
    >
      <div className="flex flex-col">
        <Link to="/profile" className="text-white px-4 py-2 hover:bg-purple-600 transition duration-200" onClick={onClose}>
          Mi Perfil
        </Link>
        <Link to="/settings" className="text-white px-4 py-2 hover:bg-purple-600 transition duration-200" onClick={onClose}>
          Configuración
        </Link>
        <Link to="/Login" className="text-white px-4 py-2 hover:bg-purple-600 transition duration-200" onClick={onClose}>
          Cerrar Sesión
        </Link>
      </div>
    </div>
  );
};

export default ProfileMenu;
