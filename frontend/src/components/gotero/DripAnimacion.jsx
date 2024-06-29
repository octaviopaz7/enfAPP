import React, { useEffect, useRef } from 'react';
import './Gotero.css';

const DripAnimacion = ({ dropsPerMinute, onDropCountChange, isAnimating }) => {
  const dropRef = useRef(null);
  const animationDuration = 60 / dropsPerMinute; // Calculate animation duration

  useEffect(() => {
    const handleAnimationIteration = () => {
      onDropCountChange(); // Call the callback when animation iteration occurs
    };

    // Function to handle animation setup and cleanup
    const setupAnimation = () => {
      if (dropRef.current) {
        dropRef.current.style.animation = 'none'; // Reset animation to none
        dropRef.current.offsetHeight; // Trigger reflow
        dropRef.current.style.animation = `drip ${animationDuration}s infinite`; // Apply animation with calculated duration
        dropRef.current.addEventListener('animationiteration', handleAnimationIteration); // Add event listener for animation iteration
      }
    };

    if (isAnimating) {
      setupAnimation(); // Setup animation if isAnimating is true
    } else {
      if (dropRef.current) {
        dropRef.current.style.animation = 'none'; // Remove animation if isAnimating is false
        dropRef.current.removeEventListener('animationiteration', handleAnimationIteration); // Remove event listener
      }
    }

    return () => {
      // Cleanup function to remove event listener when component unmounts or dependencies change
      if (dropRef.current) {
        dropRef.current.removeEventListener('animationiteration', handleAnimationIteration);
      }
    };
  }, [dropsPerMinute, animationDuration, isAnimating, onDropCountChange]);

  return (
    <div className="drip-animacion-background">
      <div className="drip-container">
        <div className="drip-body">
          {/* Render the drop element with ref and dynamic animation duration */}
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
