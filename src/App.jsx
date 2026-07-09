import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  ChevronUp,
  Guitar,
  Crown,
  BusFront,
  AudioWaveform,
  Drum,
  Zap,
  Coffee,
  Menu,
  X,
  Globe
} from 'lucide-react';
import { Floating3DWrapper } from './components/ui/3d-card';
import { BuyMeCoffeeCard } from './components/ui/buy-me-coffee-card';
import { PixCard } from './components/ui/PixCard';
import { AboutMeSection } from './components/ui/AboutMeSection';
import { GeddyEasterEgg } from './components/ui/GeddyEasterEgg';
import { GeddyEasterEggV2 } from './components/ui/GeddyEasterEggV2';
import { CardCarousel } from './components/ui/CardCarousel';
import { translations } from './translations.jsx';
import { BigMoneyCard } from './components/ui/BigMoneyCard';
import { EditorialSection } from './components/ui/EditorialSection';
import { BlahahaSection } from './components/ui/BlahahaSection';
import { SectionSideLabel } from './components/ui/SectionSideLabel';
import './index.css';
import './hero.css';

const highlightText = (text) => {
  if (typeof text !== 'string') return text;
  const regex = /\b(Geddy Lee|Geddy|Lee|Ged|Big Beautiful Book of Bass|My Effin' Life|Rush)\b|("Working Man"|Working Man)/g;
  const parts = text.split(regex);
  return parts.map((part, i) => {
    if (/^(Geddy Lee|Geddy|Lee|Ged|Big Beautiful Book of Bass|My Effin' Life)$/.test(part)) {
      return <span key={i} className="geddy-highlight">{part}</span>;
    }
    if (/^(Rush|"Working Man"|Working Man)$/.test(part)) {
      return <span key={i} className="rush-highlight">{part}</span>;
    }
    return part;
  });
};

const highlightHeroText = (text) => {
  if (typeof text !== 'string') return text;
  const regex = /(Geddy Lee|Rick Beato|Anika Nilles|Alex Lifeson|Rush)/gi;
  const parts = text.split(regex);
  return parts.map((part, i) => {
    const lower = part.toLowerCase();
    if (lower === 'rush') {
      return <span key={i} className="hero-highlight-rush">RUSH</span>;
    }
    if (lower === 'geddy lee' || lower === 'anika nilles' || lower === 'alex lifeson') {
      return <span key={i} className="hero-highlight-yellow">{part}</span>;
    }
    if (lower === 'rick beato') {
      return <span key={i} className="hero-highlight-blue">{part}</span>;
    }
    return part;
  });
};

const CustomCrown = ({ size = 24, color = "currentColor", strokeWidth = 2, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4 20h16" />
    <path d="M4 17 V6 l4 8 4-8 4 8 4-8 v11 Z" />
  </svg>
);

const getTopics = (t) => [
  {
    id: 't1',
    badge: '01',
    title: t.t1Title,
    category: 'criacao',
    icon: <img src={`${import.meta.env.BASE_URL}imgi_3_rush-bass-icon.png`} alt="Rush Logo" className="custom-rush-icon" />,
    videoStart: 18,
    summary: t.t1Summary,
    detail: t.t1Detail,
  },
  {
    id: 't2',
    badge: '02',
    title: t.t2Title,
    category: 'equipamento',
    icon: <img src={`${import.meta.env.BASE_URL}2 herois do baixo Rush - Yes Cream The Who.jpg`} alt="Heróis do Baixo" className="t2-custom-icon" />,
    videoStart: 167,
    summary: t.t2Summary,
    detail: t.t2Detail,
  },
  {
    id: 't3',
    badge: '03',
    title: t.t3Title,
    category: 'equipamento',
    icon: <img src={`${import.meta.env.BASE_URL}2button-baixo-azul-esquisito-drop-bass.png`} alt="Baixo Azul Esquisito" className="t2-custom-icon" />,
    videoStart: 438,
    summary: t.t3Summary,
    detail: t.t3Detail,
  },
  {
    id: 't4',
    badge: '04',
    title: t.t4Title,
    category: 'turne',
    icon: <img src={`${import.meta.env.BASE_URL}4-button-r50-rush-fifthysomething.png`} alt="Turnê Fifty Something" className="t2-custom-icon" />,
    videoStart: 524,
    summary: t.t4Summary,
    detail: t.t4Detail,
  },
  {
    id: 't5',
    badge: '05',
    title: t.t5Title,
    category: 'criacao',
    icon: <img src={`${import.meta.env.BASE_URL}criacao-musicas.png`} alt="Criação das Músicas" className="t2-custom-icon" />,
    videoStart: 670,
    summary: t.t5Summary,
    detail: t.t5Detail,
  },
  {
    id: 't7',
    badge: '06',
    title: t.t7Title,
    category: 'bastidores',
    icon: <img src={`${import.meta.env.BASE_URL}6-button- Alex Lifeson.png`} alt="Alex Lifeson Aparece de Supetão" className="t2-custom-icon" />,
    videoStart: 2707,
    summary: t.t7Summary,
    detail: t.t7Detail,
  },
  {
    id: 't6',
    badge: '07',
    title: t.t6Title,
    category: 'turne',
    icon: <img src={`${import.meta.env.BASE_URL}7-button-anikanilles-.png`} alt="Anika Nilles Logo" className="t2-custom-icon" />,
    videoStart: 3527,
    summary: t.t6Summary,
    detail: t.t6Detail,
  }
];

const HolographicImage = ({ src, alt }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // The divisor controls the intensity of the 3D rotation
    const rotateX = (centerY - y) / 15;
    const rotateY = (x - centerX) / 15;

    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
    card.style.setProperty('--bg-x', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--bg-y', `${(y / rect.height) * 100}%`);
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    card.style.setProperty('--bg-x', '50%');
    card.style.setProperty('--bg-y', '50%');
  };

  return (
    <div
      className="holographic-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="holographic-card" ref={cardRef}>
        <img src={src} alt={alt} />
        <div className="holo-glow"></div>
        <div className="holo-glare"></div>
      </div>
    </div>
  );
};

const App = () => {
  const [language, setLanguage] = useState('pt');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [expandedTopic, setExpandedTopic] = useState(null);
  const [videoStart, setVideoStart] = useState(null);
  const [isEasterEggActive, setIsEasterEggActive] = useState(false);
  const [isGershonActive, setIsGershonActive] = useState(false);
  const clickSequence = useRef([]);

  const anikaRef = useRef(null);
  const isAnikaInView = useInView(anikaRef, { once: true, margin: "400px 0px" });

  const footerRef = useRef(null);
  const isFooterInView = useInView(footerRef, { once: true, margin: "400px 0px" });

  const t = translations[language];
  const topics = getTopics(t);

  const handleCardClick = (topic, event) => {
    // Record click history for Easter Egg
    const newSequence = [...clickSequence.current, topic.id].slice(-4);
    clickSequence.current = newSequence;

    // Check sequence: t2 -> t1 -> t1 -> t2
    if (newSequence.join(',') === 't2,t1,t1,t2') {
      setIsEasterEggActive(true);
    } else if (isEasterEggActive) {
      setIsEasterEggActive(false);
    }

    const isClosing = expandedTopic === topic.id;
    
    if (isClosing && event) {
      const cardElement = event.currentTarget;
      const y = cardElement.getBoundingClientRect().top + window.scrollY - 120;
      
      window.scrollTo({ top: y, behavior: 'smooth' });
      
      setTimeout(() => {
        window.scrollTo({ top: y, behavior: 'smooth' });
      }, 350);
    }
    
    setExpandedTopic(isClosing ? null : topic.id);
    if (!isClosing) {
      setVideoStart(topic.videoStart);
    }
  };

  const videoSrc = isGershonActive
    ? 'https://www.youtube.com/embed/8WYWcGOGwog?autoplay=1'
    : (isEasterEggActive
      ? 'https://www.youtube.com/embed/wk_Dlx6VL6c?autoplay=1&rel=0'
      : (videoStart !== null
        ? `https://www.youtube.com/embed/GLkvbCn3xbw?start=${videoStart}&autoplay=1&rel=0`
        : 'https://www.youtube.com/embed/GLkvbCn3xbw?autoplay=0&showinfo=0&rel=0'));

  return (
    <>
      {/* ===== NAVIGATION ===== */}
      <nav className="navbar">
        <div className="nav-inner">
          <div className="nav-left">
            <button className="nav-icon-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
          
          <div className="nav-center">
            <a href="https://portalrushbrasil.com.br/" target="_blank" rel="noopener noreferrer" className="nav-logo">
              <img src={`${import.meta.env.BASE_URL}logo_portalrush.png`} alt="Portal Rush Brasil" className="nav-logo-img" />
            </a>
          </div>

          <div className="nav-right">
            <div className="language-dropdown-container">
              <button className="nav-icon-btn lang-btn" onClick={() => setIsLangOpen(!isLangOpen)}>
                <img 
                  src={`https://flagcdn.com/${language === 'pt' ? 'br' : language === 'en' ? 'us' : 'es'}.svg`} 
                  width="22" 
                  alt={language} 
                  style={{ borderRadius: '2px', marginRight: '4px' }} 
                />
                <span className="lang-text">{language.toUpperCase()}</span>
              </button>
              <AnimatePresence>
                {isLangOpen && (
                  <motion.div 
                    className="lang-dropdown"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <button className={language === 'pt' ? 'active' : ''} onClick={() => { setLanguage('pt'); setIsLangOpen(false); }} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <img src="https://flagcdn.com/br.svg" width="18" alt="PT" style={{ borderRadius: '2px' }} /> PT
                    </button>
                    <button className={language === 'en' ? 'active' : ''} onClick={() => { setLanguage('en'); setIsLangOpen(false); }} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <img src="https://flagcdn.com/us.svg" width="18" alt="EN" style={{ borderRadius: '2px' }} /> EN
                    </button>
                    <button className={language === 'es' ? 'active' : ''} onClick={() => { setLanguage('es'); setIsLangOpen(false); }} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <img src="https://flagcdn.com/es.svg" width="18" alt="ES" style={{ borderRadius: '2px' }} /> ES
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </nav>

      {/* ===== MOBILE/FULLSCREEN MENU ===== */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="fullscreen-menu"
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <div className="fullscreen-menu-links">
              <a href="#grid" onClick={() => setIsMenuOpen(false)}>1. {language === 'pt' ? 'Capa' : language === 'en' ? 'Cover' : 'Portada'}</a>
              <a href="#editorial" onClick={() => setIsMenuOpen(false)}>2. Editorial</a>
              <a href="#apoio" onClick={() => setIsMenuOpen(false)}>3. {t.navApoie}</a>
              <a href="#conteudos" onClick={() => setIsMenuOpen(false)}>4. 15 Anos de Conteúdos</a>
              <a href="#entrevista" onClick={() => setIsMenuOpen(false)}>5. {t.navAEntrevista}</a>
              <a href="#easter-egg" onClick={() => setIsMenuOpen(false)}>6. Easter Egg</a>
              <a href="#anika" onClick={() => setIsMenuOpen(false)}>7. {t.navONovoCapitulo}</a>
              <a href="#loja" onClick={() => setIsMenuOpen(false)}>8. {language === 'pt' ? 'Camisas do Rush' : language === 'en' ? 'Rush Shirts' : 'Camisetas de Rush'}</a>
              <a href="#blahaha" onClick={() => setIsMenuOpen(false)}>9. BLAH-BLAH-HA!!!</a>
              <a href="#RUSH-16-Anos-Alem-do-Improvavel" onClick={() => setIsMenuOpen(false)}>10. {t.navSobreMim}</a>
              <a href="#livro" onClick={() => setIsMenuOpen(false)}>11. {t.navLivro}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== BACKGROUND IMAGE ===== */}
      <div className="bento-bg">
        <img src={`${import.meta.env.BASE_URL}Fundo_hero.png`} alt="Cenário de Fundo" />
        <div className="bento-bg-overlay"></div>
      </div>

      {/* ===== HERO + DASHBOARD SECTION ===== */}
      <section className="dashboard-section" id="grid">
        <div className="bento-hero" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', zIndex: 10, gap: '2rem', width: '100%' }}>
          <div className="hero-zine-content-stack" style={{ width: '100%', alignItems: 'center' }}>
            <h1 className="hero-zine-header" style={{ alignItems: 'center', textAlign: 'center', width: '100%' }}>
              {/* LOGO OFICIAL (Coruja com Batimento Laranja Lento) */}
              <img 
                src={`${import.meta.env.BASE_URL}logo_portalrush.png`} 
                alt="Portal Rush Brasil Logo" 
                className="hero-main-logo-anim"
              />
              <span className="hero-zine-title">PORTAL RUSH ZINE<span className="hero-title-colon">:</span></span>
              <span className="hero-zine-edition">{t.heroTitle}</span>
            </h1>

            {/* FINAL HORIZONTAL BRANDING (Modelo 1 - Glitch Padrão) */}
            <div className="horizontal-badge-final desktop-only-cover">
              VERSÃO HORI
              <img 
                src={`${import.meta.env.BASE_URL}ZINELOGO/Zine-Logo-Modelo-no-elements.png`} 
                alt="Z" 
                className="img-z" 
              />
              ONTAL
            </div>

            {/* Zine Cover SVG & Flash Mobile Version */}
            <div className="hero-zine-cover" style={{ width: '100%', maxWidth: '1800px', marginTop: '1rem', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.15)' }}>
              
              {/* Desktop SVG Cover */}
              <div className="desktop-only-cover" style={{ position: 'relative' }}>
                <img 
                  src={`${import.meta.env.BASE_URL}0_CAPA_PORTAL_RUSH_ZINE.svg`} 
                  alt="Portal Rush Zine Capa" 
                  style={{ width: '100%', height: 'auto' }} 
                />
              </div>

              {/* Mobile Flash Cover with Dynamic Ribbon */}
              <div className="zine-flash-container mobile-only-cover">
                <div className="flash-badge">
                  <Zap size={14} className="flash-icon" />
                  <span>ZINE FLASH</span>
                </div>
                <img 
                  src={`${import.meta.env.BASE_URL}zine-capa-mobile-clean.png`} 
                  alt="Entrevista Rick Beato e Geddy Lee" 
                  className="zine-flash-bg" 
                />
                <div className="zine-ribbon-wrapper">
                  <div className="zine-ribbon">
                    <span className="dynamic-text">
                      {t.entrevistaRibbon ? (
                        <span dangerouslySetInnerHTML={{ __html: t.entrevistaRibbon }} />
                      ) : (
                        <>RICK BEATO<br />ENTREVISTA<br />GEDDY LEE</>
                      )}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Floating Lightning for Mobile Scroll */}
        <div className="floating-lightning mobile-only-cover">
          <Zap size={24} />
        </div>

        {/* ===== EDITORIAL SECTION (SECOND FOLD) ===== */}
        <div id="editorial" style={{ position: 'relative' }}>
          <SectionSideLabel number="2" title="EDITORIAL" />
          <EditorialSection t={t} language={language} />
        </div>

        {/* ===== SUPPORT SECTION (MOVED UP) ===== */}
        <section className="footer" id="apoio" ref={footerRef} style={{ position: 'relative' }}>
          <SectionSideLabel number="3" title={t.navApoie} />
          {isFooterInView && (
            <video 
              className="footer-video-bg" 
              src={`${import.meta.env.BASE_URL}Banner_Animado_Leve.mp4`} 
              autoPlay 
              loop 
              muted 
              playsInline
            ></video>
          )}
          <div className="footer-video-overlay"></div>

          <div className="footer-content-wrapper" style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: "60px", position: "relative", zIndex: 2 }}>
            <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", justifyContent: "center", width: "100%", maxWidth: "900px" }}>
              <BuyMeCoffeeCard 
                title={<span style={{ fontFamily: "'BeyondTheLightedStage', sans-serif" }}>Quero Pagar um Café para essa Zine</span>}
                description={<span style={{ fontSize: '1.15rem', lineHeight: '1.4', display: 'block', marginTop: '10px', fontFamily: "'BeyondTheLightedStage', sans-serif" }}>Pague um Café para a Gente para termos mais e mais <span style={{ color: '#ff8b54', fontWeight: 'bold' }}>ZINES</span></span>}
                image={`${import.meta.env.BASE_URL}imgi_17_buy-me-a-coffee.png`} 
                coffeeLink="https://buymeacoffee.com/portalrushzine" 
              />
              <PixCard 
                title={<span style={{ fontFamily: "'BeyondTheLightedStage', sans-serif" }}>🇧🇷 <span style={{color: '#009c3b'}}>P</span><span style={{color: '#ffdf00'}}>I</span><span style={{color: '#009c3b'}}>X</span>-<span style={{color: '#ff8b54'}}>ZINE</span></span>}
                description={<span style={{ fontSize: '1.15rem', lineHeight: '1.4', display: 'block', marginTop: '10px', fontFamily: "'BeyondTheLightedStage', sans-serif" }}>Faça um PIX e aumente as edições da <span style={{ color: '#ff8b54', fontWeight: 'bold' }}>ZINE</span> do Portal Rush Brasil.</span>}
                borderColor="#009c3b"
                borderBgColor="#ffdf00"
                accentColor="#009c3b"
                bannerImage={`${import.meta.env.BASE_URL}pix-qrcode.jpeg`} 
                qrImage={`${import.meta.env.BASE_URL}pix-qrcode.jpeg`} 
              />
            </div>

          </div>
        </section>

        {/* ===== 15 ANOS DE CONTEUDOS (MOVED FROM BOTTOM) ===== */}
        <div id="conteudos" style={{ position: 'relative', paddingTop: '4rem' }}>
          <SectionSideLabel number="4" title="15 ANOS DE CONTEÚDOS SOBRE O RUSH" />
          <CardCarousel />
        </div>

        {/* ===== TWO-COLUMN LAYOUT: VIDEO + SIDE PANEL ===== */}
        <div id="entrevista" style={{ scrollMarginTop: '80px', marginTop: '3rem', paddingTop: '4rem', width: '100%', position: 'relative' }}>
          <SectionSideLabel number="5" title="ENTREVISTA: BEATO/GEDDY LEE" />
          <h2 className="interview-section-title" style={{
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontWeight: '900',
            color: '#fffdf6',
            textTransform: 'uppercase',
            textAlign: 'center',
            fontFamily: "'Neue Machina', 'Helvetica Neue', Arial, sans-serif",
            letterSpacing: '0.05em',
            textShadow: '0 4px 15px rgba(0,0,0,0.6)',
            paddingBottom: '14px',
            borderBottom: '4px solid #ff5a36',
            display: 'block',
            maxWidth: '1400px',
            margin: '0 auto 4.5rem auto',
            position: 'relative',
            zIndex: 2
          }}>
            Geddy Lee entrevistado no Rick Beato
          </h2>

          {/* Paper Note: NOTA7 - RUSH.png with overlay text */}
          <div className="interview-note-container">
            <div className="interview-note-paper">
              <img src={`${import.meta.env.BASE_URL}NOTA7 - RUSH.png`} alt="Nota 7 Tópicos" className="note-paper-img" />
              <div className="note-paper-text">
                Destacamos <span className="highlight-seven-badge">7</span> tópicos <br />
                na entrevista com <br />
                Rick Beato
              </div>
            </div>
          </div>

          <div className="hero-main-layout" style={{ paddingTop: '0px' }}>

            {/* LEFT: YOUTUBE VIDEO (DYNAMIC) */}
            <div className="dashboard-video-pane">
              <div className="bento-video">
                <iframe
                  key={videoStart}
                  src={videoSrc}
                  title="Geddy Lee & Alex Lifeson — Rick Beato Interview"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            {/* RIGHT: ALL TOPIC CARDS (THIN HORIZONTAL) + ACCORDION */}
            <aside className="hero-side-panel">
              {topics.map(topic => {
                const isExpanded = expandedTopic === topic.id;
                return (
                  <div key={topic.id} className="accordion-item">
                    <div
                      className={`interactive-topic-card ${isExpanded ? 'card-active' : ''}`}
                      onClick={(e) => handleCardClick(topic, e)}
                    >
                      {/* Collapsed: thin horizontal strip */}
                      <div className="topic-card-row">
                        <div className={`topic-card-icon-wrapper ${(topic.id === 't1' || topic.id === 't2' || topic.id === 't3' || topic.id === 't4' || topic.id === 't5' || topic.id === 't6' || topic.id === 't7') ? 't1-icon-wrapper' : ''}`}>
                          <div className={`topic-card-icon ${(topic.id === 't1' || topic.id === 't2' || topic.id === 't3' || topic.id === 't4' || topic.id === 't5' || topic.id === 't6' || topic.id === 't7') ? 't1-icon' : ''}`}>
                            {topic.icon}
                          </div>
                        </div>
                        <h4 className="topic-card-title">{topic.title}</h4>
                        <div className="topic-card-number-wrapper">
                          <span className="topic-card-badge">{topic.badge}</span>
                        </div>
                      </div>

                      {/* Expanded accordion content */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            className="accordion-content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="accordion-inner">
                              <p className="topic-card-summary-expanded">{highlightText(topic.summary)}</p>
                              <div className="accordion-divider"></div>
                              {topic.detail.split('\n\n').map((paragraph, index) => (
                                <p key={index}>{highlightText(paragraph)}</p>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {isExpanded && (
                        <span className="accordion-collapse-hint">
                          <ChevronUp size={14} /> {t.collapseHint}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </aside>

          </div>
        </div>



      </section>

      {/* ===== INTERACTIVE SCULPTURE EASTER EGG ===== */}
      <div id="easter-egg" style={{ position: 'relative' }}>
        <SectionSideLabel number="6" title="EASTER EGG" />
        <GeddyEasterEgg 
          onSuccess={() => {
            setIsGershonActive(true);
            document.getElementById('grid')?.scrollIntoView({ behavior: 'smooth' });
          }} 
          t={t} 
        />
      </div>

      <div id="easter-egg-v2" style={{ position: 'relative', marginTop: '4rem' }}>
        <SectionSideLabel number="6b" title="EASTER EGG (CAIXA DE AREIA)" />
        <h2 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
            fontWeight: '900',
            color: '#fffdf6',
            textAlign: 'center',
            fontFamily: "'Bebas Neue Pro', 'Impact', sans-serif",
            letterSpacing: '0.05em',
            marginBottom: '2rem'
          }}>
            TESTE: CAIXA DE AREIA
        </h2>
        <GeddyEasterEggV2 
          onSuccess={() => {
            console.log('Easter Egg V2 solved!');
          }} 
          t={t} 
        />
      </div>

      {/* ===== ANIKA NILLES SECTION (DW DRUMS STYLE) ===== */}
      <section className="anika-dw-section" id="anika" ref={anikaRef} style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#111' }}>
        <SectionSideLabel number="7" title={t.navONovoCapitulo} />
        {/* Video Background Mask */}
        <div className="anika-video-mask">
          {isAnikaInView && (
            <video autoPlay loop muted playsInline className="anika-bg-video">
              <source src={`${import.meta.env.BASE_URL}anika-bg-video.mp4`} type="video/mp4" />
            </video>
          )}
          <div className="anika-video-overlay"></div>
        </div>

        {/* Top Hero Banner */}
        <div className="anika-dw-banner split-layout" style={{ position: 'relative', zIndex: 2 }}>
          <div className="anika-banner-content">
            <h2>{t.anikaHeroTitle}</h2>
            <p>{t.anikaHeroP1}</p>
            <a href="https://portalrushbrasil.com.br/anika-nilles/sobre-anika-nilles-baterista-do-rush/?utm_source=rick_beato_lp&utm_medium=website&utm_campaign=anika_nilles" target="_blank" rel="noopener noreferrer" className="btn-cta" style={{ display: 'inline-block', marginTop: '1.5rem', textDecoration: 'none', textAlign: 'center' }}>
              {t.anikaHeroBtn}
            </a>
          </div>
          <div className="anika-banner-image-container">
            <a href="https://portalrushbrasil.com.br/anika-nilles/sobre-anika-nilles-baterista-do-rush/?utm_source=rick_beato_lp&utm_medium=website&utm_campaign=anika_nilles" target="_blank" rel="noopener noreferrer" style={{display: 'block', height: '100%'}}>
              <HolographicImage
                src={`${import.meta.env.BASE_URL}incompleto-Sobre-Anika-Nilles-about-story.jpg`}
                alt="Anika Nilles"
              />
            </a>
          </div>
        </div>

        {/* Bottom Collection Grid (HIDDEN BACKUP) */}
        {false && (
          <div className="anika-dw-grid-section" style={{ position: 'relative', overflow: 'hidden' }}>
            <div className="anika-grid-header" style={{ position: 'relative', zIndex: 2 }}>
              <h3>{t.anikaGridTitle}</h3>
              <p>{t.anikaGridSubtitle}</p>
            </div>

            <div className="anika-dw-grid" style={{ position: 'relative', zIndex: 2 }}>
              <div className="anika-dw-card">
                <Floating3DWrapper className="anika-card-img-wrapper">
                  <img src={`${import.meta.env.BASE_URL}anika_prato.png`} alt="Técnica Rítmica - Anika Nilles" style={{ objectPosition: 'top' }} />
                </Floating3DWrapper>
                <span className="anika-card-label">{t.anikaLabel1}</span>
              </div>
              <div className="anika-dw-card">
                <Floating3DWrapper className="anika-card-img-wrapper">
                  <img src={`${import.meta.env.BASE_URL}anika_ensaio_intenso.png`} alt="Ensaios Intensos - Anika Nilles" />
                </Floating3DWrapper>
                <span className="anika-card-label">{t.anikaLabel2}</span>
              </div>
              <div className="anika-dw-card">
                <Floating3DWrapper className="anika-card-img-wrapper">
                  <img src={`${import.meta.env.BASE_URL}trio_pb.png`} alt="Novo Setlist - Geddy, Alex e Anika" />
                </Floating3DWrapper>
                <span className="anika-card-label">{t.anikaLabel3}</span>
              </div>
              <div className="anika-dw-card">
                <Floating3DWrapper className="anika-card-img-wrapper">
                  <img src={`${import.meta.env.BASE_URL}anika_energia.png`} alt="Energia Contagiante - Anika Nilles" />
                </Floating3DWrapper>
                <span className="anika-card-label">{t.anikaLabel4}</span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ===== CAMISAS DO RUSH (BANNERS MOVED FROM TOP) ===== */}
      <div id="loja" style={{ position: 'relative', padding: '6rem 24px', backgroundColor: '#111' }}>
        <SectionSideLabel number="8" title={language === 'pt' ? 'CAMISAS DO RUSH' : language === 'en' ? 'RUSH SHIRTS' : 'CAMISETAS DE RUSH'} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="footer-banners-container">
            {[
              { num: 1, href: 'https://www.camisasdorush.com.br/colecoes/geddy-lee/' },
              { num: 2, href: 'https://www.camisasdorush.com.br/colecoes/neil-peart/' },
              { num: 3, href: 'https://www.camisasdorush.com.br/colecoes/alex-lifeson/' },
              { num: 4, href: 'https://www.camisasdorush.com.br/colecoes/albuns/' },
              { num: 5, href: 'https://www.camisasdorush.com.br/colecoes/minimalista/' },
            ].map(({ num, href }) => (
              <a href={href} target="_blank" rel="noopener noreferrer" key={num} className="footer-banner-link"
                onMouseEnter={(e) => { e.currentTarget.querySelector('img').style.transform = 'scale(1.05)'; }}
                onMouseLeave={(e) => { e.currentTarget.querySelector('img').style.transform = 'scale(1)'; }}
              >
                <img src={`${import.meta.env.BASE_URL}banner-${num}.webp`} alt={`Coleção ${num}`} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ===== BLAH BLAH BLAH HUMOR SECTION ===== */}
      <div style={{ position: 'relative' }}>
        <SectionSideLabel number="9" title="BLAH-BLAH-HA!!!" />
        <BlahahaSection t={t} language={language} />
      </div>

      {/* ===== SOBRE MIM SECTION (4TH FOLD) ===== */}
      <div style={{ position: 'relative' }}>
        <SectionSideLabel number="10" title={t.navSobreMim} />
        <AboutMeSection t={t} />
      </div>

      {/* ===== CONTEXTUAL BOOK BANNER (MOVED DOWN) ===== */}
      <section className="bento-hero" id="livro" style={{ minHeight: 'auto', padding: '0 5% 4rem 5%', display: 'flex', justifyContent: 'center', position: 'relative' }}>
        <SectionSideLabel number="11" title={t.navLivro} />
        <div className="bento-grid-footer" style={{ marginTop: 0, width: '100%', maxWidth: '1200px' }}>
          <a 
            href="https://www.belasletras.com.br/loja/busca.php?loja=1194178&palavra_busca=My+Effin+Life" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bento-card bento-cta bento-card-purple book-banner-layout"
            style={{ textDecoration: 'none', cursor: 'pointer' }}
          >
            <div className="book-banner-content">
              <span className="card-badge">{t.bonusBadge}</span>
              <h3 className="card-title">{t.bonusTitle}</h3>
              <p className="card-text">
                {t.bonusText1}<strong>"My Effin' Life"</strong>. {t.bonusText2}<strong>Editora Belas Letras</strong>.
              </p>
              <div className="btn-cta-large">
                {t.bonusBtn}
              </div>
            </div>
            <div className="book-banner-image">
              <img src={`${import.meta.env.BASE_URL}livrosemfundo.png`} alt="Livro My Effin' Life" className="book-image-transparent" />
            </div>
          </a>
        </div>
      </section>



      {/* ===== FOOTER SECTION ===== */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <h3>Portal Rush Brasil</h3>
              <p>{t.footerBrandDesc}</p>
            </div>
            <div className="footer-links">
              <h4>{t.footerExplore}</h4>
              <ul>
                <li><a href="#grid">{t.navAEntrevista}</a></li>
                <li><a href="#anika">{t.navONovoCapitulo}</a></li>
                <li><a href="#RUSH-16-Anos-Alem-do-Improvavel">{t.navSobreMim}</a></li>
                <li><a href="#livro">{t.navLivro}</a></li>
                <li><a href="#apoio">{t.navApoie}</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>{t.footerCopyright}</span>
          </div>
        </div>
      </footer>

      {/* ===== WHATSAPP FLOAT ===== */}
      <a
        href="https://api.whatsapp.com/send?phone=5531972102112&text=Ol%C3%A1%2C%20pessoal%20do%20Portal%20Rush%20Brasil.%20%F0%9F%A6%89%F0%9F%8E%B8%F0%9F%A5%81%F0%9F%8E%B8Cheguei%20aqui%20atrav%C3%A9s%20do%20site%20do%20Portal.%20RUSH%20ON!"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale conosco no WhatsApp"
      >
        <img src={`${import.meta.env.BASE_URL}whatsapp-icon.png`} alt="WhatsApp" loading="lazy" />
      </a>

    </>
  );
};

export default App;
