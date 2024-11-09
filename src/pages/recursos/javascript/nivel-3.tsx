import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import FuturisticBackground from '@/components/FuturisticBackground'
import UnimayorLogo from '@/assets/images/codekey_unimayor.png'
import { Terminal, Play, ChevronRight, CheckCircle, XCircle, List } from 'lucide-react'
import confetti from 'canvas-confetti'

const CodeEditor: React.FC<{ code: string; setCode: (code: string) => void; runCode: () => void }> = ({ code, setCode, runCode }) => (
  <div className="bg-[#1A1A1A] p-6 rounded-lg border border-[#F160FE]/20 shadow-lg">
    <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
      <Terminal className="mr-2 text-[#F160FE]" />
      Pruébalo
    </h2>
    <textarea
      className="w-full h-[200px] bg-[#0D0D0D] rounded p-4 text-white font-mono text-lg resize-none focus:ring-2 focus:ring-[#F160FE] focus:outline-none"
      value={code}
      onChange={(e) => setCode(e.target.value)}
      placeholder="// Escribe tu código aquí"
      style={{ fontSize: '18px', lineHeight: '1.5' }}
    />
    <motion.button
      className="mt-4 px-6 py-2 bg-gradient-to-r from-[#F160FE] to-[#7B2FFE] text-white rounded-full font-semibold hover:from-[#7B2FFE] hover:to-[#F160FE] transition-all duration-300 flex items-center justify-center"
      onClick={runCode}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Play className="mr-2" size={18} />
      Ejecutar
    </motion.button>
  </div>
)

const ConsoleOutput: React.FC<{ output: string }> = ({ output }) => (
  <div className="bg-[#1A1A1A] p-6 rounded-lg border border-[#F160FE]/20 shadow-lg">
    <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
      <Terminal className="mr-2 text-[#F160FE]" />
      Consola
    </h2>
    <div className="w-full h-[200px] bg-[#0D0D0D] rounded p-4 text-white font-mono text-lg overflow-auto">
      <pre>{output}</pre>
    </div>
  </div>
)

const ArrayMethodCard: React.FC<{ title: string; description: string; example: string }> = ({ title, description, example }) => (
  <motion.div 
    className="bg-[#1A1A1A] p-4 rounded-lg shadow-md"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300, damping: 10 }}
  >
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-300 text-sm mb-2">{description}</p>
    <pre className="bg-[#0D0D0D] p-2 rounded text-sm text-white">{example}</pre>
  </motion.div>
)

const Quiz: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer)
    const correct = answer === '["Rojo", "Verde", "Azul"]'
    setIsCorrect(correct)
    if (correct) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
      setTimeout(onComplete, 2000)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mt-16 bg-[#1A1A1A] p-6 rounded-lg border border-[#F160FE]/20 shadow-lg"
    >
      <h2 className="text-2xl font-semibold text-white mb-4">Quiz</h2>
      <p className="text-white text-lg mb-4">¿Cuál es la salida del siguiente código?</p>
      <pre className="bg-[#0D0D0D] p-4 rounded mb-4 text-white font-mono text-lg">
        {`let colores = ["Rojo", "Verde", "Azul"];
console.log(colores);`}
      </pre>
      <div className="space-y-2">
        {[
          '["Rojo", "Verde", "Azul"]',
          'Rojo, Verde, Azul',
          '["Rojo"]',
          'undefined'
        ].map((answer) => (
          <motion.button
            key={answer}
            className={`w-full p-3 text-left rounded ${
              selectedAnswer === answer
                ? isCorrect
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
                : 'bg-[#0D0D0D] text-white hover:bg-[#2A2A2A]'
            } transition-colors flex items-center justify-between`}
            onClick={() => handleAnswerSelect(answer)}
            disabled={isCorrect === true}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>{answer}</span>
            {selectedAnswer === answer && (
              isCorrect ? <CheckCircle className="text-white" /> : <XCircle className="text-white" />
            )}
          </motion.button>
        ))}
      </div>
      {isCorrect !== null && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`mt-4 text-lg ${isCorrect ? 'text-green-400' : 'text-red-400'}`}
        >
          {isCorrect ? '¡Correcto!' : 'Incorrecto. Puedes intentar de nuevo.'}
        </motion.p>
      )}
    </motion.div>
  )
}

