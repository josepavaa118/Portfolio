import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import TypingEffect from './TypingEffect';
import './InteractiveTerminal.scss';

const InteractiveTerminal = ({ 
  commands = [],
  className = "",
  onCommandComplete = () => {},
  autoStart = true,
  delay = 1000
}) => {
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [completedCommands, setCompletedCommands] = useState([]);
  const terminalRef = useRef(null);

  useEffect(() => {
    if (isRunning && currentCommandIndex < commands.length) {
      const command = commands[currentCommandIndex];
      const timeout = setTimeout(() => {
        setCompletedCommands(prev => [...prev, command]);
        setCurrentCommandIndex(prev => prev + 1);
        onCommandComplete(command, currentCommandIndex);
      }, command.delay || delay);

      return () => clearTimeout(timeout);
    } else if (currentCommandIndex >= commands.length) {
      setIsRunning(false);
    }
  }, [currentCommandIndex, commands, isRunning, delay, onCommandComplete]);

  const startTerminal = () => {
    setIsRunning(true);
    setCurrentCommandIndex(0);
    setCompletedCommands([]);
  };

  const resetTerminal = () => {
    setIsRunning(false);
    setCurrentCommandIndex(0);
    setCompletedCommands([]);
  };

  return (
    <div className={`interactive-terminal ${className}`} ref={terminalRef}>
      <div className="terminal-controls">
        <motion.button
          className="terminal-control-btn play"
          onClick={startTerminal}
          disabled={isRunning}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ▶️
        </motion.button>
        <motion.button
          className="terminal-control-btn reset"
          onClick={resetTerminal}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🔄
        </motion.button>
      </div>

      <div className="terminal-output">
        {completedCommands.map((command, index) => (
          <motion.div
            key={index}
            className="terminal-command"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="command-prompt">
              <span className="prompt-symbol">$</span>
              <span className="command-text">{command.command}</span>
            </div>
            {command.output && (
              <div className="command-output">
                {command.typing ? (
                  <TypingEffect
                    text={command.output}
                    speed={command.speed || 30}
                    delay={command.outputDelay || 500}
                    onComplete={() => command.onComplete && command.onComplete()}
                  />
                ) : (
                  <pre>{command.output}</pre>
                )}
              </div>
            )}
          </motion.div>
        ))}

        {isRunning && currentCommandIndex < commands.length && (
          <motion.div
            className="terminal-command current"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="command-prompt">
              <span className="prompt-symbol">$</span>
              <TypingEffect
                text={commands[currentCommandIndex].command}
                speed={50}
                onComplete={() => {
                  // Command typing completed, now show output if any
                }}
              />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default InteractiveTerminal;


