import { useState } from 'react';
import { Link } from 'react-router-dom'; 
import '../styles/Navbar.css';
import Logo from '../assets/images/codekey_unimayor.png';
import ProfilePicture from '../assets/images/ProfilePicture.jpg';
import ProfileMenu from './ProfileMenu';
import { Menu, X } from 'lucide-react';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  return (
    <nav className="w-full bg-[rgba(82,82,82,0.05)] backdrop-blur-sm p-4 fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4"> 
          <h1 className="text-white text-2xl md:text-3xl font-bold">CODEKEY</h1>
          <img src={Logo} alt="Logo" className="w-8 h-auto md:w-12" />
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8"> 
          <NavLink to="/recursos">Recursos</NavLink>
          <NavLink to="/retos">Retos</NavLink>
          <NavLink to="/ranking">Ranking</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Profile and Language */}
        <div className="hidden md:flex items-center space-x-4 relative">
          <button className="text-white">你 idioma</button>
          <img 
            src={ProfilePicture} 
            alt="Profile" 
            className="w-10 h-10 rounded-full cursor-pointer" 
            onClick={toggleProfileMenu}
          />
          <ProfileMenu isOpen={profileMenuOpen} onClose={() => setProfileMenuOpen(false)} />
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4">
          <NavLink to="/recursos" mobile>Recursos</NavLink>
          <NavLink to="/retos" mobile>Retos</NavLink>
          <NavLink to="/ranking" mobile>Ranking</NavLink>
          <NavLink to="/about" mobile>About</NavLink>
          <div className="mt-4 flex items-center justify-between">
            <button className="text-white">你 idioma</button>
            <img 
              src={ProfilePicture} 
              alt="Profile" 
              className="w-10 h-10 rounded-full cursor-pointer" 
              onClick={toggleProfileMenu}
            />
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ to, children, mobile = false }) => (
  <Link 
    to={to} 
    className={`nav-link relative group ${mobile ? 'block py-2' : ''}`}
    onClick={() => mobile && setMenuOpen(false)}
  >
    <span className="text-white transition-colors duration-300 group-hover:text-[#F160FE]">
      {children}
    </span>
    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#F160FE] transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></span>
  </Link>
);

export default NavBar;