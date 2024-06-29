import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { HabitacionesProvider } from './components/hooks/HabitacionesContext';
import Piso from './components/pisos/Pisos';
import Habitacion from './components/habitacion/Habitacion';
import PacienteForm from './components/pacienteForm/PacienteForm';
import LoginForm from './components/loginForm/LoginForm';
import FormRegistro from './components/formRegistro/FormRegistro';
import NavBar from './components/navBar/NavBar';
import CambiarContraseña from './components/cambiarContraseña/CambiarContraseña';
import SearchMedication from './components/buscarMedicacion/SearchMedication';
import Gotero from './components/gotero/Gotero';
import Parametros from './components/parametros/Parametros';


const App = () => {
  const location = useLocation();
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/register';

  useEffect(() => {
    //console.log(location.pathname);
    switch (true) {
      case location.pathname.startsWith('/habitaciones/') || location.pathname === '/paciente-form':
        document.body.classList.add('habitaciones-bg');
        document.body.classList.remove('login-bg', 'registro-bg', 'pisos-bg', 'gotero-bg', 'parametros-bg', 'medicamentos-bg');
        break;
      case location.pathname === '/login':
        document.body.classList.add('login-bg');
        document.body.classList.remove('registro-bg', 'pisos-bg', 'habitaciones-bg', 'gotero-bg', 'parametros-bg', 'medicamentos-bg');
        break;
      case location.pathname === '/register' || location.pathname === '/cambiar-contrase%C3%B1a':
        document.body.classList.add('registro-bg');
        document.body.classList.remove('login-bg', 'pisos-bg', 'habitaciones-bg', 'gotero-bg', 'parametros-bg', 'medicamentos-bg');
        break;
      case location.pathname === '/pisos':
        document.body.classList.add('pisos-bg');
        document.body.classList.remove('login-bg', 'registro-bg', 'habitaciones-bg', 'gotero-bg', 'parametros-bg', 'medicamentos-bg');
        break;
      case location.pathname === '/calculadora-de-goteo':
        document.body.classList.add('gotero-bg');
        document.body.classList.remove('login-bg', 'registro-bg', 'pisos-bg', 'habitaciones-bg', 'parametros-bg', 'medicamentos-bg');
        break;
      case location.pathname.startsWith('/habitacion/') && location.pathname.includes('/parametros'):
        document.body.classList.add('parametros-bg');
        document.body.classList.remove('login-bg', 'registro-bg', 'pisos-bg', 'habitaciones-bg', 'gotero-bg', 'medicamentos-bg');
        break;
      case location.pathname === '/Search-medication/search':
        document.body.classList.add('medicamentos-bg');
        document.body.classList.remove('login-bg', 'registro-bg', 'pisos-bg', 'habitaciones-bg', 'gotero-bg', 'parametros-bg');
        break;
      default:
        document.body.classList.remove('login-bg', 'registro-bg', 'pisos-bg', 'habitaciones-bg', 'gotero-bg', 'parametros-bg', 'medicamentos-bg');
        break;
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
