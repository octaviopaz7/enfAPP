// ResultadoGotero.jsx
import React from 'react';

const ResultadoGotero = ({ results, dropCount }) => {
  return (
    <div className="results-container">
      <p>Tipo de Gotero: {results.goteroType}</p>
      <p>Volumen: {results.volume} {results.volumeUnit}</p>
      <p>Tiempo: {results.time} {results.timeUnit}</p>
      <p>Gotas por minuto: {results.dropsPerMinute}</p>
      <p>Gotas cayendo: {dropCount}</p>
    </div>
  );
};

export default ResultadoGotero;
