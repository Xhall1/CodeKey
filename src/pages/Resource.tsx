import React from 'react';
import NavBar from '../components/Navbar';
import '../styles/Resource.css';
import ResourceCard from '../components/ResourceCard';
import LearnJS from '../components/LearnJS';
import UnimayorLogo from '../assets/images/codekey_unimayor.png';
import FuturisticBackground from '../components/FuturisticBackground';
import { SiJavascript, SiPython, SiTypescript } from 'react-icons/si';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex flex-col relative bg-[#0D0D0D]">
      <FuturisticBackground />
      <NavBar />
      <main className="flex-grow flex flex-col items-center justify-center px-4 pt-24 relative z-10">
        <div className="mb-8">
          <img 
            src={UnimayorLogo} 
            alt="UnimayorLogoHome"
            className="logoUnimayor w-32 h-auto"
          />
        </div>
        <h2 className="text-white text-4xl font-bold mb-8">RECURSOS</h2>
        <div className="flex flex-wrap justify-center gap-6 mb-16 w-full max-w-6xl">
          <ResourceCard 
            language="JavaScript" 
            Icon={SiJavascript}
            description="Lenguaje versátil para desarrollo web front-end y back-end."
            link="/recursos/javascript"
          />
          <ResourceCard 
            language="Python" 
            Icon={SiPython}
            description="Lenguaje de alto nivel, ideal para principiantes y expertos."
            link="/recursos/python"
          />
          <ResourceCard 
            language="TypeScript" 
            Icon={SiTypescript}
            description="Superset de JavaScript con tipado estático opcional."
            link="/recursos/typescript"
          />
        </div>
        <div className="w-full max-w-4xl">
          <LearnJS />
        </div>
      </main>
    </div>
  );
};

export default HomePage;