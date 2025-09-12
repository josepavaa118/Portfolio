import React, { useState } from 'react';
import { motion } from 'framer-motion';

import { images } from '../../constants';
import { AppWrap, MotionWrap } from '../../wrapper';
import { TerminalWindow, TerminalPrompt } from '../../components';
import { client } from '../../client';
import './Footer.scss';

const Footer = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { username, email, message } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.message) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);

    const contact = {
      _type: 'contact',
      name: formData.username,
      email: formData.email,
      message: formData.message,
    };

    client.create(contact)
      .then(() => {
        setLoading(false);
        setIsFormSubmitted(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h2 className="head-text">Take a coffee & chat with me</h2>

      {/* Terminal Contact Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="contact-terminal-section"
      >
        <TerminalWindow 
          title="contact.js" 
          variant="contact"
          className="contact-terminal"
        >
          <TerminalPrompt command="echo 'Escuchando ideas y solicitudes de colaboración...'" delay={0.5}>
            <div className="contact-form-output">
              <TerminalPrompt command="echo 'Nombre:'" delay={1}>
                <div className="terminal-input-group">
                  <input 
                    className="terminal-input" 
                    type="text" 
                    placeholder="Tu nombre" 
                    name="username" 
                    value={username} 
                    onChange={handleChangeInput} 
                  />
                  {errors.username && <span className="terminal-error">{errors.username}</span>}
                </div>
              </TerminalPrompt>
              
              <TerminalPrompt command="echo 'Email:'" delay={1.2}>
                <div className="terminal-input-group">
                  <input 
                    className="terminal-input" 
                    type="email" 
                    placeholder="tu@email.com" 
                    name="email" 
                    value={email} 
                    onChange={handleChangeInput} 
                  />
                  {errors.email && <span className="terminal-error">{errors.email}</span>}
                </div>
              </TerminalPrompt>
              
              <TerminalPrompt command="echo 'Mensaje:'" delay={1.4}>
                <div className="terminal-input-group">
                  <textarea 
                    className="terminal-textarea" 
                    placeholder="Tu mensaje aquí..." 
                    name="message" 
                    value={message} 
                    onChange={handleChangeInput}
                  />
                  {errors.message && <span className="terminal-error">{errors.message}</span>}
                </div>
              </TerminalPrompt>
              
              <TerminalPrompt command="echo 'Acciones disponibles:'" delay={1.6}>
                <div className="terminal-actions">
                  <motion.button 
                    className="terminal-button"
                    onClick={handleSubmit}
                    disabled={loading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {!loading ? 'Enviar' : 'Enviando...'}
                  </motion.button>
                  <motion.button 
                    className="terminal-button secondary"
                    onClick={() => window.open('https://github.com', '_blank')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    GitHub
                  </motion.button>
                  <motion.button 
                    className="terminal-button secondary"
                    onClick={() => window.open('https://linkedin.com', '_blank')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    LinkedIn
                  </motion.button>
                </div>
              </TerminalPrompt>
            </div>
          </TerminalPrompt>
        </TerminalWindow>
      </motion.div>

      <div className="app__footer-cards">
        <div className="app__footer-card ">
          <img src={images.email} alt="email" />
          <div>
            <p className="bold-text">email</p>
            <a href="mailto:hello@micael.com" className="p-text">hello@micael.com</a>
          </div>
        </div>
        <div className="app__footer-card">
          <img src={images.mobile} alt="phone" />
          <div>
            <p className="bold-text">phone</p>
            <a href="tel:+1 (123) 456-7890" className="p-text">+1 (123) 456-7890</a>
          </div>
        </div>
      </div>
      
      {isFormSubmitted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="success-message"
        >
          <h3 className="head-text">
            ¡Gracias por contactarme! 🚀
          </h3>
          <p className="p-text">Te responderé pronto.</p>
        </motion.div>
      )}
      
      <div className="copyright">
        <p className='p-text'>@2025 Jose VA</p>
        <p className='p-text'>@2025 All rights and lefts reserved</p>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__whitebg',
);