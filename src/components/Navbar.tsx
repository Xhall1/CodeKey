import { useState } from 'react';
import { Link } from 'react-router-dom'; 
import '../styles/Navbar.css';
import Logo from '../assets/images/codekey_unimayor.png';
import ProfilePicture from '../assets/images/ProfilePicture.jpg';
import ProfileMenu from './ProfileMenu';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="w-full bg-[rgba(82,82,82,0.05)] backdrop-blur-sm p-4 flex justify-between items-center fixed top-0 left-0 z-50">
      <div className="flex items-center space-x-4"> 
        <h1 className="text-white text-3xl font-bold">CODEKEY</h1>
        <img src={Logo} alt="Logo" className="w-12 h-auto" />
      </div>
      
      <div className="flex space-x-8"> 
        <Link to="/recursos" className="nav-link relative group">
          <span className="text-white transition-colors duration-300 group-hover:text-[#F160FE]">Recursos</span>
          <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#F160FE] transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></span>
        </Link>
        <Link to="/retos" className="nav-link relative group">
          <span className="text-white transition-colors duration-300 group-hover:text-[#F160FE]">Retos</span>
          <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#F160FE] transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></span>
        </Link>
        <Link to="/about" className="nav-link relative group">
          <span className="text-white transition-colors duration-300 group-hover:text-[#F160FE]">About</span>
          <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#F160FE] transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></span>
        </Link>
      </div>
      
      <div className="flex items-center space-x-4 relative">
        <button className="text-white">你 idioma</button>
        <img 
          src={ProfilePicture} 
          alt="Profile" 
          className="w-10 h-10 rounded-full cursor-pointer" 
          onClick={toggleMenu}
        />
        <ProfileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      </div>
    </nav>
  );
};

export default NavBar;