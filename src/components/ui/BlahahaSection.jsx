import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './BlahahaSection.css';

// 3D Poster Card Component with Pop-out Effect on scroll
const Blahaha3DPoster = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Calculate transforms based on scroll progress
  const baseScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  const baseRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [12, 0, -12]);
  const baseRotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-8, 0, 8]);

  const overlayScale = useTransform(scrollYProgress, [0.15, 0.45, 0.8], [0.95, 1.15, 1.02]);
  const overlayTranslateZ = useTransform(scrollYProgress, [0.15, 0.45, 0.8], [0, 90, 30]);
  const overlayOpacity = useTransform(scrollYProgress, [0.15, 0.35, 0.65, 0.8], [0, 1, 1, 0]);
  const overlayY = useTransform(scrollYProgress, [0, 1], [-25, 25]);

  return (
    <div className="poster-3d-wrapper" ref={containerRef} style={{ perspective: '1200px' }}>
      <motion.div 
        className="poster-3d-card"
        style={{
          scale: baseScale,
          rotateX: baseRotateX,
          rotateY: baseRotateY,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Base Layer: Poster without text/elements */}
        <img 
          src={`${import.meta.env.BASE_URL}Blahaha/Dallas Show/debbie-poster-no-elements.jpeg`} 
          alt="Geddy Does Dallas Base Poster" 
          className="poster-layer base-layer"
        />

        {/* Overlay Layer: Full poster with elements popping out */}
        <motion.img 
          src={`${import.meta.env.BASE_URL}Blahaha/Dallas Show/Debbiedoesdallas.jpg`} 
          alt="Geddy Does Dallas Full Poster" 
          className="poster-layer overlay-layer"
          style={{
            scale: overlayScale,
            z: overlayTranslateZ,
            opacity: overlayOpacity,
            y: overlayY,
            transformStyle: 'preserve-3d',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }}
        />
      </motion.div>
    </div>
  );
};

