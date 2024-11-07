import React from 'react';
import { SiJavascript } from 'react-icons/si';
import { Link } from 'react-router-dom';
import PixelHouseImage from '../assets/images/codekey_unimayor.png';

const JavaScriptChallenges: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-4 grid md:grid-cols-2 gap-8 items-center">
      <div className="overflow-hidden rounded-lg bg-[#0D0D0D] shadow-lg shadow-[#F160FE]/10 max-w-sm mx-auto">
        <Link to="/retos/javascript" className="block">
          <div className="flex flex-col items-center p-8 space-y-6">
            <div className="w-20 h-20 bg-[#0D0D0D] flex items-center justify-center rounded-full">
              <SiJavascript className="w-16 h-16 text-white" />
            </div>
            
            <h2 className="text-white text-2xl font-semibold text-center">
              Practica para mejorar tus habilidades
            </h2>
            
            <button className="bg-[#F160FE] text-black px-8 py-3 rounded-md text-lg font-pixel transition-colors duration-300 hover:bg-[#FF00FF] hover:text-white">
              Ver
            </button>
          </div>
        </Link>
      </div>

      <div className="flex flex-col items-center space-y-6">
        <h1 className="text-4xl md:text-5xl text-white font-pixel tracking-wide text-center">
          RETOS EN JAVASCRIPT
        </h1>
        <div className="w-48 h-48">
          <img 
            src={PixelHouseImage}
            alt="Pixel house icon"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default JavaScriptChallenges;