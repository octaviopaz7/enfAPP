// Crear un contexto para el estado de las habitaciones
import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../../../../backend/src/routes/api'; // Importa la instancia de Axios configurada


const HabitacionesContext = createContext();

export const useHabitaciones = () => {
  return useContext(HabitacionesContext);
};

export const HabitacionesProvider = ({ children }) => {
  const [estadoHabitaciones, setEstadoHabitaciones] = useState([]);

  useEffect(() => {
    obtenerEstadoHabitaciones();
  }, []);

  const obtenerEstadoHabitaciones = async () => {
    try {
      const response = await api.get('/habitaciones');
      setEstadoHabitaciones(response.data);
    } catch (error) {
      console.error('Error al obtener el estado de las habitaciones:', error);
    }
  };

  return (
    <HabitacionesContext.Provider value={{ estadoHabitaciones, obtenerEstadoHabitaciones }}>
      {children}
    </HabitacionesContext.Provider>
  );
};