export const BlahahaSection = ({ t, language }) => {
  const content = {
    pt: {
      title: 'BLAH-BLAH-HA!!!',
      subtitle: 'AH Não!!! Explicamos as piadas de Alex (e de Geddy Lee) em Dallas',
      explanationTitle: 'Explicando as Piadas',
      explanationBody: 'Alex prepara o terreno para uma piada pornográfica local, dizendo que estava tomando banho, e logo em seguida faz um trocadilho com o nome de um filme pornô dos anos 70 gravado em Dallas chamado “Debbie Does Dallas”. Ao invés de “Debbie”, Alex provoca com a rima “Geddy”. O baixista do Rush entra na brincadeira com a piada de salsicha pelo seu personagem Gershon que na verdade é seu nome de batismo.'
    },
    en: {
      title: 'BLAH-BLAH-HA!!!',
      subtitle: 'Oh No, we explain Alex\'s (and Geddy Lee\'s) jokes in Dallas',
      explanationTitle: 'Explaining the Jokes',
      explanationBody: 'Alex sets the stage for a local adult film joke, mentioning that he was showering, and immediately after makes a pun on the name of a famous 70s adult film based in Dallas called "Debbie Does Dallas". Instead of "Debbie", Alex provokes with the rhyming name "Geddy". The Rush bassist joins the fun with a sausage joke related to his character Gershon, which is actually his birth name.'
    },
    es: {
      title: 'BLAH-BLAH-HA!!!',
      subtitle: '¡Ah no, explicamos los chistes de Alex (y de Geddy Lee) en Dallas',
      explanationTitle: 'Explicando los Chistes',
      explanationBody: 'Alex prepara el terreno para un chiste local de cine para adultos, diciendo que se estaba bañando, y enseguida hace un juego de palabras con el nombre de una famosa película de los 70 rodada en Dallas llamada "Debbie Does Dallas". En lugar de "Debbie", Alex provoca con la rima "Geddy". El bajista de Rush se une al juego con un chiste de salchicha relacionado con su personaje Gershon, que en realidad es su nombre de pila.'
    }
  };

  const text = content[language] || content['pt'];

  // Staggered dialogue entries
  const dialogue = [
    { speaker: 'Ged', text: 'Essa música é tão divertida!', side: 'left' },
    { speaker: 'Alex', text: 'Ah, é mesmo?! Não sei se é tão divertida.', side: 'right' },
    { speaker: 'Ged', text: 'Você já conhecem meu amigo?', side: 'left' },
    { speaker: 'Alex', text: 'Essa música é estranha.', side: 'right' },
    { speaker: 'Ged', text: 'Diga oi para as pessoas.', side: 'left' },
    { speaker: 'Alex', text: 'Ah! “Oi para as pessoas! É tão bom estar neste palco. É mesmo. Com certeza é bem melhor do que ficar à toa num hotel… eu não sabia bem o que fazer. Eu me vestia, me despia, aí depois me vestia, me despia até tomar um banho enquanto eu estava vestido. Eu estava todo ferrado!.. e escovei os dentes, eu acho… na semana passada! … e assisti aquele filme Geddy Does Dallas”\n\n[Público de Dallas vem a baixo].\n\nNão sei se você já viu esse filme?!', side: 'right' },
    { speaker: 'Ged', text: 'Ah esse garotinho é tão sapequinha… uma salsicha sapequinha!', side: 'left' }
  ];

  return (
    <section className="blahaha-section" id="blahaha">
      <div className="blahaha-container">
        {/* Header */}
        <div className="blahaha-header">
          <span className="blahaha-badge">SESSION #09</span>
          <div className="blahaha-title-wrapper">
            <h2 className="blahaha-title">
              {text.title}
              {/* Zine-style cartoon open laughing mouth SVG */}
              <svg className="laughing-mouth-svg" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 20 C20 4, 80 4, 95 20 C85 55, 15 55, 5 20 Z" fill="#fffdf6" stroke="#ff3b30" strokeWidth="5" />
                <path d="M12 22 C25 14, 75 14, 88 22 C80 45, 20 45, 12 22 Z" fill="#ff3b30" />
                <path d="M22 21 C30 25, 70 25, 78 21" stroke="#fffdf6" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </h2>
          </div>
          <p className="blahaha-subtitle">{text.subtitle}</p>
        </div>

        {/* Two-Column Grid */}
        <div className="blahaha-grid">
          
          {/* Left Column: Just the Instagram Embed */}
          <div className="blahaha-left-column">
            <div className="instagram-embed-wrapper">
              <iframe 
                src="https://www.instagram.com/p/DaJXpvhh7OW/embed" 
                width="100%" 
                height="480" 
                frameBorder="0" 
                scrolling="no" 
                allowtransparency="true" 
                allow="encrypted-media"
                title="Alex Lifeson Instagram Joke"
                className="instagram-iframe"
              ></iframe>
            </div>
            {/* 3D Pop-out Poster */}
            <Blahaha3DPoster />
          </div>

          {/* Right Column: Introduction, Explanation BEFORE Dialogue, & Dialogue Logs */}
          <div className="blahaha-right-column">
            <div className="blahaha-intro-text">
              <p className="intro-p1">
                <span className="magazine-drop-cap">
                  {language === 'en' ? 'S' : 'E'}
                </span>
                <span className="intro-lead-in">
                  {language === 'pt' 
                    ? 'm algum lugar que a gente não sabe precisar, ' 
                    : language === 'en' 
                    ? 'omewhere we can\'t point out precisely, ' 
                    : 'n algún lugar que no sabemos precisar, '}
                </span>
                {language === 'pt'
                  ? 'vimos um comentário cirúrgico de um fã: “se o Alex não fosse músico, certamente seria comediante”. De alguma forma esse fã conseguiu pegar o bisturi e cortar a realidade com precisão cirúrgica.'
                  : language === 'en'
                  ? 'we saw a surgical comment from a fan: "if Alex weren\'t a musician, he would certainly be a comedian". Somehow this fan managed to take the scalpel and cut reality with surgical precision.'
                  : 'vimos un comentario quirúrgico de un fan: “si Alex no fuera músico, sin duda sería comediante”. De alguna manera este fan logró tomar el bisturí y cortar la realidad con precisión quirúrgica.'
                }
              </p>
              
              <p className="intro-p2">
                {language === 'pt'
                  ? 'Alex é o melhor nisso, um especialista em fazer os outros rirem, e como não poderia ser diferente, mais uma vez isso ocorreu.'
                  : language === 'en'
                  ? 'Alex is the best at this, a specialist in making others laugh, and as it couldn\'t be different, it happened once again.'
                  : 'Alex es el mejor en esto, un especialista en hacer reír a los demás, y como no podía ser de otra manera, volvió a suceder.'
                }
              </p>
              
              <p className="intro-p3">
                {language === 'pt'
                  ? 'No último show em Dallas (Texas) do dia 26 de junho, na turnê Fifty Something , após terminarem de tocar a espetacular la Vila Strangiatto o baixista e guitarrista do Rush começam a conversar. Obviamente Alex começa a falar um monte de bobagens:'
                  : language === 'en'
                  ? 'At the last show in Dallas (Texas) on June 26th, on the Fifty Something tour, after they finished playing the spectacular La Villa Strangiato, Rush\'s bassist and guitarist start talking. Obviously Alex starts talking a lot of nonsense:'
                  : 'En el último show en Dallas (Texas) del 26 de junio, na gira Fifty Something, luego de terminar de tocar la espectacular La Villa Strangiato, el bajista y el guitarrista de Rush comienzan a conversar. Obviamente Alex empieza a decir muchas tonterías:'
                }
              </p>
            </div>

            {/* Explanation card (Moved BEFORE the dialogue chat container) */}
            <div className="blahaha-explanation-card">
              <span className="explanation-title">{text.explanationTitle}</span>
              <p className="explanation-body">{text.explanationBody}</p>
            </div>

            {/* Dialogue chat bubbles */}
            <div className="dialogue-chat-container">
              {dialogue.map((item, idx) => {
                const isGed = item.speaker === 'Ged';
                const isLast = idx === dialogue.length - 1;
                
                // Add bubble-sausage class to the last sausage entry
                let bubbleClass = `dialogue-bubble ${isGed ? 'bubble-ged' : 'bubble-alex'}`;
                if (isLast) {
                  bubbleClass = 'dialogue-bubble bubble-sausage';
                }
                
                return (
                  <div 
                    key={idx} 
                    className={bubbleClass}
                  >
                    <span className="bubble-speaker-tag">{item.speaker}</span>
                    <p className="bubble-message-text">
                      {/* Detect stage direction inside brackets */}
                      {item.text.split(/(\[.*?\])/).map((part, pIdx) => {
                        if (part.startsWith('[') && part.endsWith(']')) {
                          return <span key={pIdx} className="stage-direction">{part}</span>;
                        }
                        return part;
                      })}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
