import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { ArrowRight } from 'lucide-react';
import './EditorialSection.css';

export const EditorialSection = ({ t, language }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  // Editorial Portuguese strings
  const content = {
    pt: {
      tagline: 'Era uma Zine que a gente tanto queria.',
      p1: 'Já tem um bom tempo que buscávamos uma amálgama de conteúdo sobre o Rush que pudesse ser: profundo, pautado na bibliografia da banda, misturado com entretenimento, gamificação, design e histórias de fãs que nenhuma IA com muitos terabytes vai conseguir contar.',
      p1Mobile: 'Buscávamos conteúdo sobre o Rush que unisse bibliografia da banda, entretenimento, gamificação e histórias de fãs impossíveis para a IA.',
      p2: 'Encontramos! Era uma ZINE, uma revista digital que a gente tanto queria. Assim dá tempo (em teste) da gente elaborar, avaliar com a devida profundidade, pesquisar, ir atrás das nossas fontes. ERA Uma ZINE com cara do PORTAL, PÔXA!',
      p3: 'Bem, o feedback e o rico e grande dinheiro dos nossos fãs (e futuros fãs) que vão pautar esse trabalho do Portal Rush Brasil. Veja nossas condições:',
      goals: [
        { value: 'Até $400', label: '1 edição mensal' },
        { value: '$600', label: '2 edições mensais' },
        { value: '$800', label: '3 edições mensais' }
      ]
    },
    en: {
      tagline: 'The Zine we wanted so much.',
      p1: 'For a long time, we were looking for a mix of Rush content that could be: deep, based on the band\'s bibliography, mixed with entertainment, gamification, design, and fan stories that no AI with many terabytes will ever be able to tell.',
      p1Mobile: 'We wanted Rush content blending bibliography, entertainment, gamification, and unique fan stories impossible for AI to replicate.',
      p2: 'We found it! It was a ZINE, a digital magazine we wanted so much. This gives us time (in testing) to elaborate, evaluate with the proper depth, research, and go after our sources. It was a ZINE with the Portal\'s face, boy!',
      p3: 'Well, the feedback and the rich and big money of our fans (and future fans) will guide this work of Portal Rush Brasil. See our goals:',
      goals: [
        { value: 'Up to $400', label: '1 monthly edition' },
        { value: '$600', label: '2 monthly editions' },
        { value: '$800', label: '3 monthly editions' }
      ]
    },
    es: {
      tagline: 'La Zine que tanto queríamos.',
      p1: 'Durante mucho tiempo, buscábamos una mezcla de contenido sobre Rush que pudiera ser: profundo, basado en la bibliografía de la banda, mezclado con entretenimiento, gamificación, diseño e historias de fans que ninguna IA con muitos terabytes podrá contar jamás.',
      p1Mobile: 'Buscábamos contenido de Rush uniendo bibliografía, entretenimiento, gamificación e historias de fans imposibles para la IA.',
      p2: '¡La encontramos! Era uma ZINE, uma revista digital que tanto queríamos. Así nos da tiempo (en prueba) de elaborar, evaluar con la debida profundidad, investigar, ir tras nuestras fuentes. ¡Era una ZINE con la cara de PORTAL, che!',
      p3: 'Bueno, los comentarios y el rico y gran dinero de nossos fans (y futuros fans) guiarán este trabajo de Portal Rush Brasil. Mira nuestras metas:',
      goals: [
        { value: 'Hasta $400', label: '1 edición mensal' },
        { value: '$600', label: '2 ediciones mensuales' },
        { value: '$800', label: '3 ediciones mensuales' }
      ]
    }
  };

  const highlightEditorialText = (textStr) => {
    if (typeof textStr !== 'string') return textStr;
    
    const regex = /(Portal Rush Brasil|RUSH|Rush|Zine|ZINE|Portal|PORTAL)/g;
    const parts = textStr.split(regex);
    
    return parts.map((part, i) => {
      const lower = part.toLowerCase();
      if (part === 'Portal Rush Brasil') {
        return <span key={i} className="highlight-text-portal" style={{ whiteSpace: 'nowrap' }}>{part}</span>;
      }
      if (lower === 'rush') {
        return <span key={i} className="highlight-text-rush">{part}</span>;
      }
      if (lower === 'zine') {
        return <span key={i} className="highlight-text-zine">{part}</span>;
      }
      if (lower === 'portal') {
        return <span key={i} className="highlight-text-portal">{part}</span>;
      }
      return part;
    });
  };

  const handleGoalClick = (idx) => {
    document.getElementById('apoio')?.scrollIntoView({ behavior: 'smooth' });
    
    if (idx === 2) {
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
    }
  };

  const handleMenuClick = (anchorId) => {
    document.getElementById(anchorId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const text = content[language] || content['pt'];

  // Menu items mapped with custom offsets along a Z-path
  const menuItems = [
    {
      id: 3,
      file: '3 Rick Beato Entrevista Geddy Lee.png',
      anchor: 'entrevista',
      title: 'Rick Beato & Geddy Lee',
      page: 'PÁG. 03',
      className: 'sticker-pos-1'
    },
    {
      id: 4,
      file: '4 - Geddy Lee Easter Egg.svg',
      anchor: 'easter-egg',
      title: 'Geddy Lee Easter Egg',
      page: 'PÁG. 04',
      className: 'sticker-pos-2'
    },
    {
      id: 5,
      file: '5- Anika Nilles - A Trajetoria.svg',
      anchor: 'anika',
      title: 'Anika Nilles - Trajetória',
      page: 'PÁG. 05',
      className: 'sticker-pos-3'
    },
    {
      id: 6,
      file: '5.svg',
      anchor: 'anika',
      title: 'Anika Nilles p2',
      page: 'PÁG. 06',
      className: 'sticker-pos-4'
    },
    {
      id: 9,
      file: '9 Alex Lifeson Joke.svg',
      anchor: 'blahaha',
      title: 'Alex Lifeson Humor',
      page: 'PÁG. 09',
      className: 'sticker-pos-5'
    }
  ];

  return (
    <section className="editorial-section-container">
      {/* Confetti Rain Overlay */}
      {showConfetti && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 9999, pointerEvents: 'none' }}>
          <Confetti numberOfPieces={300} recycle={false} />
        </div>
      )}

      {/* Background Poster Frame */}
      <div className="editorial-poster-frame">
        {/* Paper texture overlay */}
        <div className="poster-paper-texture"></div>
        {/* Subtle creases & folds overlay */}
        <div className="poster-creases"></div>

        {/* Brand Name Upper Right */}
        <div className="poster-brand-header">
          <img src={`${import.meta.env.BASE_URL}logo_portalrush.png`} alt="Portal Rush Brasil Logo" className="poster-logo-img" />
          <span>{highlightEditorialText("PORTAL RUSH ZINE")}</span>
        </div>

        {/* Geometric shapes / Swiss layout */}
        <div className="swiss-geometric-bg">
          <div className="trapezoid-shape-1"></div>
          <div className="trapezoid-shape-2"></div>
        </div>

        {/* Scattered Background Stickers Collage */}
        <div className="poster-stickers-collage-bg">
          <img src={`${import.meta.env.BASE_URL}rushstickers/background stickers alpha-total.png`} className="bg-collage-full-img" alt="" />
          <img src={`${import.meta.env.BASE_URL}rushstickers/80-3-signals-dalmata-alpha.png`} className="bg-dalmata-large-bg" alt="" />
        </div>

        {/* Brand Logo Watermark Background (Animated with Framer Motion on view) */}
        <motion.div 
          className="poster-logo-watermark"
          initial={{ opacity: 0, scale: 0.8, rotate: -25 }}
          whileInView={{ opacity: 0.32, scale: 1, rotate: -12 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ type: 'spring', duration: 1.2, bounce: 0.15 }}
        >
          <img src={`${import.meta.env.BASE_URL}Logo_PortalRushBrasil_Branca_SEM_NOME.png`} alt="Watermark Logo" />
        </motion.div>

        {/* Poster Content Grid */}
        <div className="poster-content-layout">
          {/* Left Column: Big Geometric Title (Deconstructed Snakes & Arrows) */}
          <div className="poster-title-col">
            <h2 className="swiss-main-title">
              <span className="letter-span letter-e">E</span>
              <span className="letter-span letter-d">D</span>
              <span className="letter-span letter-i">I</span>
              <br />
              <span className="letter-span letter-t">T</span>
              <span className="letter-span letter-o">O</span>
              <br />
              <span className="letter-span letter-r">R</span>
              <span className="letter-span letter-i2">I</span>
              <span className="letter-span letter-a">A</span>
              <span className="letter-span letter-l">L</span>
            </h2>
            
            {/* Tânios Guitar Image */}
            <div className="editorial-poster-image-container">
              <motion.img 
                src={`${import.meta.env.BASE_URL}tanios_guita_air_acacio.png`} 
                alt="Tânios Acácio tocando air guitar" 
                className="editorial-poster-image"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
              <p className="editorial-image-caption">
                {highlightEditorialText("Tânios Acácio - Criador do Portal Rush Brasil tocando seu primeiro air guitar no show cover do Rush.")}
              </p>
            </div>

            <div className="swiss-edition-badge">
              <span>{language === 'pt' ? 'ED. #01 / JULHO 2026' : language === 'en' ? 'ED. #01 / JULY 2026' : 'ED. #01 / JULIO 2026'}</span>
            </div>
          </div>

          {/* Right Column: Editorial Text */}
          <div className="poster-text-col">
            <div className="editorial-body-wrapper">
              <motion.h3 
                className="editorial-tagline"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 0.5 }}
              >
                "{highlightEditorialText(text.tagline)}"
              </motion.h3>
              
              <div className="editorial-divider"></div>
              
              {/* The Big Money Title (Moved Up) */}
              <motion.h4 
                className="editorial-big-money-title"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.5 }}
                style={{ display: "inline-block", marginTop: "1rem" }}
              >
                {"THE BIG MONEY".split("").map((char, index) => (
                  <motion.span
                    key={index}
                    style={{ display: "inline-block" }}
                    variants={{
                      hidden: { color: "#ff5a36", y: 0 },
                      visible: {
                        color: ["#ff5a36", "#10b981", "#10b981"], // Turns green (money color)
                        y: [0, -8, 0], // slight bounce
                        transition: {
                          duration: 0.6,
                          delay: index * 0.08,
                          ease: "easeInOut",
                          times: [0, 0.4, 1]
                        }
                      }
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.h4>

              {/* Visual Goal/Conditions Grid (Gradated color) */}
              <div className="editorial-goals-grid">
                {text.goals.map((g, idx) => (
                  <motion.div 
                    key={idx} 
                    className={`editorial-goal-card goal-card-${idx}`}
                    whileHover={{ 
                      scale: 1.02, 
                      borderRadius: "8px 8px 8px 8px"
                    }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    onClick={() => handleGoalClick(idx)}
                  >
                    <span className="goal-label" style={{ flex: 1, textAlign: 'left', fontWeight: 'bold' }}>{highlightEditorialText(g.label)}</span>
                    
                    <motion.div
                      animate={{ x: [0, 8, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                      style={{ display: 'flex', alignItems: 'center', opacity: 0.8, padding: '0 10px' }}
                    >
                      <ArrowRight size={24} />
                    </motion.div>

                    <span className="goal-value" style={{ flex: 1, textAlign: 'right' }}>{g.value}</span>
                  </motion.div>
                ))}
              </div>

              <div className="editorial-paragraphs">
                <p className="editorial-highlight-para hide-on-mobile">
                  {highlightEditorialText(text.p1)}
                </p>
                <p className="editorial-highlight-para hide-on-desktop" style={{ display: 'none' }}>
                  {highlightEditorialText(text.p1Mobile)}
                </p>
                <p className="editorial-body-para">
                  {highlightEditorialText(text.p2)}
                </p>
                
                <p className="editorial-conditions-intro">
                  {highlightEditorialText(text.p3)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scrolling Stickers Tape Watermark */}
        <div className="poster-stickers-tape">
          <div className="stickers-tape-track">
            <img src={`${import.meta.env.BASE_URL}PORTAL_RUSH_STICKERS.jpeg`} alt="Stickers 1" className="stickers-img" />
            <img src={`${import.meta.env.BASE_URL}PORTAL_RUSH_STICKERS.jpeg`} alt="Stickers 2" className="stickers-img" />
          </div>
        </div>

        {/* Animated Infographic SVGs Section - Z-Track Layout */}
        <div className="infographic-section-wrapper" style={{ position: 'relative' }}>
          
          {/* Vertical Continuity Arrow (Minimalist & Fading) */}
          <div className="vertical-continuity-arrow" style={{ position: 'absolute', top: '-60px', bottom: '-40px', right: '5%', width: '100px', zIndex: -1, pointerEvents: 'none' }}>
            <svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="arrowGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ff5a36" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#ff5a36" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
                </linearGradient>
              </defs>
              
              {/* Very smooth, subtle curved line */}
              <path 
                d="M 20 0 C 80 30, 80 70, 20 100" 
                stroke="url(#arrowGradient)" 
                strokeWidth="2"
                strokeDasharray="4 6"
                vectorEffect="non-scaling-stroke"
                fill="none" 
              />
            </svg>
            {/* Elegant but larger white arrowhead pointing to Section 3 */}
            <svg width="40" height="30" viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', bottom: '-20px', left: '0px' }}>
              <path d="M 5 0 L 20 20 L 35 0" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div className="infographic-row-title" style={{ position: 'relative', zIndex: 1 }}>
            <span>{language === 'pt' ? 'MENU INTERATIVO DA ZINE' : language === 'en' ? 'INTERACTIVE ZINE MENU' : 'MENÚ INTERACTIVO DE LA ZINE'}</span>
          </div>
          
          <div className="z-track-wrapper">
            {/* The SVG Z-Track Line */}
            <svg className="z-track-svg" viewBox="0 0 1000 650" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* White offset shadow line */}
              <path 
                d="M 80 93 L 920 93 L 80 573 L 920 573" 
                stroke="#fffdf6" 
                strokeWidth="14" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="z-track-shadow-line"
              />
              {/* Main orange track line */}
              <path 
                d="M 80 90 L 920 90 L 80 570 L 920 570" 
                stroke="#ff5a36" 
                strokeWidth="14" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeDasharray="24 18"
                className="z-track-line"
              />
            </svg>

            {/* Stickers Container positioned along the Z */}
            <div className="z-stickers-container">
              {menuItems.map((item, idx) => (
                <div 
                  key={item.id + '-' + idx} 
                  className={`sticker-menu-item ${item.className}`}
                  onClick={() => handleMenuClick(item.anchor)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {/* Digital Magazine Style Tooltip Card */}
                  {hoveredItem === item.id && (
                    <div className="sticker-tooltip-card">
                      <span className="tooltip-page">{item.page}</span>
                      <span className="tooltip-title">{item.title}</span>
                      <span className="tooltip-action">CLIQUE PARA LER</span>
                    </div>
                  )}

                  <img 
                    src={`${import.meta.env.BASE_URL}INFOGRAFICO MENU ZINE/${item.file}`} 
                    alt={item.title} 
                    className="sticker-menu-img"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
