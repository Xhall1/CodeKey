import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Resource from './pages/Resource';
import ProfilePage from './pages/perfil';
import ConfigurationPage from './pages/configuracion';
import RankingPage from './pages/ranking';
import AboutPage from './pages/about';
import Challenges from './pages/Challenges';
import JavaScriptResourcesPage from './pages/recursos/javascript';
import JavaScriptLevel1 from './pages/recursos/javascript/nivel-1';
import JavaScriptLevel2 from './pages/recursos/javascript/nivel-2';
import JavaScriptLevel3 from './pages/recursos/javascript/nivel-3';
import JavaScriptChallenges from './pages/retos/javascript/retosJavascript';
import JavaScriptChallengesBasicLevel1 from './pages/retos/javascript/basico-1';
import JavaScriptChallengesBasicLevel2 from './pages/retos/javascript/basico-2';
import JavaScriptChallengesBasicLevel3 from './pages/retos/javascript/basico-3';
import JavaScriptChallengesIntermedioLevel1 from './pages/retos/javascript/intermedio-1';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Resource />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recursos" element={<Resource />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/perfil" element={<ProfilePage />} />
        <Route path="/configuracion" element={<ConfigurationPage />} />
        <Route path="/ranking" element={<RankingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/Challenges" element={<Challenges />} />
        <Route path="/recursos/javascript" element={<JavaScriptResourcesPage />} />
        <Route path="/recursos/javascript/nivel-1" element={<JavaScriptLevel1 />} />
        <Route path="/recursos/javascript/nivel-2" element={<JavaScriptLevel2 />} />
        <Route path="/recursos/javascript/nivel-3" element={<JavaScriptLevel3 />} />
        <Route path="/retos/retosJavascript" element={<JavaScriptChallenges />} />
        <Route path="/retos/javascript/basico-1" element={<JavaScriptChallengesBasicLevel1 />} />
        <Route path="/retos/javascript/basico-2" element={<JavaScriptChallengesBasicLevel2 />} />
        <Route path="/retos/javascript/basico-3" element={<JavaScriptChallengesBasicLevel3 />} />
        <Route path="/retos/javascript/intermedio-1" element={<JavaScriptChallengesIntermedioLevel1 />} />
      </Routes>
    </Router>
  );
}

export default App;