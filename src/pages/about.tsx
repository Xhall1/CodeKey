import React from 'react';
import { motion } from 'framer-motion';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import FuturisticBackground from '../components/FuturisticBackground';
import { Code, Brain, Target, Zap, Users, Rocket, BookOpen, Award, Lightbulb, TrendingUp } from 'lucide-react';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string; delay: number }> = ({ icon, title, description, delay }) => (
  <motion.div 
    className="bg-black/50 rounded-xl p-6 flex flex-col items-center text-center border border-[#F160FE]/20 hover:border-[#F160FE]/50 transition-colors duration-300"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(241, 96, 254, 0.3)' }}
  >
    <motion.div 
      className="text-[#F160FE] mb-4"
      whileHover={{ rotate: 360 }}
      transition={{ duration: 0.5 }}
    >
      {icon}
    </motion.div>
    <h3 className="text-white text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-300 text-sm">{description}</p>
  </motion.div>
);

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex flex-col relative bg-[#0D0D0D]">
      <FuturisticBackground />
      <NavBar />
      <main className="flex-grow flex flex-col items-center justify-center px-4 pt-32 pb-16 relative z-10">
        <div className="w-full max-w-6xl">
          <motion.h1 
            className="text-5xl font-bold text-white mb-8 text-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
          >
            Descubre CodeKey
          </motion.h1>
          
          <motion.p 
            className="text-gray-300 text-xl mb-16 text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            CodeKey es una plataforma de aprendizaje innovadora diseñada para fortalecer tus habilidades en programación JavaScript y algoritmos. Nuestra plataforma ofrece una experiencia de aprendizaje interactiva y personalizada para programadores de todos los niveles.
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <FeatureCard 
              icon={<Code size={48} />}
              title="Enfoque en JavaScript"
              description="Aprende y practica JavaScript, desde conceptos básicos hasta técnicas avanzadas."
              delay={0.3}
            />
            <FeatureCard 
              icon={<Brain size={48} />}
              title="Práctica de Algoritmos"
              description="Mejora tus habilidades de resolución de problemas con una amplia variedad de ejercicios algorítmicos."
              delay={0.4}
            />
            <FeatureCard 
              icon={<Target size={48} />}
              title="Ejercicios Específicos"
              description="Resuelve problemas diseñados para implementar algoritmos eficientes y mejorar tu lógica de programación."
              delay={0.5}
            />
            <FeatureCard 
              icon={<Zap size={48} />}
              title="Evaluación Teórica"
              description="Refuerza tu comprensión con preguntas de opción múltiple sobre conceptos algorítmicos."
              delay={0.6}
            />
            <FeatureCard 
              icon={<Users size={48} />}
              title="Interfaz Intuitiva"
              description="Disfruta de una experiencia de usuario amigable y fácil de navegar."
              delay={0.7}
            />
            <FeatureCard 
              icon={<Rocket size={48} />}
              title="Seguimiento de Progreso"
              description="Monitorea tu avance y recibe recomendaciones personalizadas según tu nivel."
              delay={0.8}
            />
          </div>
          
          <motion.div 
            className="bg-[#F160FE]/10 rounded-2xl p-10 border border-[#F160FE]/30 mb-16 transform perspective-1000"
            initial={{ opacity: 0, rotateX: -90 }}
            animate={{ opacity: 1, rotateX: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <h2 className="text-3xl font-semibold text-white mb-6 text-center">Nuestra Misión</h2>
            <p className="text-gray-300 text-center text-lg max-w-3xl mx-auto">
              En CodeKey, nuestra misión es proporcionar una plataforma de aprendizaje integral que permita a los estudiantes y profesionales mejorar sus habilidades en programación JavaScript y algoritmos. Creemos en el poder de la práctica constante y el aprendizaje interactivo para desarrollar programadores competentes y seguros. Nos esforzamos por crear un entorno de aprendizaje inclusivo y motivador que inspire a nuestros usuarios a alcanzar su máximo potencial en el mundo de la programación.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <motion.div 
              className="bg-black/50 rounded-xl p-8 border border-[#F160FE]/20 hover:border-[#F160FE]/50 transition-colors duration-300"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 1 }}
              whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(241, 96, 254, 0.2)' }}
            >
              <h3 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <BookOpen className="text-[#F160FE] mr-3" size={32} />
                Metodología de Aprendizaje
              </h3>
              <p className="text-gray-300 text-lg">
                Nuestra metodología se basa en el aprendizaje activo y la práctica constante. Combinamos teoría con ejercicios prácticos, desafíos de codificación y proyectos del mundo real para asegurar que nuestros usuarios no solo aprendan, sino que también apliquen sus conocimientos de manera efectiva.
              </p>
            </motion.div>
            <motion.div 
              className="bg-black/50 rounded-xl p-8 border border-[#F160FE]/20 hover:border-[#F160FE]/50 transition-colors duration-300"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 1.1 }}
              whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(241, 96, 254, 0.2)' }}
            >
              <h3 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <Award className="text-[#F160FE] mr-3" size={32} />
                Nuestro Compromiso
              </h3>
              <p className="text-gray-300 text-lg">
                Nos comprometemos a proporcionar contenido actualizado y relevante, adaptándonos constantemente a las últimas tendencias y mejores prácticas en el desarrollo de software. Nuestro equipo de expertos trabaja continuamente para mejorar la plataforma y ofrecer la mejor experiencia de aprendizaje posible.
              </p>
            </motion.div>
          </div>

          <motion.div 
            className="bg-black/50 rounded-xl p-8 mb-16 border border-[#F160FE]/20 hover:border-[#F160FE]/50 transition-colors duration-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.2 }}
            whileHover={{ boxShadow: '0 0 30px rgba(241, 96, 254, 0.2)' }}
          >
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center justify-center">
              <Lightbulb className="text-[#F160FE] mr-3" size={32} />
              ¿Por qué elegir CodeKey?
            </h3>
            <ul className="text-gray-300 list-disc list-inside space-y-3 text-lg">
              <li>Contenido personalizado que se adapta a tu nivel y ritmo de aprendizaje</li>
              <li>Enfoque práctico con ejercicios y proyectos del mundo real</li>
              <li>Comunidad activa de estudiantes y profesionales para networking y colaboración</li>
              <li>Instructores expertos con amplia experiencia en la industria</li>
              <li>Actualizaciones regulares de contenido para mantenerte al día con las últimas tendencias</li>
            </ul>
          </motion.div>

          <motion.div 
            className="bg-[#F160FE]/10 rounded-xl p-10 border border-[#F160FE]/30 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 1.3 }}
            whileHover={{ boxShadow: '0 0 50px rgba(241, 96, 254, 0.4)' }}
          >
            <h3 className="text-3xl font-semibold text-white mb-6 flex items-center justify-center">
              <TrendingUp className="text-[#F160FE] mr-3" size={36} />
              Comienza tu viaje de aprendizaje hoy
            </h3>
            <p className="text-gray-300 mb-8 text-xl">
              Únete a CodeKey y da el primer paso hacia el dominio de JavaScript y los algoritmos. Tu futuro en la programación comienza aquí.
            </p>
            <motion.button 
              className="bg-[#F160FE] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#F160FE]/80 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Empieza ahora
            </motion.button>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;