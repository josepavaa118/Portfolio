import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import { CodeBlock, TerminalWindow } from '../../components';
import './About.scss';
import { urlFor, client } from '../../client';

const About = () => {
  const [abouts, setAbouts] = useState([]);

  useEffect(() => {
    const query = '*[_type == "abouts"]';

    client.fetch(query).then((data) => {
      setAbouts(data);
    });
  }, []);

  const developerCode = `const Jose = {
  perfil: "Software Quality Assurance Engineer",
  experiencia: "11 años",
  especialidad: "Automatización de pruebas y QA",
  tecnologias: [
    "JavaScript", "React", "Node.js", 
    "Selenium", "Cypress", "Jest"
  ],
  superpoderes: [
    "🔍 Detección de bugs antes que aparezcan",
    "⚡ Automatización de procesos repetitivos", 
    "🤝 Colaboración efectiva con equipos",
    "📊 Análisis de datos de calidad"
  ],
  mision: "Entregar software de alta calidad que 
          supere las expectativas del usuario."
}

console.log("🚀 Ejecutando perfil:", Jose);`;

  return (
    <>
      <h2 className="head-text">I Know that <span>Good Design</span> <br />means  <span>Good Business</span></h2>

      {/* Developer Code Block */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="about-code-section"
      >
        <CodeBlock 
          code={developerCode}
          language="javascript"
          title="about.js"
          animated={true}
          highlight={true}
          className="about-code-block"
        />
      </motion.div>

      <div className="app__profiles">
        {abouts.map((about, index) => (
          <motion.div
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, type: 'tween' }}
            className="app__profile-item"
            key={about.title + index}
          >
            <img src={urlFor(about.imgUrl).width(300).auto('format').quality(80).url()} alt={about.title} loading="lazy" />
            <h2 className="bold-text">{about.title}</h2>
            {about?.description ? (
              <p
                className="p-text"
                dangerouslySetInnerHTML={{ __html: about.description }}
              />
            ) : null}
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(About, 'app__about'),
  'about',
  'app__whitebg',
);