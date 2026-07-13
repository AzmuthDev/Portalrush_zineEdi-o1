const fs = require('fs');
const file = 'src/App.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Move Entrevista to after Editorial
const entrevistaStart = content.indexOf('{/* ===== TWO-COLUMN LAYOUT: VIDEO + SIDE PANEL ===== */}');
const entrevistaEnd = content.indexOf('\n      </section>', entrevistaStart);
const entrevistaContent = content.substring(entrevistaStart, entrevistaEnd);

content = content.substring(0, entrevistaStart) + content.substring(entrevistaEnd);

const editorialEnd = content.indexOf('{/* ===== SUPPORT SECTION (MOVED UP) ===== */}');
content = content.substring(0, editorialEnd) + entrevistaContent + '\n\n        ' + content.substring(editorialEnd);

// 2. Change section numbers
content = content.replace(
  '<SectionSideLabel number="5" title="ENTREVISTA: BEATO/GEDDY LEE" />',
  '<SectionSideLabel number="3" title="ENTREVISTA: BEATO/GEDDY LEE" />'
);

content = content.replace(
  '<SectionSideLabel number="3" title={t.navApoie} />',
  '<SectionSideLabel number="4" title={t.navApoie} />'
);

content = content.replace(
  '<SectionSideLabel number="4" title="15 ANOS DE CONTEÚDOS SOBRE O RUSH" />',
  '<SectionSideLabel number="5" title="15 ANOS DE CONTEÚDOS SOBRE O RUSH" />'
);

// 3. Update the menu
const oldMenu = `              <a href="#grid" onClick={() => setIsMenuOpen(false)}>1. {language === 'pt' ? 'Capa' : language === 'en' ? 'Cover' : 'Portada'}</a>
              <a href="#editorial" onClick={() => setIsMenuOpen(false)}>2. Editorial</a>
              <a href="#apoio" onClick={() => setIsMenuOpen(false)}>3. {t.navApoie}</a>
              <a href="#conteudos" onClick={() => setIsMenuOpen(false)}>4. 15 Anos de Conteúdos</a>
              <a href="#entrevista" onClick={() => setIsMenuOpen(false)}>5. {t.navAEntrevista}</a>
              <a href="#easter-egg" onClick={() => setIsMenuOpen(false)}>6. Easter Egg</a>`;

const newMenu = `              <a href="#grid" onClick={() => setIsMenuOpen(false)}>1. {language === 'pt' ? 'Capa' : language === 'en' ? 'Cover' : 'Portada'}</a>
              <a href="#editorial" onClick={() => setIsMenuOpen(false)}>2. Editorial</a>
              <a href="#entrevista" onClick={() => setIsMenuOpen(false)}>3. {t.navAEntrevista}</a>
              <a href="#apoio" onClick={() => setIsMenuOpen(false)}>4. {t.navApoie}</a>
              <a href="#conteudos" onClick={() => setIsMenuOpen(false)}>5. 15 Anos de Conteúdos</a>
              <a href="#easter-egg" onClick={() => setIsMenuOpen(false)}>6. Easter Egg</a>`;

content = content.replace(oldMenu, newMenu);

fs.writeFileSync(file, content, 'utf8');
console.log('Done');
