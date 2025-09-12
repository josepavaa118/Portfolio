import React from 'react';
import { motion } from 'framer-motion';
import './TerminalWindow.scss';

const TerminalWindow = ({ 
  title = "terminal", 
  children, 
  className = "", 
  showDots = true,
  variant = "default" 
}) => {
  return (
    <motion.div 
      className={`terminal-window ${className} terminal-${variant}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {showDots && (
        <div className="terminal-header">
          <div className="terminal-dots">
            <span className="terminal-dot red"></span>
            <span className="terminal-dot yellow"></span>
            <span className="terminal-dot green"></span>
          </div>
          <span className="terminal-title">{title}</span>
        </div>
      )}
      <div className="terminal-content">
        {children}
      </div>
    </motion.div>
  );
};

export default TerminalWindow;

