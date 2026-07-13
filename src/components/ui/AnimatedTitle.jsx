import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import './AnimatedTitle.css';

export const AnimatedTitle = () => {
  const containerRef = useRef(null);

  const text = "7 Momentos da Entrevista de Geddy Lee no Rick Beato (imprescindíveis).";

  // Run Focus Blur animation on mount
  useEffect(() => {
    if (containerRef.current) {
      const chars = containerRef.current.querySelectorAll('.animated-char');
      
      // Reset styles
      chars.forEach(el => {
        el.style.transform = 'none';
        el.style.opacity = '0';
        el.style.filter = 'blur(8px)';
      });

      // Efeito: Focus Lens (Blur)
      animate(chars, {
        filter: {
          from: 'blur(8px)',
          to: 'blur(0px)'
        },
        opacity: {
          from: 0,
          to: 1
        },
        delay: (el, i) => i * 20,
        duration: 1000,
        ease: 'outQuad'
      });
    }
  }, []);

  // Split string into structural nodes
  const renderSplitText = () => {
    return text.split(' ').map((word, wordIdx) => {
      const isSeven = word === "7";
      const isImp = word.includes("imprescindíveis");
      
      const wordClass = `animated-word ${isSeven ? 'highlight-seven' : ''} ${isImp ? 'highlight-imp' : ''}`;

      return (
        <span key={wordIdx} className={wordClass}>
          {word.split('').map((char, charIdx) => (
            <span key={charIdx} className="animated-char">
              {char}
            </span>
          ))}
          {/* Add space after word */}
          <span className="animated-space">&nbsp;</span>
        </span>
      );
    });
  };

  return (
    <div className="animated-title-container" style={{ marginBottom: '2rem' }}>
      <h2 ref={containerRef} className="interview-section-title">
        {renderSplitText()}
      </h2>
    </div>
  );
};
