import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import NavBar from '../../../components/NavBar'
import UnimayorLogo from '../../../assets/images/codekey_unimayor.png'
import FuturisticBackground from '../../../components/FuturisticBackground'
import Footer from '../../../components/Footer'
import { PlayIcon, RefreshCwIcon, XIcon } from 'lucide-react'
import confetti from 'canvas-confetti'

const FizzBuzzChallenge: React.FC = () => {
  const [code, setCode] = useState('')
  const [output, setOutput] = useState('')
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const unlockedChallenges = JSON.parse(localStorage.getItem('unlockedChallenges') || '[]')
    if (!unlockedChallenges.includes('basico-3')) {
      navigate('/retos/javascript/basico-2')
    }
  }, [navigate])

  const runCode = () => {
    try {
      const userFunction = new Function('n', code + '\nreturn fizzBuzz(n);')
      const result = userFunction(15)
      const expectedOutput = [
        1, 2, 'Fizz', 4, 'Buzz', 'Fizz', 7, 8, 'Fizz', 'Buzz',
        11, 'Fizz', 13, 14, 'FizzBuzz'
      ]
      
      setOutput(JSON.stringify(result))
      const correct = JSON.stringify(result) === JSON.stringify(expectedOutput)
      setIsCorrect(correct)

      if (correct) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        })

        const completedChallenges = JSON.parse(localStorage.getItem('completedChallenges') || '[]')
        localStorage.setItem('completedChallenges', JSON.stringify([...completedChallenges, 'basico-3']))
        
        // Unlock the first intermediate challenge
        const unlockedChallenges = JSON.parse(localStorage.getItem('unlockedChallenges') || '[]')
        if (!unlockedChallenges.includes('intermedio-1')) {
          localStorage.setItem('unlockedChallenges', JSON.stringify([...unlockedChallenges, 'intermedio-1']))
        }
        
        setTimeout(() => {
          setShowModal(true)
        }, 1500)
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`)
      setIsCorrect(false)
    }
  }

  const closeModal = () => {
    setShowModal(false)
    navigate('/retos')
  }

  return (
    <div className="min-h-screen w-full flex flex-col relative bg-[#0D0D0D]">
      <FuturisticBackground />
      <NavBar />
      <main className="flex-grow flex flex-col items-center justify-center px-4 pt-24 pb-16 relative z-10">
        <div className="mb-8">
          <img 
            src={UnimayorLogo} 
            alt="UnimayorLogo"
            className="w-32 h-auto filter drop-shadow-[0_0_8px_rgba(241,96,254,0.8)]"
          />
        </div>
        <h1 className="text-white text-4xl font-bold mb-8 text-center">
          Reto: FizzBuzz
        </h1>
        
        <div className="w-full max-w-4xl mx-auto p-8 bg-black/30 backdrop-blur-md rounded-2xl border border-[#F160FE]/20 shadow-[0_0_50px_rgba(241,96,254,0.3)] transition-all duration-300 hover:shadow-[0_0_70px_rgba(241,96,254,0.4)]">
          <h2 className="text-[#F160FE] text-2xl font-bold mb-4">Descripción del Problema</h2>
          <p className="text-white mb-4 leading-relaxed">
            FizzBuzz es un clásico problema de programación. La tarea es escribir un programa que imprima los números del 1 al n, pero:
          </p>
          <ul className="text-white mb-6 list-disc list-inside leading-relaxed">
            <li>Para múltiplos de 3, imprime "Fizz" en lugar del número</li>
            <li>Para múltiplos de 5, imprime "Buzz" en lugar del número</li>
            <li>Para números que son múltiplos de tanto 3 como 5, imprime "FizzBuzz"</li>
          </ul>
          <p className="text-white mb-6 leading-relaxed">
            Tu tarea es escribir una función llamada <code className="bg-[#F160FE]/20 px-2 py-1 rounded text-[#F160FE]">fizzBuzz</code> que tome un número <code className="bg-[#F160FE]/20 px-2 py-1 rounded text-[#F160FE]">n</code> como 
            argumento y devuelva un array con la secuencia FizzBuzz hasta ese número.
          </p>
          
          <div className="mb-6">
            <h3 className="text-[#F160FE] text-xl font-bold mb-2">Ejemplo:</h3>
            <pre className="bg-[#1A1A1A] p-4 rounded-lg text-white overflow-x-auto">
              {`Input: n = 15
Output: [1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8, "Fizz", "Buzz", 11, "Fizz", 13, 14, "FizzBuzz"]`}
            </pre>
          </div>

          <div className="mb-6">
            <h3 className="text-[#F160FE] text-xl font-bold mb-2">Escribe tu código aquí:</h3>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-64 p-4 bg-[#1A1A1A] text-[#E0E0E0] font-mono rounded-lg border border-[#F160FE]/30 focus:outline-none focus:border-[#F160FE] focus:ring-1 focus:ring-[#F160FE] transition-all duration-300"
              placeholder="function fizzBuzz(n) {
  // Tu código aquí
}"
            />
          </div>

          <div className="flex justify-between mb-6">
            <motion.button
              onClick={runCode}
              className="bg-[#F160FE] text-black px-6 py-3 rounded-full font-bold text-lg hover:bg-[#F160FE]/90 transition-all duration-300 shadow-lg hover:shadow-[#F160FE]/50 flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <PlayIcon className="mr-2" /> Ejecutar Código
            </motion.button>
            <motion.button
              onClick={() => {
                setCode('')
                setOutput('')
                setIsCorrect(null)
              }}
              className="bg-[#1A1A1A] text-[#F160FE] px-6 py-3 rounded-full font-bold text-lg hover:bg-[#F160FE]/10 transition-all duration-300 shadow-lg flex items-center border border-[#F160FE]/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RefreshCwIcon className="mr-2" /> Reiniciar
            </motion.button>
          </div>

          {output && (
            <div className="mb-4">
              <h3 className="text-[#F160FE] text-xl font-bold mb-2">Resultado:</h3>
              <pre className={`p-4 rounded-lg ${isCorrect ? 'bg-green-800/30' : 'bg-red-800/30'} backdrop-blur-sm`}>
                <code className="text-white">{output}</code>
              </pre>
              {isCorrect !== null && (
                <p className={`mt-4 font-bold text-lg ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                  {isCorrect ? '¡Correcto! Has resuelto el reto.' : 'Incorrecto. Inténtalo de nuevo.'}
                </p>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-[#1A1A1A] p-8 rounded-2xl border border-[#F160FE]/20 shadow-[0_0_50px_rgba(241,96,254,0.3)] max-w-md w-full"
            >
              <h2 className="text-[#F160FE] text-3xl font-bold mb-4 text-center">¡Felicidades!</h2>
              <p className="text-white text-lg mb-6 text-center">
                Has completado el nivel básico de los retos de JavaScript. ¡Has desbloqueado el nivel intermedio!
              </p>
              <div className="flex justify-center">
                <motion.button
                  onClick={closeModal}
                  className="bg-[#F160FE] text-black px-6 py-3 rounded-full font-bold text-lg hover:bg-[#F160FE]/90 transition-all duration-300 shadow-lg hover:shadow-[#F160FE]/50 flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <XIcon className="mr-2" /> Cerrar
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default FizzBuzzChallenge