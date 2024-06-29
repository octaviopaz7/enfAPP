import React from 'react';
import './Gotero.css'; 

const ResultadoGotero = ({ results, dropCount }) => {
  const volumeUnitMap = {
    liters: 'litros',
    milliliters: 'mililitros',
  };

  const timeUnitMap = {
    hours: 'horas',
    minutes: 'minutos',
  };

  const volumeUnit = volumeUnitMap[results.volumeUnit] || results.volumeUnit;
  const timeUnit = timeUnitMap[results.timeUnit] || results.timeUnit;
  return (
    <div className="resultado-container">
      <p className="tipo-gotero">Tipo de Gotero: {results.goteroType}</p>
      <p>Volumen: {results.volume} {volumeUnit}</p>
      <p>Tiempo: {results.time} {timeUnit}</p>
      <p>Gotas por minuto: {results.dropsPerMinute}</p>
      <p>Gotas cayendo: {dropCount}</p>
    </div>
  );
};

export default ResultadoGotero;
