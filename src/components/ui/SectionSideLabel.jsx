import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import { useInView } from 'framer-motion';
import './SectionSideLabel.css';

export const SectionSideLabel = ({ number, title, id, animatedLogo }) => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "0px 0px -100px 0px" });

  useEffect(() => {
    if (animatedLogo && isInView && logoRef.current && containerRef.current) {
      // Calculate target translation based on container width
      const containerWidth = containerRef.current.offsetWidth || 300;
      const logoWidth = logoRef.current.offsetWidth || 40;
      const targetX = Math.max(50, containerWidth - logoWidth - 30); // 30px safety margin

      animate(logoRef.current, {
        x: {
          to: `${targetX}px`,
          ease: 'outCubic',
        },
        rotate: {
          to: '.75turn',
          ease: 'inOutQuad'
        },
        opacity: {
          to: 0.8, // Slightly semi-transparent so it looks integrated
          ease: 'linear'
        },
        duration: 2500
      });
    }
  }, [isInView, animatedLogo]);

  const logoSrc = `${import.meta.env.BASE_URL || '/'}ZINELOGO/Zine-Logo-Modelo-no-elements-removebg-preview.png`;

  return (
    <h2 id={id} ref={containerRef} className="section-side-label-wrapper" style={{ position: 'relative' }}>
      {animatedLogo && (
        <img 
          ref={logoRef}
          src={logoSrc}
          alt="Zine Logo"
          style={{ 
            height: '1.2em', // Slightly larger than text
            position: 'absolute',
            left: '0px',
            top: '-0.1em', // Center vertically with text
            opacity: 0,
            pointerEvents: 'none' // Don't block clicks
          }}
        />
      )}
      <span className="section-label-number" style={{ position: 'relative', zIndex: 2 }}>{number}.</span>
      <span className="section-label-text" style={{ position: 'relative', zIndex: 2 }}>{title}</span>
    </h2>
  );
};
