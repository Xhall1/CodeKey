import React, { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import NavBar from '@/components/NavBar'
import UnimayorLogo from '../assets/images/codekey_unimayor.png'
import FuturisticBackground from '@/components/FuturisticBackground'
import Footer from '@/components/Footer'
import { LockIcon, Code2Icon } from 'lucide-react'

interface Challenge {
  id: number;
  route: string;
  title: string;
}

interface ChallengeCategory {
  name: string;
  challenges: Challenge[];
}

const ChallengeCircle: React.FC<{ challenge: Challenge; isUnlocked: boolean; isCompleted: boolean }> = React.memo(({ challenge, isUnlocked, isCompleted }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`relative w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold cursor-pointer transition-all duration-300 ease-in-out
        ${isUnlocked 
          ? 'bg-[#F160FE] text-white hover:scale-110 shadow-[0_0_15px_rgba(241,96,254,0.5)]' 
          : 'bg-gray-300 text-gray-500'}
        ${isUnlocked && isHovered ? 'animate-bounce' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isUnlocked ? (
        <Link to={`/retos/javascript/${challenge.route}`} className="w-full h-full flex items-center justify-center">
          {isCompleted ? (
            <Code2Icon className="w-6 h-6 text-green-400" />
          ) : (
            <Code2Icon className="w-6 h-6" />
          )}
          {isHovered && (
            <div className="absolute inset-0 rounded-full bg-[#F160FE] opacity-30 animate-pulse" />
          )}
        </Link>
      ) : (
        <LockIcon className="w-6 h-6" />
      )}
      <span className="absolute -bottom-8 text-xs text-white font-normal whitespace-nowrap max-w-[120px] text-center">
        {challenge.title}
      </span>
    </div>
  )
})

ChallengeCircle.displayName = 'ChallengeCircle'

const ChallengeCategory: React.FC<{ category: ChallengeCategory; unlockedChallenges: string[]; completedChallenges: string[] }> = ({ category, unlockedChallenges, completedChallenges }) => {
  return (
    <div className="mb-12">
      <h3 className="text-white text-2xl font-bold mb-4">{category.name}</h3>
      <div className="flex flex-wrap gap-8 justify-center">
        {category.challenges.map((challenge) => (
          <ChallengeCircle 
            key={challenge.id} 
            challenge={challenge} 
            isUnlocked={unlockedChallenges.includes(challenge.route)}
            isCompleted={completedChallenges.includes(challenge.route)}
          />
        ))}
      </div>
    </div>
  )
}

const ChallengesPath: React.FC = () => {
  const [unlockedChallenges, setUnlockedChallenges] = useState<string[]>(['basico-1'])
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([])

  useEffect(() => {
    const storedUnlockedChallenges = localStorage.getItem('unlockedChallenges')
    const storedCompletedChallenges = localStorage.getItem('completedChallenges')
    if (storedUnlockedChallenges) {
      setUnlockedChallenges(JSON.parse(storedUnlockedChallenges))
    }
    if (storedCompletedChallenges) {
      setCompletedChallenges(JSON.parse(storedCompletedChallenges))
    }
  }, [])

  const challengeCategories: ChallengeCategory[] = useMemo(() => [
    {
      name: "Básico",
      challenges: [
        { id: 1, route: 'basico-1', title: 'Fibonacci' },
        { id: 2, route: 'basico-2', title: 'Palíndromo' },
        { id: 3, route: 'basico-3', title: 'FizzBuzz' },
      ]
    },
    {
      name: "Intermedio",
      challenges: [
        { id: 1, route: 'intermedio-1', title: 'Búsqueda Binaria' },
        { id: 2, route: 'intermedio-2', title: 'Ordenamiento' },
        { id: 3, route: 'intermedio-3', title: 'Pila y Cola' },
      ]
    },
    {
      name: "Avanzado",
      challenges: [
        { id: 1, route: 'avanzado-1', title: 'Árbol Binario' },
        { id: 2, route: 'avanzado-2', title: 'Grafos' },
        { id: 3, route: 'avanzado-3', title: 'Programación Dinámica' },
      ]
    }
  ], [])

  const currentCategory = useMemo(() => {
    return challengeCategories.find(category => 
      category.challenges.some(challenge => !completedChallenges.includes(challenge.route))
    ) || challengeCategories[challengeCategories.length - 1]
  }, [challengeCategories, completedChallenges])

  const currentChallenge = useMemo(() => {
    const uncompletedChallenges = currentCategory.challenges.filter(challenge => !completedChallenges.includes(challenge.route))
    return uncompletedChallenges[0] || currentCategory.challenges[currentCategory.challenges.length - 1]
  }, [currentCategory, completedChallenges])

  return (
    <div className="min-h-screen w-full flex flex-col relative bg-[#0D0D0D]">
      <FuturisticBackground />
      <NavBar />
      <main className="flex-grow flex flex-col items-center justify-center px-4 pt-24 pb-16 relative z-10">
        <div className="mb-8">
          <img 
            src={UnimayorLogo} 
            alt="UnimayorLogoHome"
            className="w-32 h-auto filter drop-shadow-[0_0_8px_rgba(241,96,254,0.8)]"
          />
        </div>
        <h2 className="text-white text-4xl font-bold mb-8">RETOS ALGORÍTMICOS</h2>
        
        <div className="w-full max-w-4xl mx-auto p-6 flex flex-col items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to={`/retos/javascript/${currentChallenge.route}`}
              className="bg-[#F160FE] text-black px-8 py-3 rounded-full font-bold text-lg mb-16 hover:bg-[#F160FE]/90 transition-all duration-300 shadow-lg hover:shadow-[#F160FE]/50 no-underline"
            >
              {completedChallenges.length === 0 ? 'Iniciar Retos' : 'Continuar Retos'}
            </Link>
          </motion.div>
          
          <div className="w-full">
            {challengeCategories.map((category, index) => (
              <ChallengeCategory 
                key={index} 
                category={category} 
                unlockedChallenges={unlockedChallenges}
                completedChallenges={completedChallenges}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ChallengesPath