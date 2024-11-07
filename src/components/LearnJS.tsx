import React from 'react';
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const LearnJS: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <h1 className="text-white text-4xl font-bold text-center mb-8">
        Aprende lo básico de JavaScript
      </h1>
      
      <Card className="bg-[#0a0a0a] border border-fuchsia-500/20 shadow-lg shadow-fuchsia-500/10">
        <CardContent className="flex flex-col items-center justify-center p-12 space-y-6">
          <h2 className="text-white text-2xl font-semibold tracking-wider">
            ARRAYLIST
          </h2>
          
          <h3 className="text-white text-3xl font-bold">
            Aprende a hacer arreglos
          </h3>
          
          <Button 
            className="bg-fuchsia-500 hover:bg-fuchsia-600 text-white px-8 py-2 rounded-full text-lg"
          >
            Ver más
          </Button>

          <div className="flex space-x-2 mt-8">
            <div className="w-2 h-2 rounded-full bg-fuchsia-500"></div>
            <div className="w-2 h-2 rounded-full bg-white/20"></div>
            <div className="w-2 h-2 rounded-full bg-white/20"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LearnJS;