const JavaScriptLevel3: React.FC = () => {
  const [code, setCode] = useState('')
  const [output, setOutput] = useState('')
  const [showQuiz, setShowQuiz] = useState(false)
  const [showNextLevelMessage, setShowNextLevelMessage] = useState(false)
  const quizRef = useRef<HTMLDivElement>(null)

  const runCode = () => {
    setOutput('')
    const originalConsoleLog = console.log
    const logs: string[] = []

    console.log = (...args) => {
      logs.push(args.map(arg => JSON.stringify(arg)).join(' '))
    }

    try {
      // eslint-disable-next-line no-new-func
      new Function(code)()
      setOutput(logs.join('\n'))
    } catch (error) {
      setOutput(`Error: ${error.message}`)
    } finally {
      console.log = originalConsoleLog
    }
  }

  const handleNext = () => {
    setShowQuiz(true)
    setTimeout(() => {
      quizRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const handleQuizComplete = () => {
    setShowNextLevelMessage(true)
  }

  useEffect(() => {
    if (showNextLevelMessage) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    }
  }, [showNextLevelMessage])

  return (
    <div className="min-h-screen w-full flex flex-col relative bg-[#0D0D0D]">
      <FuturisticBackground />
      <NavBar />
      <main className="flex-grow flex flex-col items-center px-4 pt-24 pb-16 relative z-10">
        <motion.div 
          className="flex flex-col items-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-32 h-32 flex items-center justify-center mb-4">
            <img 
              src={UnimayorLogo} 
              alt="Unimayor Logo"
              className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(241,96,254,0.8)]"
            />
          </div>
          <h1 className="text-4xl font-bold text-white text-center">Arrays en JavaScript</h1>
        </motion.div>

        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <motion.div 
            className="bg-[#1A1A1A] p-6 rounded-lg border border-[#F160FE]/20 shadow-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <List className="mr-2 text-[#F160FE]" />
              Explicación
            </h2>
            <p className="text-white/90 text-lg leading-relaxed mb-6">
              Los arrays en JavaScript son estructuras de datos que permiten almacenar múltiples valores en una sola variable. 
              Son objetos similares a una lista cuyo prototipo proporciona métodos para efectuar operaciones de recorrido y mutación. 
              Tanto la longitud como el tipo de los elementos de un array son variables.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ArrayMethodCard 
                title="push()" 
                description="Añade uno o más elementos al final del array" 
                example="frutas.push('Naranja')" 
              />
              <ArrayMethodCard 
                title="pop()" 
                description="Elimina el último elemento del array" 
                example="frutas.pop()" 
              />
              <ArrayMethodCard 
                title="unshift()" 
                description="Añade uno o más elementos al inicio del array" 
                example="frutas.unshift('Fresa')" 
              />
              <ArrayMethodCard 
                title="shift()" 
                description="Elimina el primer elemento del array" 
                example="frutas.shift()" 
              />
            </div>
          </motion.div>

          <motion.div 
            className="bg-[#1A1A1A] p-6 rounded-lg border border-[#F160FE]/20 shadow-lg"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-4">Ejemplo de Código</h2>
            <div className="font-mono text-lg">
              <div className="text-gray-500">// Crear Array</div>
              <div className="mb-2">
                <span className="text-[#F160FE]">let</span>
                <span className="text-white"> frutas = </span>
                <span className="text-white">[</span>
                <span className="text-green-400">"Manzana"</span>
                <span className="text-white">, </span>
                <span className="text-green-400">"Pera"</span>
                <span className="text-white">, </span>
                <span className="text-green-400">"Uva"</span>
                <span className="text-white">];</span>
              </div>
              <div>
                <span className="text-white">console</span>
                <span className="text-[#F160FE]">.log</span>
                <span className="text-white">(frutas);</span>
              </div>
              <div className="text-gray-500">// ["Manzana", "Pera", "Uva"]</div>
              <div className="mt-4 text-gray-500">// Añadir elemento al final</div>
              <div className="mb-2">
                <span className="text-white">frutas</span>
                <span className="text-[#F160FE]">.push</span>
                <span className="text-white">(</span>
                <span className="text-green-400">"Naranja"</span>
                <span className="text-white">);</span>
              </div>
              <div>
                <span className="text-white">console</span>
                <span className="text-[#F160FE]">.log</span>
                <span className="text-white">(frutas);</span>
              </div>
              <div className="text-gray-500">// ["Manzana", "Pera", "Uva", "Naranja"]</div>
            </div>
          </motion.div>
        </div>

        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <CodeEditor code={code} setCode={setCode} runCode={runCode} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <ConsoleOutput output={output} />
          </motion.div>
        </div>

        <motion.button
          className="px-8 py-3 bg-gradient-to-r from-[#F160FE] to-[#7B2FFE] text-white rounded-full text-xl font-semibold hover:from-[#7B2FFE] hover:to-[#F160FE] transition-all duration-300 flex items-center"
          onClick={handleNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Siguiente
          <ChevronRight className="ml-2" size={24} />
        </motion.button>

        {showQuiz && (
          <div ref={quizRef}>
            <Quiz onComplete={handleQuizComplete} />
          </div>
        )}

        <AnimatePresence>
          {showNextLevelMessage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8 text-center"
            >
              <p className="text-white text-2xl mb-4">¡Felicidades! Has completado el Nivel 3.</p>
              <Link
                to="/recursos/javascript/nivel-4"
                className="inline-block px-8 py-3 bg-gradient-to-r from-[#F160FE] to-[#7B2FFE] text-white rounded-full text-xl font-semibold hover:from-[#7B2FFE] hover:to-[#F160FE] transition-all duration-300"
              >
                Ir al Nivel 4
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}

export default JavaScriptLevel3;