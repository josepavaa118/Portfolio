import React from 'react';
import { motion } from 'framer-motion';
import './TerminalPrompt.scss';

const TerminalPrompt = ({ 
  command, 
  children, 
  className = "",
  animated = false,
  delay = 0
}) => {
  return (
    <motion.div 
      className={`terminal-prompt ${className}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <span className="prompt-symbol">$</span>
      <span className="prompt-text">{command}</span>
      {children && (
        <div className="prompt-output">
          {children}
        </div>
      )}
    </motion.div>
  );
};

export default TerminalPrompt;

