import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import NavBar from '@/components/NavBar'
import UnimayorLogo from '@/assets/images/codekey_unimayor.png'
import FuturisticBackground from '@/components/FuturisticBackground'
import Footer from '@/components/Footer'
import { LockIcon, BookOpen, Calculator, List, Zap, Globe, Cpu, Server } from 'lucide-react'

interface Level {
  id: number;
  active: boolean;
  route: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const LevelCircle: React.FC<{ level: Level; onClick: () => void }> = React.memo(({ level, onClick }) => {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = level.icon

  return (
    <motion.div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className={`w-24 h-24 rounded-full flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ease-in-out
          ${level.active 
            ? 'bg-gradient-to-br from-[#F160FE] to-[#7B2FFE] text-white hover:shadow-lg hover:shadow-[#F160FE]/50' 
            : 'bg-gray-800 text-gray-500'}
        `}
        whileHover={{ scale: 1.1 }}
        onClick={onClick}
      >
        {level.active ? (
          <>
            <Icon className="w-8 h-8 mb-2" />
            <span className="text-xs font-bold text-center">{level.id}</span>
          </>
        ) : (
          <LockIcon className="w-8 h-8" />
        )}
      </motion.div>
      {isHovered && level.active && (
        <motion.div
          className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white p-2 rounded shadow-md z-50 w-48"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-xs">{level.title}</p>
        </motion.div>
      )}
    </motion.div>
  )
})

LevelCircle.displayName = 'LevelCircle'

const LevelContent: React.FC<{ level: Level }> = ({ level }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 rounded-lg p-6 shadow-lg mb-8"
    >
      <div className="flex items-center mb-4">
        <level.icon className="w-8 h-8 text-[#F160FE] mr-3" />
        <h3 className="text-white text-2xl font-bold">{level.title}</h3>
      </div>
      <p className="text-gray-300 mb-6">{level.description}</p>
      <Link
        to={`/recursos/javascript/${level.route}`}
        className="bg-gradient-to-r from-[#F160FE] to-[#7B2FFE] text-white px-6 py-2 rounded-full font-bold text-lg hover:from-[#7B2FFE] hover:to-[#F160FE] transition-all duration-300 shadow-lg hover:shadow-[#F160FE]/50 no-underline inline-flex items-center"
      >
        Explorar Nivel {level.id}
        <Zap className="ml-2 w-5 h-5" />
      </Link>
    </motion.div>
  )
}

const LearningPath: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null)

  const levels: Level[] = useMemo(() => [
    { id: 1, active: true, route: 'nivel-1', title: "Fundamentos de JavaScript", description: "Aprende los conceptos básicos de JavaScript, incluyendo variables, tipos de datos y estructuras de control.", icon: BookOpen },
    { id: 2, active: false, route: 'nivel-2', title: "Operaciones Básicas", description: "Domina las operaciones aritméticas, lógicas y de comparación en JavaScript.", icon: Calculator },
    { id: 3, active: false, route: 'nivel-3', title: "Arrays", description: "Explora la creación, manipulación y métodos de arrays en JavaScript.", icon: List },
    { id: 4, active: false, route: 'nivel-4', title: "Funciones", description: "Aprende a crear y utilizar funciones en JavaScript.", icon: Zap },
    { id: 5, active: false, route: 'nivel-5', title: "Objetos", description: "Descubre cómo trabajar con objetos y sus propiedades en JavaScript.", icon: Globe },
    { id: 6, active: false, route: 'nivel-6', title: "DOM y Eventos", description: "Manipula el DOM y maneja eventos en el navegador con JavaScript.", icon: Cpu },
    { id: 7, active: false, route: 'nivel-7', title: "Asincronía", description: "Explora callbacks, promesas y async/await para manejar operaciones asíncronas.", icon: Server },
    { id: 8, active: false, route: 'nivel-8', title: "ES6+ y Módulos", description: "Conoce las características modernas de JavaScript y aprende a trabajar con módulos.", icon: Zap },
  ], [])

  const currentLevel = useMemo(() => {
    return levels.findIndex(level => !level.active) || levels.length
  }, [levels])

  const progress = useMemo(() => {
    return Math.round((currentLevel / levels.length) * 100)
  }, [currentLevel, levels])

  return (
    <div className="w-full max-w-4xl mx-auto p-6 flex flex-col items-center justify-center">
      <motion.div 
        className="w-full mb-12"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="relative h-8 bg-gray-700 rounded-full overflow-hidden shadow-inner">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#F160FE] to-[#7B2FFE] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <span className="text-white font-bold text-lg drop-shadow-lg">
              Progreso: {progress}%
            </span>
          </div>
        </div>
        <div className="mt-2 text-center text-white text-sm">
          Nivel actual: {currentLevel} de {levels.length}
        </div>
      </motion.div>

      <motion.div 
        className="flex flex-wrap justify-center gap-8 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {levels.map((level) => (
          <LevelCircle 
            key={level.id} 
            level={level} 
            onClick={() => level.active && setSelectedLevel(level.id)}
          />
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        {selectedLevel ? (
          <LevelContent key={selectedLevel} level={levels[selectedLevel - 1]} />
        ) : (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h3 className="text-white text-2xl font-bold mb-4">Bienvenido a tu Ruta de Aprendizaje de JavaScript</h3>
            <p className="text-gray-300 mb-6">
              Selecciona un nivel para ver más detalles y comenzar tu viaje de aprendizaje.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={`/recursos/javascript/${levels[0].route}`}
                className="bg-gradient-to-r from-[#F160FE] to-[#7B2FFE] text-white px-8 py-3 rounded-full font-bold text-lg hover:from-[#7B2FFE] hover:to-[#F160FE] transition-all duration-300 shadow-lg hover:shadow-[#F160FE]/50 no-underline inline-flex items-center"
              >
                {currentLevel === 1 ? 'Comenzar Aprendizaje' : 'Continuar Aprendizaje'}
                <Zap className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const JavaScriptResourcesPage: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex flex-col relative bg-[#0D0D0D]">
      <FuturisticBackground />
      <NavBar />
      <main className="flex-grow flex flex-col items-center justify-start px-4 pt-24 pb-16 relative z-10">
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img 
            src={UnimayorLogo} 
            alt="UnimayorLogoHome"
            className="w-32 h-auto filter drop-shadow-[0_0_8px_rgba(241,96,254,0.8)]"
          />
        </motion.div>
        <motion.h2
          className="text-white text-4xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          RECURSOS DE JAVASCRIPT
        </motion.h2>
        
        <LearningPath />
      </main>
      <Footer />
    </div>
  )
}

export default JavaScriptResourcesPage