import React from 'react';
import { motion } from 'framer-motion';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import FuturisticBackground from '../components/FuturisticBackground';
import { Book, Trophy, Mail } from 'lucide-react';
import ProfilePicture from '../assets/images/ProfilePicture.jpg';

const ProfilePage: React.FC = () => {
  // Mock data - replace with actual user data and progress
  const user = {
    name: "David León",
    email: "esenoesmio@unimayor.edu.co",
    resourcesProgress: 65,
    challengesProgress: 40
  };

  const ProgressBar: React.FC<{ progress: number, title: string, icon: React.ReactNode }> = ({ progress, title, icon }) => (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        {icon}
        <h3 className="text-white text-lg font-semibold ml-2">{title}</h3>
      </div>
      <div className="bg-gray-700 rounded-full h-4 w-full overflow-hidden">
        <motion.div 
          className="bg-[#F160FE] h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      <p className="text-white text-right mt-1">{progress}%</p>
    </div>
  );

  return (
    <div className="min-h-screen w-full flex flex-col relative bg-[#0D0D0D]">
      <FuturisticBackground />
      <NavBar />
      <main className="flex-grow flex flex-col items-center justify-center px-4 pt-24 pb-16 relative z-10">
        <div className="w-full max-w-4xl bg-black/30 backdrop-blur-md rounded-2xl border border-[#F160FE]/20 shadow-[0_0_50px_rgba(241,96,254,0.3)] p-8">
          <div className="flex flex-col md:flex-row items-center mb-8">
            <motion.div 
              className="w-40 h-40 rounded-full overflow-hidden border-4 border-[#F160FE] shadow-[0_0_20px_rgba(241,96,254,0.5)] mb-4 md:mb-0 md:mr-8"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img src={ProfilePicture} alt={`Foto de perfil de ${user.name}`} className="w-full h-full object-cover" />
            </motion.div>
            <div>
              <motion.h1 
                className="text-3xl font-bold text-white mb-2"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {user.name}
              </motion.h1>
              <motion.div 
                className="flex items-center text-gray-300 mb-4"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Mail size={18} className="mr-2" />
                {user.email}
              </motion.div>
            </div>
          </div>

          <motion.div 
            className="bg-black/50 rounded-xl p-6 mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-4">Progreso</h2>
            <ProgressBar progress={user.resourcesProgress} title="Recursos" icon={<Book size={24} className="text-[#F160FE]" />} />
            <ProgressBar progress={user.challengesProgress} title="Retos" icon={<Trophy size={24} className="text-[#F160FE]" />} />
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="bg-black/50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Últimos Recursos Completados</h3>
              <ul className="space-y-2">
                <li className="text-gray-300">Variables y Tipos de Datos</li>
                <li className="text-gray-300">Estructuras de Control</li>
                <li className="text-gray-300">Funciones en JavaScript</li>
              </ul>
            </div>
            <div className="bg-black/50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Últimos Retos Superados</h3>
              <ul className="space-y-2">
                <li className="text-gray-300">FizzBuzz</li>
                <li className="text-gray-300">Palíndromo</li>
                <li className="text-gray-300">Fibonacci</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;