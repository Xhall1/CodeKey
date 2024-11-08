import React, { useState, useRef, useEffect } from 'react';
import NavBar from '../../../components/NavBar';
import FuturisticBackground from '../../../components/FuturisticBackground';
import Footer from '../../../components/Footer';
import UnimayorLogo from '../../../assets/images/codekey_unimayor.png';
import confetti from 'canvas-confetti';

const JavaScriptLevel2: React.FC = () => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showNextLevelMessage, setShowNextLevelMessage] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const quizRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const answers = [
      '15Hola',
      '"15Hola"',
      '10 + 5Hola',
      'undefined'
    ];
    setQuizAnswers(answers.sort(() => Math.random() - 0.5));
  }, []);

  const runCode = () => {
    setOutput('');
    const originalConsoleLog = console.log;
    const logs: string[] = [];

    console.log = (...args) => {
      logs.push(args.map(arg => typeof arg === 'string' ? arg : JSON.stringify(arg)).join(' '));
    };

    try {
      // eslint-disable-next-line no-new-func
      new Function(code)();
      setOutput(logs.join('\n'));
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      console.log = originalConsoleLog;
    }
  };

  const handleNext = () => {
    setShowQuiz(true);
    setTimeout(() => {
      quizRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    const correct = answer === '15Hola';
    setIsCorrect(correct);
    if (correct) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        setShowNextLevelMessage(true);
      }, 2000);
    }
  };

  const goToNextLevel = () => {
    window.location.href = '/recursos/javascript/nivel-3';
  };

  return (
    <div className="min-h-screen w-full flex flex-col relative bg-[#0D0D0D]">
      <FuturisticBackground />
      <NavBar />
      <main className="flex-grow flex flex-col items-center px-4 pt-24 pb-16 relative z-10">
        {/* Logo and Title */}
        <div className="flex flex-col items-center mb-12">
          <div className="w-32 h-32 flex items-center justify-center mb-4">
            <img 
              src={UnimayorLogo} 
              alt="Unimayor Logo"
              className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(241,96,254,0.8)]"
            />
          </div>
          <h1 className="text-4xl font-bold text-white">Operaciones Básicas</h1>
        </div>

        {/* Content Grid */}
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Explanation */}
          <div className="bg-black/50 p-6 rounded-lg border border-[#F160FE]/20">
            <p className="text-white/90 text-lg leading-relaxed">
              En JavaScript, puedes realizar operaciones básicas con números y strings.
              Con números, puedes usar operadores como +, -, *, y /.
              Con strings, el operador + se usa para concatenar (unir) strings.
              También puedes combinar números y strings en una operación,
              lo que resulta en una concatenación automática.
            </p>
          </div>

          {/* Right Column - Code Example */}
          <div className="bg-black/50 p-6 rounded-lg border border-[#F160FE]/20">
            <div className="font-mono text-lg">
              <div className="text-gray-500">// Operaciones con números</div>
              <div className="mb-2">
                <span className="text-[#F160FE]">let</span>
                <span className="text-white"> suma = 5 + 10;</span>
              </div>
              <div className="mb-2">
                <span className="text-white">console.log(suma); </span>
                <span className="text-gray-500">// 15</span>
              </div>
              <div className="text-gray-500">// Operaciones con strings</div>
              <div className="mb-2">
                <span className="text-[#F160FE]">let</span>
                <span className="text-white"> mensaje = </span>
                <span className="text-green-400">"Hola"</span>
                <span className="text-white"> + </span>
                <span className="text-green-400">" Mundo"</span>
                <span className="text-white">;</span>
              </div>
              <div className="mb-2">
                <span className="text-white">console.log(mensaje); </span>
                <span className="text-gray-500">// Hola Mundo</span>
              </div>
              <div className="text-gray-500">// Combinando números y strings</div>
              <div className="mb-2">
                <span className="text-white">console.log(suma + </span>
                <span className="text-green-400">"Hola"</span>
                <span className="text-white">); </span>
                <span className="text-gray-500">// 15Hola</span>
              </div>
            </div>
          </div>
        </div>

        {/* Practice Section */}
        <div className="w-full max-w-6xl mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Code Editor */}
          <div className="bg-black/50 p-6 rounded-lg border border-[#F160FE]/20 min-h-[300px]">
            <h2 className="text-xl font-semibold text-white mb-4">Pruébalo</h2>
            <textarea
              className="w-full h-[200px] bg-black/50 rounded p-4 text-white font-mono text-lg resize-none"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="// Escribe tu código aquí"
              style={{
                fontSize: '18px',
                lineHeight: '1.5',
              }}
            />
            <button
              className="mt-4 px-4 py-2 bg-[#F160FE] text-black rounded hover:bg-[#F160FE]/80 transition-colors"
              onClick={runCode}
            >
              Ejecutar
            </button>
          </div>

          {/* Console Output */}
          <div className="bg-black/50 p-6 rounded-lg border border-[#F160FE]/20 min-h-[300px]">
            <h2 className="text-xl font-semibold text-white mb-4">Consola</h2>
            <div className="w-full h-[200px] bg-black/50 rounded p-4 text-white font-mono text-lg overflow-auto">
              <pre>{output}</pre>
            </div>
          </div>
        </div>

        {/* Next Button */}
        <button
          className="mt-8 px-6 py-3 bg-[#F160FE] text-black rounded-full text-xl font-semibold hover:bg-[#F160FE]/80 transition-colors"
          onClick={handleNext}
        >
          Siguiente
        </button>

        {/* Quiz Section */}
        {showQuiz && (
          <div ref={quizRef} className="w-full max-w-2xl mt-16 bg-black/50 p-6 rounded-lg border border-[#F160FE]/20">
            <h2 className="text-2xl font-semibold text-white mb-4">Quiz</h2>
            <p className="text-white text-lg mb-4">¿Cuál es la salida del siguiente código?</p>
            <pre className="bg-black/50 p-4 rounded mb-4 text-white font-mono text-lg">
              {`let numero = 10 + 5;
let texto = "Hola";
console.log(numero + texto);`}
            </pre>
            <div className="space-y-2">
              {quizAnswers.map((answer) => (
                <button
                  key={answer}
                  className={`w-full p-3 text-left rounded ${
                    selectedAnswer === answer
                      ? isCorrect
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  } transition-colors`}
                  onClick={() => handleAnswerSelect(answer)}
                  disabled={isCorrect === true}
                >
                  {answer}
                </button>
              ))}
            </div>
            {isCorrect !== null && (
              <p className={`mt-4 text-lg ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                {isCorrect ? '¡Correcto!' : 'Incorrecto. Puedes intentar de nuevo.'}
              </p>
            )}
            {showNextLevelMessage && (
              <div className="mt-6">
                <p className="text-white text-lg mb-4">¡Felicidades! Has completado el Nivel 2.</p>
                <button
                  className="px-6 py-3 bg-[#F160FE] text-black rounded-full text-xl font-semibold hover:bg-[#F160FE]/80 transition-colors"
                  onClick={goToNextLevel}
                >
                  Ir al Nivel 3
                </button>
              </div>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default JavaScriptLevel2;