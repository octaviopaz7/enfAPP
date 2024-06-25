import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { HabitacionesProvider } from './components/hooks/HabitacionesContext';
import Piso from './components/Pisos';
import Habitacion from './components/Habitacion';
import PacienteForm from './components/PacienteForm';
import LoginForm from './components/LoginForm';
import FormRegistro from './components/FormRegistro';
import NavBar from './components/NavBar';
import CambiarContraseña from './components/CambiarContraseña';
import SearchMedication from './components/SearchMedication';
import Gotero from './components/gotero/Gotero';
import Parametros from './components/Parametros';


const App = () => {
  const location = useLocation();
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/register';

  useEffect(() => {
    console.log(location.pathname); // Verifica la ruta actual en la consola
    if (location.pathname === '/login') {
      document.body.classList.add('login-bg');
      document.body.classList.remove('registro-bg');
    } else if (location.pathname === '/register' || location.pathname === '/cambiar-contrase%C3%B1a') {
      document.body.classList.add('registro-bg');
      document.body.classList.remove('login-bg');
    } else {
      document.body.classList.remove('login-bg', 'registro-bg');
    }
  }, [location.pathname]);


  return (
    <HabitacionesProvider>
      {!isAuthRoute && <NavBar />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<FormRegistro />} />
        <Route path="/Search-medication/search" element={<SearchMedication />} />
        <Route path="/pisos" element={<Piso />} />
        <Route path="/paciente-form" element={<PacienteForm />} />
        <Route path="/habitaciones/:numero/:cama" element={<Habitacion />} />
        <Route path="/habitacion/:numero/:cama/parametros" element={<Parametros />} />
        <Route path="/cambiar-contraseña" element={<CambiarContraseña />} />
        <Route path="/calculadora-de-goteo" element={<Gotero />} />
      </Routes>
    </HabitacionesProvider>
  );
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
