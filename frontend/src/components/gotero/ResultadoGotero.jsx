import React from 'react';
import './Gotero.css'; // Asegúrate de importar el archivo CSS

const ResultadoGotero = ({ results, dropCount }) => {
  return (
    <div className="resultado-container">
      <p className="tipo-gotero">Tipo de Gotero: {results.goteroType}</p>
      <p>Volumen: {results.volume} {results.volumeUnit}</p>
      <p>Tiempo: {results.time} {results.timeUnit}</p>
      <p>Gotas por minuto: {results.dropsPerMinute}</p>
      <p>Gotas cayendo: {dropCount}</p>
    </div>
  );
};

export default ResultadoGotero;
