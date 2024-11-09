import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import FuturisticBackground from '../components/FuturisticBackground';
import { Trophy, Star, Zap, Medal } from 'lucide-react';

const rankingData = [
  { id: 1, name: "Ana García", avatar: "/placeholder.svg?height=50&width=50", level: 42, points: 15000 },
  { id: 2, name: "Carlos Rodríguez", avatar: "/placeholder.svg?height=50&width=50", level: 40, points: 14500 },
  { id: 3, name: "María López", avatar: "/placeholder.svg?height=50&width=50", level: 39, points: 14000 },
  { id: 4, name: "Juan Martínez", avatar: "/placeholder.svg?height=50&width=50", level: 37, points: 13500 },
  { id: 5, name: "Laura Sánchez", avatar: "/placeholder.svg?height=50&width=50", level: 36, points: 13000 },
  { id: 6, name: "Pedro Gómez", avatar: "/placeholder.svg?height=50&width=50", level: 35, points: 12500 },
  { id: 7, name: "Sofia Fernández", avatar: "/placeholder.svg?height=50&width=50", level: 34, points: 12000 },
  { id: 8, name: "Diego Torres", avatar: "/placeholder.svg?height=50&width=50", level: 33, points: 11500 },
  { id: 9, name: "Elena Ruiz", avatar: "/placeholder.svg?height=50&width=50", level: 32, points: 11000 },
  { id: 10, name: "Javier Moreno", avatar: "/placeholder.svg?height=50&width=50", level: 31, points: 10500 },
];

const RankingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'levels' | 'points'>('levels');

  const sortedRanking = [...rankingData].sort((a, b) => 
    activeTab === 'levels' ? b.level - a.level : b.points - a.points
  );

  const getMedal = (position: number) => {
    switch (position) {
      case 1: return <Trophy className="text-yellow-400" size={24} />;
      case 2: return <Medal className="text-gray-400" size={24} />;
      case 3: return <Medal className="text-amber-600" size={24} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col relative bg-[#0D0D0D]">
      <FuturisticBackground />
      <NavBar />
      <main className="flex-grow flex flex-col items-center justify-center px-4 pt-24 pb-16 relative z-10">
        <div className="w-full max-w-4xl bg-black/30 backdrop-blur-md rounded-2xl border border-[#F160FE]/20 shadow-[0_0_50px_rgba(241,96,254,0.3)] p-8">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">Ranking de CodeKey</h1>
          
          <div className="flex justify-center mb-6">
            <button
              className={`px-4 py-2 rounded-l-full ${activeTab === 'levels' ? 'bg-[#F160FE] text-black' : 'bg-gray-700 text-white'} transition-colors`}
              onClick={() => setActiveTab('levels')}
            >
              Niveles
            </button>
            <button
              className={`px-4 py-2 rounded-r-full ${activeTab === 'points' ? 'bg-[#F160FE] text-black' : 'bg-gray-700 text-white'} transition-colors`}
              onClick={() => setActiveTab('points')}
            >
              Puntos
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-[#F160FE] border-b border-[#F160FE]/20">
                  <th className="px-4 py-2 text-left">Posición</th>
                  <th className="px-4 py-2 text-left">Usuario</th>
                  <th className="px-4 py-2 text-center">Nivel</th>
                  <th className="px-4 py-2 text-center">Puntos</th>
                </tr>
              </thead>
              <AnimatePresence>
                <tbody>
                  {sortedRanking.map((user, index) => (
                    <motion.tr
                      key={user.id}
                      className="text-white border-b border-gray-700 hover:bg-[#F160FE]/10 transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          {getMedal(index + 1)}
                          <span className="ml-2">{index + 1}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          <img src={user.avatar} alt={`Avatar de ${user.name}`} className="w-10 h-10 rounded-full mr-3" />
                          <span>{user.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center">
                          <Star className="mr-1 text-yellow-400" size={16} />
                          <span>{user.level}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center">
                          <Zap className="mr-1 text-blue-400" size={16} />
                          <span>{user.points.toLocaleString()}</span>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </AnimatePresence>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RankingPage;