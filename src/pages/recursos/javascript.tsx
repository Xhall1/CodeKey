import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import NavBar from '../../components/NavBar'
import UnimayorLogo from '../../assets/images/codekey_unimayor.png'
import FuturisticBackground from '../../components/FuturisticBackground'
import Footer from '../../components/Footer'
import { LockIcon } from 'lucide-react'
import JavaScriptChallenges from '@/components/JavaScriptChallenges'

interface Level {
  id: number;
  active: boolean;
  route: string;
}

const LevelCircle: React.FC<{ level: Level }> = React.memo(({ level }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`relative w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold cursor-pointer transition-all duration-300 ease-in-out
        ${level.active 
          ? 'bg-[#F160FE] text-white hover:scale-110 shadow-[0_0_15px_rgba(241,96,254,0.5)]' 
          : 'bg-gray-300 text-gray-500'}
        ${level.active && isHovered ? 'animate-bounce' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {level.active ? (
        <a href={`/recursos/javascript/${level.route}`} className="w-full h-full flex items-center justify-center">
          {level.id}
          {isHovered && (
            <div className="absolute inset-0 rounded-full bg-[#F160FE] opacity-30 animate-pulse" />
          )}
        </a>
      ) : (
        <LockIcon className="w-8 h-8" />
      )}
    </div>
  )
})

LevelCircle.displayName = 'LevelCircle'

const LearningPath: React.FC = () => {
  const levels: Level[] = useMemo(() => [
    { id: 1, active: true, route: 'nivel-1' },
    { id: 2, active: false, route: 'nivel-2' },
    { id: 3, active: false, route: 'nivel-3' },
    { id: 4, active: false, route: 'nivel-4' },
    { id: 5, active: false, route: 'nivel-5' },
    { id: 6, active: false, route: 'nivel-6' },
    { id: 7, active: false, route: 'nivel-7' },
    { id: 8, active: false, route: 'nivel-8' },
  ], [])

  const currentLevel = useMemo(() => {
    return levels.findIndex(level => !level.active) || levels.length
  }, [levels])

  return (
    <div className="w-full max-w-4xl mx-auto p-6 flex flex-col items-center justify-center">
      <motion.a
        href={`/recursos/javascript/${levels[0].route}`}
        className="bg-[#F160FE] text-black px-8 py-3 rounded-full font-bold text-lg mb-16 hover:bg-[#F160FE]/90 transition-all duration-300 shadow-lg hover:shadow-[#F160FE]/50 no-underline"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {currentLevel === 1 ? 'Iniciar' : 'Continuar'}
      </motion.a>
      
      <div className="relative flex flex-row items-center justify-center flex-wrap gap-8">
        {levels.map((level) => (
          <LevelCircle key={level.id} level={level} />
        ))}
      </div>
    </div>
  )
}

const JavaScriptResourcesPage: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex flex-col relative bg-[#0D0D0D]">
      <FuturisticBackground />
      <NavBar />
      <main className="flex-grow flex flex-col items-center justify-center px-4 pt-24 pb-16 relative z-10">
        <div className="mb-8">
          <img 
            src={UnimayorLogo} 
            alt="UnimayorLogoHome"
            className="logoUnimayor w-32 h-auto"
          />
        </div>
        <h2 className="text-white text-4xl font-bold mb-8">RECURSOS</h2>
        
        <LearningPath />
        <JavaScriptChallenges />
      </main>
      <Footer />
    </div>
  )
}

export default JavaScriptResourcesPage