import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react';

const contentData = [
  {
    title: "ARRAYLIST",
    description: "Aprende a hacer arreglos",
    link: "/recursos/javascript/arrays"
  },
  {
    title: "FUNCIONES",
    description: "Domina las funciones en JS",
    link: "/recursos/javascript/funciones"
  },
  {
    title: "OBJETOS",
    description: "Explora el mundo de los objetos",
    link: "/recursos/javascript/objetos"
  }
];

const LearnJS: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      nextContent();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const nextContent = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % contentData.length);
      setIsAnimating(false);
    }, 500);
  };

  const prevContent = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + contentData.length) % contentData.length);
      setIsAnimating(false);
    }, 500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <h1 className="text-white text-4xl font-bold text-center mb-8">
        Aprende lo básico de JavaScript
      </h1>
      
      <Card className="bg-[#0a0a0a] border border-fuchsia-500/20 shadow-lg shadow-fuchsia-500/10 relative">
        <CardContent className="flex flex-col items-center justify-center p-12 space-y-6 min-h-[300px]">
          <div className={`transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            <h2 className="text-white text-2xl font-semibold tracking-wider text-center">
              {contentData[currentIndex].title}
            </h2>
            
            <h3 className="text-white text-3xl font-bold text-center mt-4">
              {contentData[currentIndex].description}
            </h3>
            
            <div className="flex justify-center mt-6">
              <Link to={contentData[currentIndex].link}>
                <Button 
                  className="bg-fuchsia-500 hover:bg-fuchsia-600 text-white px-8 py-2 rounded-full text-lg"
                >
                  Ver más
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex space-x-2 mt-8">
            {contentData.map((_, index) => (
              <div 
                key={index}
                className={`w-2 h-2 rounded-full ${index === currentIndex ? 'bg-fuchsia-500' : 'bg-white/20'}`}
              ></div>
            ))}
          </div>
        </CardContent>

        <button
          onClick={prevContent}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-fuchsia-500 transition-colors"
          aria-label="Previous content"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextContent}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-fuchsia-500 transition-colors"
          aria-label="Next content"
        >
          <ChevronRight size={24} />
        </button>
      </Card>
    </div>
  );
};

export default LearnJS;