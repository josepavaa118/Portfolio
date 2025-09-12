import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import TerminalWindow from './TerminalWindow';
import './CodeBlock.scss';

const CodeBlock = ({ 
  code, 
  language = 'javascript', 
  title = 'code.js',
  showLineNumbers = true,
  animated = false,
  highlight = false,
  showCursor = true,
  className = ""
}) => {
  const [displayedCode, setDisplayedCode] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const codeRef = useRef(null);

  useEffect(() => {
    if (animated) {
      setIsTyping(true);
      let index = 0;
      const timer = setInterval(() => {
        if (index < code.length) {
          setDisplayedCode(code.slice(0, index + 1));
          index++;
        } else {
          // Keep cursor visible after typing ends
          setIsTyping(false);
          clearInterval(timer);
        }
      }, 20);

      return () => clearInterval(timer);
    } else {
      setDisplayedCode(code);
    }
  }, [code, animated]);

  useEffect(() => {
    if (highlight && window.Prism && codeRef.current) {
      try {
        window.Prism.highlightAllUnder(codeRef.current);
      } catch (_) {}
    }
  }, [highlight, displayedCode]);

  return (
    <TerminalWindow 
      title={title} 
      className={`code-block ${className}`}
      variant="code"
    >
      <div className={`code-content ${highlight ? 'prism' : ''}`} ref={codeRef}>
        {highlight ? (
          <pre className={`language-${language} ${showLineNumbers ? 'line-numbers' : ''}`}>
            <code className={`language-${language}`}>
              {displayedCode}
            </code>
            {showCursor && <span className="typing-cursor" />}
          </pre>
        ) : (
          displayedCode.split('\n').map((line, index) => (
            <div key={index} className="terminal-line">
              {showLineNumbers && (
                <span className="line-number">{index + 1}</span>
              )}
              <span className="line-content">{line}</span>
              {showCursor && index === displayedCode.split('\n').length - 1 && (
                <span className="typing-cursor" />
              )}
            </div>
          ))
        )}
      </div>
    </TerminalWindow>
  );
};

export default CodeBlock;
