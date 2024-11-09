import React, { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import NavBar from '@/components/NavBar'
import UnimayorLogo from '@/assets/images/codekey_unimayor.png'
import FuturisticBackground from '@/components/FuturisticBackground'
import Footer from '@/components/Footer'
import { LockIcon, Code2Icon, TrophyIcon, BookOpenIcon, BrainIcon, RocketIcon, InfoIcon, Star, Clock } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Challenge {
  id: number;
  route: string;
  title: string;
  description: string;
  difficulty: 'Fácil' | 'Intermedio' | 'Difícil';
  estimatedTime: number; // in minutes
  points: number;
}

interface ChallengeCategory {
  name: string;
  description: string;
  icon: React.ElementType;
  challenges: Challenge[];
}

const GradientProgress: React.FC<{ value: number; className?: string }> = ({ value, className }) => (
  <div className={`relative h-8 bg-gray-700 rounded-full overflow-hidden shadow-inner ${className}`}>
    <motion.div 
      className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#F160FE] to-[#7B2FFE] rounded-full"
      initial={{ width: 0 }}
      animate={{ width: `${Math.min(value, 100)}%` }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    />
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
      <span className="text-white font-bold text-lg drop-shadow-lg">
        Progreso: {Math.min(value, 100)}%
      </span>
    </div>
  </div>
)

const ChallengeCircle: React.FC<{ 
  challenge: Challenge; 
  isUnlocked: boolean; 
  isCompleted: boolean;
  onInfoClick: () => void;
}> = React.memo(({ challenge, isUnlocked, isCompleted, onInfoClick }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div className="relative group" whileHover={{ scale: isUnlocked ? 1.1 : 1 }} whileTap={{ scale: isUnlocked ? 0.95 : 1 }}>
            <div className={`w-20 h-20 rounded-full flex items-center justify-center text-xl font-bold cursor-pointer transition-all duration-300
              ${isUnlocked ? 'bg-gradient-to-br from-[#F160FE] to-[#7B2FFE] text-white hover:shadow-lg hover:shadow-[#F160FE]/50' : 'bg-[#1A1A1A] text-gray-500'}`}>
              {isUnlocked ? (
                <Link to={`/retos/javascript/${challenge.route}`} className="w-full h-full flex items-center justify-center">
                  {isCompleted ? <TrophyIcon className="w-8 h-8 text-yellow-400" /> : <Code2Icon className="w-8 h-8" />}
                </Link>
              ) : (
                <LockIcon className="w-8 h-8" />
              )}
            </div>
            {isUnlocked && (
              <motion.button
                className="absolute -top-2 -right-2 bg-blue-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.preventDefault();
                  onInfoClick();
                }}
              >
                <InfoIcon className="w-4 h-4 text-white" />
              </motion.button>
            )}
          </motion.div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{challenge.title}</p>
          <p>Dificultad: {challenge.difficulty}</p>
          <p>Tiempo estimado: {challenge.estimatedTime} min</p>
          <p>Puntos: {challenge.points}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
})

ChallengeCircle.displayName = 'ChallengeCircle'

const ChallengeCategory: React.FC<{ 
  category: ChallengeCategory; 
  unlockedChallenges: string[]; 
  completedChallenges: string[];
  onInfoClick: (challenge: Challenge) => void;
}> = ({ category, unlockedChallenges, completedChallenges, onInfoClick }) => {
  const Icon = category.icon;

  return (
    <motion.div 
      className="mb-16 bg-[#1A1A1A] rounded-lg p-6 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-4">
        <Icon className="w-8 h-8 text-[#F160FE] mr-3" />
        <h3 className="text-white text-2xl font-bold">{category.name}</h3>
      </div>
      <p className="text-gray-400 mb-6">{category.description}</p>
      <div className="flex flex-wrap gap-8 justify-center">
        {category.challenges.map((challenge) => (
          <ChallengeCircle 
            key={challenge.id} 
            challenge={challenge} 
            isUnlocked={unlockedChallenges.includes(challenge.route)}
            isCompleted={completedChallenges.includes(challenge.route)}
            onInfoClick={() => onInfoClick(challenge)}
          />
        ))}
      </div>
    </motion.div>
  )
}

