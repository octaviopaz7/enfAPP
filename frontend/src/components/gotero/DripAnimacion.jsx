import React, { useEffect, useRef } from 'react';
import './Gotero.css';

const DripAnimacion = ({ dropsPerMinute, onDropCountChange }) => {
  const dropRef = useRef(null);
  const animationDuration = 60 / dropsPerMinute; // Calcula la duración de la animación

  useEffect(() => {
    const handleAnimationIteration = () => {
      onDropCountChange();
    };

    if (dropRef.current) {
      dropRef.current.style.animation = 'none';
      dropRef.current.offsetHeight; // Trigger reflow
      dropRef.current.style.animation = `drip ${animationDuration}s infinite`;
    }

    dropRef.current.addEventListener('animationiteration', handleAnimationIteration);

    return () => {
      dropRef.current.removeEventListener('animationiteration', handleAnimationIteration);
    };
  }, [dropsPerMinute, animationDuration, onDropCountChange]);

  return (
    <div className="drip-animacion-background">
      <div className="drip-container">
        <div className="drip-body">
          <div
            ref={dropRef}
            className="drop"
            style={{ animationDuration: `${animationDuration}s` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default DripAnimacion;
