import React from 'react';
import './Gotero.css'; // Asegúrate de importar el archivo CSS

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
      <h2 className="tipo-gotero">{results.goteroType}</h2>
      <div className="resultado-item">
        <span className="resultado-label">Volumen:</span>
        <span className="resultado-value">{results.volume} {volumeUnit}</span>
      </div>
      <div className="resultado-item">
        <span className="resultado-label">Tiempo:</span>
        <span className="resultado-value">{results.time} {timeUnit}</span>
      </div>
      <div className="resultado-item">
        <span className="resultado-label">Gotas por minuto:</span>
        <span className="resultado-value">{results.dropsPerMinute}</span>
      </div>
      <div className="resultado-item">
        <span className="resultado-label">Gotas cayendo:</span>
        <span className="resultado-value">{dropCount}</span>
      </div>
    </div>
  );
};

export default ResultadoGotero;
