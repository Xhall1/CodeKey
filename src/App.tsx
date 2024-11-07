import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Resource from './pages/Resource';
import JavaScriptResourcesPage from './pages/recursos/javascript';
import JavaScriptLevel1 from './pages/recursos/javascript/nivel-1';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Resource />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recursos" element={<Resource />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/recursos/javascript" element={<JavaScriptResourcesPage />} />
        <Route path="/recursos/javascript/nivel-1" element={<JavaScriptLevel1 />} />
      </Routes>
    </Router>
  );
}

export default App;