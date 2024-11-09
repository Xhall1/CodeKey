import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import NavBar from '../../../components/Navbar'
import UnimayorLogo from '../../../assets/images/codekey_unimayor.png'
import FuturisticBackground from '../../../components/FuturisticBackground'
import Footer from '../../../components/Footer'
import { PlayIcon, RefreshCwIcon } from 'lucide-react'
import confetti from 'canvas-confetti'

const FibonacciChallenge: React.FC = () => {
  const [code, setCode] = useState('')
  const [output, setOutput] = useState('')
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const unlockedChallenges = JSON.parse(localStorage.getItem('unlockedChallenges') || '["basico-1"]')
    if (!unlockedChallenges.includes('basico-1')) {
      localStorage.setItem('unlockedChallenges', JSON.stringify([...unlockedChallenges, 'basico-1']))
    }
  }, [])

  const runCode = () => {
    try {
      const userFunction = new Function('n', code + '\nreturn fibonacci(n);')
      const result = userFunction(10)
      const expectedOutput = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
      
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
        localStorage.setItem('completedChallenges', JSON.stringify([...completedChallenges, 'basico-1']))
        
        const unlockedChallenges = JSON.parse(localStorage.getItem('unlockedChallenges') || '[]')
        const nextChallenge = 'basico-2'
        if (!unlockedChallenges.includes(nextChallenge)) {
          localStorage.setItem('unlockedChallenges', JSON.stringify([...unlockedChallenges, nextChallenge]))
        }
        
        setTimeout(() => {
          navigate(`/retos/javascript/${nextChallenge}`)
        }, 3000)
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`)
      setIsCorrect(false)
    }
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
          Reto: Secuencia de Fibonacci
        </h1>
        
        <div className="w-full max-w-4xl mx-auto p-8 bg-black/30 backdrop-blur-md rounded-2xl border border-[#F160FE]/20 shadow-[0_0_50px_rgba(241,96,254,0.3)] transition-all duration-300 hover:shadow-[0_0_70px_rgba(241,96,254,0.4)]">
          <h2 className="text-[#F160FE] text-2xl font-bold mb-4">Descripción del Problema</h2>
          <p className="text-white mb-4 leading-relaxed">
            La secuencia de Fibonacci es una serie de números en la que cada número es la suma de los dos anteriores, 
            comenzando con 0 y 1. La secuencia comienza así: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...
          </p>
          <p className="text-white mb-6 leading-relaxed">
            Tu tarea es escribir una función llamada <code className="bg-[#F160FE]/20 px-2 py-1 rounded text-[#F160FE]">fibonacci</code> que tome un número <code className="bg-[#F160FE]/20 px-2 py-1 rounded text-[#F160FE]">n</code> como 
            argumento y devuelva un array con los primeros <code className="bg-[#F160FE]/20 px-2 py-1 rounded text-[#F160FE]">n</code> números de la secuencia de Fibonacci.
          </p>
          
          <div className="mb-6">
            <h3 className="text-[#F160FE] text-xl font-bold mb-2">Ejemplo:</h3>
            <pre className="bg-[#1A1A1A] p-4 rounded-lg text-white overflow-x-auto">
              {`Input: n = 5
Output: [0, 1, 1, 2, 3]

Input: n = 10
Output: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]`}
            </pre>
          </div>

          <div className="mb-6">
            <h3 className="text-[#F160FE] text-xl font-bold mb-2">Escribe tu código aquí:</h3>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-64 p-4 bg-[#1A1A1A] text-[#E0E0E0] font-mono rounded-lg border border-[#F160FE]/30 focus:outline-none focus:border-[#F160FE] focus:ring-1 focus:ring-[#F160FE] transition-all duration-300"
              placeholder="function fibonacci(n) {
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
                  {isCorrect ? '¡Correcto! Has resuelto el reto. Serás redirigido al siguiente reto en breve.' : 'Incorrecto. Inténtalo de nuevo.'}
                </p>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default FibonacciChallenge