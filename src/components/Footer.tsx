import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1A0F1A] text-white py-8 w-screen max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Institución Universitaria Colegio Mayor del Cauca</h2>
          <p className="mb-2">Somos Institución de Educación Superior Pública sujeta a inspección y vigilancia por Mineducación</p>
          <p className="mb-2">Código SNIES 3104</p>
          <p className="mb-2">Carrera 5 # 5 - 40 Claustro de la Encarnación | Carrera 7 # 2-41 Edificio Bicentenario Código postal 190003</p>
          <p className="mb-2">Teléfono: PBX: (602) 8274178 Línea Nacional Gratuita 018000931018 Ext 1</p>
          <p className="mb-4">
            Correo de notificaciones judiciales:{' '}
            <a href="mailto:notificacionjudicial@unimayor.edu.co" className="text-[#F160FE] hover:underline">
              notificacionjudicial@unimayor.edu.co
            </a>
          </p>
          <p className="text-sm">© 2023 Institución Universitaria Colegio Mayor del Cauca. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;