const ChallengeInfo: React.FC<{ challenge: Challenge | null; onClose: () => void }> = ({ challenge, onClose }) => {
  if (!challenge) return null;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div className="bg-[#1A1A1A] p-6 rounded-lg max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <h4 className="text-2xl font-bold text-white mb-2">{challenge.title}</h4>
        <p className="text-gray-400 mb-4">{challenge.description}</p>
        <div className="flex items-center justify-between mb-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            challenge.difficulty === 'Fácil' ? 'bg-green-500 text-green-100' : 
            challenge.difficulty === 'Intermedio' ? 'bg-yellow-500 text-yellow-100' : 
            'bg-red-500 text-red-100'
          }`}>
            {challenge.difficulty}
          </span>
          <div className="flex items-center text-gray-300">
            <Clock className="w-4 h-4 mr-1" />
            <span>{challenge.estimatedTime} min</span>
          </div>
          <div className="flex items-center text-yellow-400">
            <Star className="w-4 h-4 mr-1" />
            <span>{challenge.points} pts</span>
          </div>
        </div>
        <button onClick={onClose} className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300">
          Cerrar
        </button>
      </div>
    </motion.div>
  );
};

export default function ChallengesPath() {
  const [unlockedChallenges, setUnlockedChallenges] = useState<string[]>(['basico-1'])
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([])
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null)
  const [totalPoints, setTotalPoints] = useState(0)

  useEffect(() => {
    const storedUnlockedChallenges = localStorage.getItem('unlockedChallenges')
    const storedCompletedChallenges = localStorage.getItem('completedChallenges')
    const storedTotalPoints = localStorage.getItem('totalPoints')
    if (storedUnlockedChallenges) setUnlockedChallenges(JSON.parse(storedUnlockedChallenges))
    if (storedCompletedChallenges) setCompletedChallenges(JSON.parse(storedCompletedChallenges))
    if (storedTotalPoints) setTotalPoints(JSON.parse(storedTotalPoints))
  }, [])

  const challengeCategories: ChallengeCategory[] = useMemo(() => [
    {
      name: "Básico",
      description: "Desafíos fundamentales para fortalecer tus habilidades de programación en JavaScript.",
      icon: BookOpenIcon,
      challenges: [
        { id: 1, route: 'basico-1', title: 'Fibonacci', description: "Implementa la secuencia de Fibonacci.", difficulty: 'Fácil', estimatedTime: 15, points: 50 },
        { id: 2, route: 'basico-2', title: 'Palíndromo', description: "Verifica si una cadena es un palíndromo.", difficulty: 'Fácil', estimatedTime: 20, points: 75 },
        { id: 3, route: 'basico-3', title: 'FizzBuzz', description: "Implementa el clásico problema FizzBuzz.", difficulty: 'Fácil', estimatedTime: 25, points: 100 },
      ]
    },
    {
      name: "Intermedio",
      description: "Retos más complejos para mejorar tu lógica y habilidades de resolución de problemas.",
      icon: BrainIcon,
      challenges: [
        { id: 1, route: 'intermedio-1', title: 'Búsqueda Binaria', description: "Implementa el algoritmo de búsqueda binaria.", difficulty: 'Intermedio', estimatedTime: 30, points: 150 },
        { id: 2, route: 'intermedio-2', title: 'Ordenamiento', description: "Implementa un algoritmo de ordenamiento eficiente.", difficulty: 'Intermedio', estimatedTime: 35, points: 200 },
        { id: 3, route: 'intermedio-3', title: 'Pila y Cola', description: "Implementa las estructuras de datos Pila y Cola.", difficulty: 'Intermedio', estimatedTime: 40, points: 250 },
      ]
    },
    {
      name: "Avanzado",
      description: "Desafíos de alto nivel para dominar conceptos avanzados de algoritmos y estructuras de datos.",
      icon: RocketIcon,
      challenges: [
        { id: 1, route: 'avanzado-1', title: 'Árbol Binario', description: "Implementa y trabaja con un Árbol Binario de Búsqueda.", difficulty: 'Difícil', estimatedTime: 45, points: 300 },
        { id: 2, route: 'avanzado-2', title: 'Grafos', description: "Resuelve problemas utilizando algoritmos de grafos.", difficulty: 'Difícil', estimatedTime: 50, points: 350 },
        { id: 3, route: 'avanzado-3', title: 'Programación Dinámica', description: "Resuelve problemas complejos utilizando programación dinámica.", difficulty: 'Difícil', estimatedTime: 60, points: 400 },
      ]
    }
  ], [])

  const totalChallenges = 9; 

  const currentCategory = useMemo(() => challengeCategories.find(category => 
    category.challenges.some(challenge => !completedChallenges.includes(challenge.route))
  ) || challengeCategories[challengeCategories.length - 1], [challengeCategories, completedChallenges])

  const currentChallenge = useMemo(() => {
    const uncompletedChallenges = currentCategory.challenges.filter(challenge => !completedChallenges.includes(challenge.route))
    return uncompletedChallenges[0] || currentCategory.challenges[currentCategory.challenges.length - 1]
  }, [currentCategory, completedChallenges])

  const progress = useMemo(() => {
    return Math.round((completedChallenges.length / totalChallenges) * 100)
  }, [completedChallenges])

  return (
    <div className="min-h-screen w-full flex flex-col relative bg-[#0D0D0D]">
      <FuturisticBackground />
      <NavBar />
      <main className="flex-grow flex flex-col items-center justify-center px-4 pt-24 pb-16 relative z-10">
        <motion.div className="mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <img src={UnimayorLogo} alt="UnimayorLogoHome" className="w-32 h-auto filter drop-shadow-[0_0_8px_rgba(241,96,254,0.8)]" />
        </motion.div>
        <motion.h2 className="text-white text-4xl font-bold mb-8 text-center" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          RETOS ALGORÍTMICOS DE JAVASCRIPT
        </motion.h2>
        
        <div className="w-full max-w-4xl mx-auto p-6 flex flex-col items-center justify-center">
          <motion.div 
            className="w-full mb-4"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <GradientProgress value={progress} />
          </motion.div>
          <div className="flex justify-between w-full mb-8">
            <p className="text-white">Retos completados: {completedChallenges.length} de {totalChallenges}</p>
            <p className="text-white flex items-center"><Star className="w-4 h-4 mr-1 text-yellow-400" /> {totalPoints} puntos</p>
          </div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to={`/retos/javascript/${currentChallenge.route}`} className="bg-gradient-to-r from-[#F160FE] to-[#7B2FFE] text-white px-8 py-3 rounded-full font-bold text-lg mb-16 hover:from-[#7B2FFE] hover:to-[#F160FE] transition-all duration-300 shadow-lg hover:shadow-[#F160FE]/50 no-underline inline-flex items-center">
              {completedChallenges.length === 0 ? (
                <>
                  <RocketIcon className="mr-2" />
                  Iniciar Retos
                </>
              ) : (
                <>
                  <Code2Icon className="mr-2" />
                  Continuar Retos
                </>
              )}
            </Link>
          </motion.div>
          
          <div className="w-full">
            {challengeCategories.map((category, index) => (
              <ChallengeCategory 
                key={index} 
                category={category} 
                unlockedChallenges={unlockedChallenges}
                completedChallenges={completedChallenges}
                onInfoClick={setSelectedChallenge}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <AnimatePresence>
        {selectedChallenge && (
          <ChallengeInfo 
            challenge={selectedChallenge} 
            onClose={() => setSelectedChallenge(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  )
}