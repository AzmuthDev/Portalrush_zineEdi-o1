import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const formatRushText = (text) => {
  if (typeof text !== 'string') return text;

  const processArray = (arr, regex, render) => {
    return arr.flatMap((item, i) => {
      if (typeof item !== 'string') return [item];
      const parts = item.split(regex);
      return parts.map((part, j) => {
        if (new RegExp('^' + regex.source + '$', 'i').test(part)) {
          return render(part, `${i}-${j}`);
        }
        return part;
      });
    });
  };

  let nodes = [text];

  // 1. Tânios Acácio
  nodes = processArray(nodes, /(Tânios Acácio|Tânios Rush Acácio)/i, (match, key) => <span key={key} className="highlight-tanios">{match}</span>);

  // 2. Portal Rush Brasil (matched first so "Rush" inside it isn't replaced)
  nodes = processArray(nodes, /(Portal Rush Brasil)/i, (match, key) => <span key={key} className="highlight-portal">Portal Rush Brasil</span>);
  
  // 3. Rush in Rio (must happen before "Rush" is parsed)
  nodes = processArray(nodes, /(Rush in Rio)/i, (match, key) => <span key={key} className="highlight-song">{match}</span>);
  
  // 4. RUSH
  nodes = processArray(nodes, /\b(Rush)\b/i, (match, key) => <strong key={key} className="highlight-rush">RUSH</strong>);
  
  // 5. Band Members
  nodes = processArray(nodes, /\b(Geddy Lee|Alex Lifeson|Neil Peart|Geddy|Alex|Neil)\b/i, (match, key) => <span key={key} className="highlight-member">{match}</span>);
  
  // 6. Other Songs/Albums/Tours
  nodes = processArray(nodes, /(YYZ|Working Man|My Effin' Life)/i, (match, key) => <span key={key} className="highlight-song">{match}</span>);

  return nodes;
};



export const AboutMeSection = ({ t }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "400px 0px" });
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.25;
    }
  }, [isInView]);

  return (
    <section id="RUSH-16-Anos-Alem-do-Improvavel" className="about-me-simple-container" ref={containerRef}>
      <div className="about-me-bg-wrapper">
        {isInView && (
          <video 
            ref={videoRef}
            className="about-me-bg-video" 
            src={`${import.meta.env.BASE_URL}Timeline_Snakes_&_Arrows_Leve.mp4`} 
            autoPlay 
            loop 
            muted 
            playsInline
          ></video>
        )}
        <div className="about-me-overlay"></div>
      </div>

      <div className="about-me-content-grid">
        <motion.div 
          className="about-me-image-col"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <img 
            src={`${import.meta.env.BASE_URL}Tanios Rush Acacio - Portal Rush Brasil.png`} 
            alt="Tânios Rush Acácio - Portal Rush" 
            className="about-me-photo"
          />
          
          <a href="https://open.spotify.com/episode/03wWuhH49Z4YNSOryKAX6f?si=298e83d3de544e65" target="_blank" rel="noopener noreferrer" className="premium-spotify-card">
            <div className="spotify-card-blur-bg"></div>
            <div className="spotify-card-content">
              <img src={`${import.meta.env.BASE_URL}SFN - The Rush Cast - Portal Rush Brasil .png`} alt="Podcast Cover" className="spotify-cover-art" />
              <div className="spotify-text-group">
                <span className="spotify-badge"><img src={`${import.meta.env.BASE_URL}Spotify-logo.png`} alt="Spotify Logo" className="spotify-icon-micro" /> A RUSH Fancast</span>
                <h4 className="spotify-title-main">{t.aboutMePodcastMain} <span className="no-break-brand">Portal Rush Brasil</span></h4>
                <p className="spotify-subtitle">{t.aboutMePodcastSub}</p>
              </div>
              <div className="spotify-play-btn">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              </div>
            </div>
          </a>
        </motion.div>

        <motion.div 
          className="about-me-text-col"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="about-me-story-box">
            <h2 className="about-me-title">
              <span className="highlight-rush" style={{ textTransform: 'none' }}>RUSH:</span> <span className="highlight-tanios">{t.aboutMeTitleMain}</span>
            </h2>
            <div className={`about-me-paragraphs ${isExpanded ? 'expanded' : ''}`}>
              {t.aboutMeTexts && t.aboutMeTexts.map((text, index) => (
                <p key={index}>{formatRushText(text)}</p>
              ))}
            </div>
            <button 
              className="about-me-expand-btn" 
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? t.aboutMeCollapse : t.aboutMeExpand}
            </button>
            <div className="about-me-author author">
              <span className="highlight-tanios">Tânios Rush Acácio</span> - <span className="highlight-portal">{t.aboutMeAuthorRole}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
