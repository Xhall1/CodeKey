import React, { useEffect, useState } from 'react';
import NavBar from '../components/Navbar';
import '../styles/Resource.css';
import ResourceCard from '../components/ResourceCard';
import LearnJS from '../components/LearnJS';
import JavaScriptChallenges from '../components/JavaScriptChallenges';
import UnimayorLogo from '../assets/images/codekey_unimayor.png';
import FuturisticBackground from '../components/FuturisticBackground';
import Footer from '../components/Footer';
import { SiJavascript, SiPython, SiTypescript } from 'react-icons/si';
import axios from 'axios';


const API_URL = 'http://localhost:3000/api/v1';





const Resource: React.FC = () => {

  const [data, setData] = useState<any>(null);


  //Al cargar esta pagina renderiza los cursos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/courses`);
        setData(response.data);
      } catch (error) {
        console.error(error);

      }
    }

    fetchData();

  }, []);

  if(!data){
    return <div>Cargando...</div>
  }

  console.log(data);
  const jsCourse = data[0];
  const { description, title } = jsCourse;

  return (
    <div className="min-h-screen flex flex-col bg-[#0D0D0D] overflow-x-hidden">
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
        <div className="flex flex-wrap justify-center gap-6 mb-16 w-full max-w-6xl">
          <ResourceCard
            language={title}
            Icon={SiJavascript}
            description={description}
            link="/recursos/javascript"
          />
          {/* <ResourceCard
            language="Python"
            Icon={SiPython}
            description="Lenguaje de alto nivel, ideal para principiantes y expertos."
            link="/recursos/python"
          />
          <ResourceCard
            language="TypeScript"
            Icon={SiTypescript}
            description="Superset de JavaScript con tipado estático opcional."
            link="/recursos/typescript"
          /> */}
        </div>
        <div className="w-full max-w-4xl mb-16">
          <LearnJS />
        </div>
        <div className="flex justify-center w-full mb-16">
          <JavaScriptChallenges />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Resource;