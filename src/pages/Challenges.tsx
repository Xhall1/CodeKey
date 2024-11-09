import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import FuturisticBackground from '../components/FuturisticBackground';
import { SiJavascript, SiPython, SiTypescript } from 'react-icons/si';
import { Code2Icon, ChevronRight } from 'lucide-react';
import UnimayorLogo from '../assets/images/codekey_unimayor.png';
import ResourceInfoCard from '../components/ResourceInfoCard';

interface ChallengeCardProps {
  language: string;
  Icon: React.ElementType;
  description: string;
  link: string;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ language, Icon, description, link }) => (
  <motion.div
    whileHover={{ 
      y: -5,
      transition: { duration: 0.2 }
    }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-[#0D0D0D] rounded-xl p-6 flex flex-col items-center justify-between w-full max-w-[300px] transition-all duration-200 shadow-[0_8px_15px_-3px_rgba(241,96,254,0.5)] hover:shadow-[0_12px_20px_-3px_rgba(241,96,254,0.7)] group"
  >
    <Link to={link} className="w-full h-full flex flex-col items-center justify-between no-underline">
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
        className="text-[#F160FE] mb-4 group-hover:text-white transition-colors duration-200"
      >
        <Icon className="text-6xl" />
      </motion.div>
      <h3 className="text-white text-xl font-bold mb-2 group-hover:text-[#F160FE] transition-colors duration-200">{language}</h3>
      <p className="text-gray-300 text-center text-sm mb-4">{description}</p>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-[#F160FE]/10 text-[#F160FE] px-4 py-2 rounded-full text-sm font-semibold group-hover:bg-[#F160FE] group-hover:text-black transition-all duration-200 flex items-center"
      >
        Explorar Retos
        <ChevronRight className="ml-2 w-4 h-4" />
      </motion.div>
    </Link>
  </motion.div>
);

const JavaScriptChallengesPreview: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    whileHover={{ scale: 1.02 }}
    className="w-full max-w-4xl bg-gradient-to-br from-[#0D0D0D] to-[#1A1A1A] backdrop-blur-md rounded-2xl border border-[#F160FE]/20 p-10 text-center relative overflow-hidden group"
  >
    <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
      <div className="md:w-1/2 text-left mb-6 md:mb-0">
        <motion.h3 
          initial={{ y: 0 }}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="text-white text-3xl font-bold mb-4"
        >
          Retos de JavaScript
        </motion.h3>
        <motion.p 
          initial={{ y: 0 }}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="text-gray-300 mb-6 text-lg"
        >
          Pon a prueba tus habilidades de JavaScript con nuestros desafiantes retos algorítmicos.
        </motion.p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/retos/retosJavascript"
            className="bg-[#F160FE] text-black px-6 py-3 rounded-full font-bold text-lg hover:bg-[#F160FE]/90 transition-all duration-200 shadow-lg hover:shadow-[#F160FE]/50 no-underline inline-flex items-center"
          >
            <span className="mr-2">Ir a Retos de JavaScript</span>
            <ChevronRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
      <div className="md:w-1/2 flex justify-center items-center">
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#F160FE] to-[#7B2FFE] rounded-full opacity-20 blur-xl"></div>
          <Code2Icon size={120} className="text-[#F160FE] relative z-10" />
        </motion.div>
      </div>
    </div>
  </motion.div>
);

const Challenges: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#0D0D0D] overflow-x-hidden">
      <FuturisticBackground />
      <NavBar />
      <main className="flex-grow flex flex-col items-center justify-center px-4 pt-32 pb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <img 
            src={UnimayorLogo} 
            alt="UnimayorLogoHome"
            className="w-40 h-auto filter drop-shadow-[0_0_15px_rgba(241,96,254,0.8)]"
          />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-white text-5xl font-bold mb-12 text-center"
        >
          RETOS
        </motion.h2>
        <motion.div 
          className="flex flex-wrap justify-center gap-8 mb-20 w-full max-w-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <ChallengeCard 
            language="JavaScript" 
            Icon={SiJavascript}
            description="Desafíos de algoritmos y estructuras de datos en JavaScript."
            link="/retos/retosJavascript"
          />
          <ChallengeCard 
            language="Python" 
            Icon={SiPython}
            description="Retos de programación y resolución de problemas en Python."
            link="/retos/python"
          />
          <ChallengeCard 
            language="TypeScript" 
            Icon={SiTypescript}
            description="Ejercicios avanzados de TypeScript para mejorar tus habilidades."
            link="/retos/typescript"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="w-full max-w-4xl mb-16"
        >
          <JavaScriptChallengesPreview />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="w-full max-w-6xl mb-16"
        >
          <ResourceInfoCard 
            title="RECURSOS DE JAVASCRIPT"
            description="Aprende los fundamentos de JavaScript"
            buttonText="Explorar"
            link="/recursos"
          />
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Challenges;