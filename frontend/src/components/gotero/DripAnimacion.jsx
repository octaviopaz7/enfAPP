import React, { useEffect, useRef } from 'react';
import './Gotero.css';

const DripAnimacion = ({ dropsPerMinute, onDropCountChange, isAnimating }) => {
  const dropRef = useRef(null);
  const animationDuration = 60 / dropsPerMinute; // Calculate animation duration

  useEffect(() => {
    const handleAnimationIteration = () => {
      onDropCountChange();
    };

    if (dropRef.current) {
      if (isAnimating) {
        dropRef.current.style.animation = 'none';
        dropRef.current.offsetHeight; // Trigger reflow
        dropRef.current.style.animation = `drip ${animationDuration}s infinite`;
        dropRef.current.addEventListener('animationiteration', handleAnimationIteration);
      } else {
        dropRef.current.style.animation = 'none';
        dropRef.current.removeEventListener('animationiteration', handleAnimationIteration);
      }
    }

    return () => {
      if (dropRef.current) {
        dropRef.current.removeEventListener('animationiteration', handleAnimationIteration);
      }
    };
  }, [dropsPerMinute, animationDuration, onDropCountChange, isAnimating]);

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
