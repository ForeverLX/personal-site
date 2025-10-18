'use client';

import { useEffect, useRef, useState } from 'react';
import { CommandParser } from './CommandParser';
import { CommandRegistry } from './CommandRegistry';
import { TourMode, TourCallbacks } from './TourMode';
import { TERMINAL_CONFIG, TOUR_CONFIG } from '@/lib/constants';
import styles from './Terminal.module.css';
import '@xterm/xterm/css/xterm.css';

export function Terminal() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [tourMode, setTourMode] = useState<TourMode | null>(null);
  const [isTourActive, setIsTourActive] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  // Refs to track tour state in closures (for input handling)
  const tourModeRef = useRef<TourMode | null>(null);
  const isTourActiveRef = useRef<boolean>(false);

  // Check if we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Sync refs with tour state for closure access
  useEffect(() => {
    tourModeRef.current = tourMode;
  }, [tourMode]);

  useEffect(() => {
    isTourActiveRef.current = isTourActive;
  }, [isTourActive]);

  useEffect(() => {
    if (!isClient || !terminalRef.current) return;

    let term: any = null;
    let fitAddon: any = null;
    let mounted = true;

    // Dynamically import xterm.js only on client side
    const initTerminal = async () => {
      const { Terminal: XTerm } = await import('@xterm/xterm');
      const { FitAddon } = await import('@xterm/addon-fit');
      const { WebLinksAddon } = await import('@xterm/addon-web-links');

      if (!mounted || !terminalRef.current) return;

      // Initialize xterm.js with explicit dimensions for consistent rendering
      term = new XTerm({
        cursorBlink: true,
        fontSize: 14,
        fontFamily: 'JetBrains Mono, monospace',
        theme: {
          background: '#0a0a0a',       // Pure black
          foreground: '#e0e0e0',       // Light gray text
          cursor: '#ff0040',           // Site RED
          
          // ANSI colors - RED & PURPLE ONLY (Professional)
          black: '#0a0a0a',            // Pure black
          red: '#ff0040',              // RED - errors, section headers
          green: '#ff0040',            // RED - bullet points
          yellow: '#ff0040',           // RED - warnings, separators
          blue: '#7b2cbf',             // PURPLE - links, paths
          magenta: '#ff0040',          // RED - special text
          cyan: '#7b2cbf',             // PURPLE - prompts, commands
          white: '#e0e0e0',            // Light gray
          
          // Bright variants - same philosophy
          brightBlack: '#4a4a4a',      // Medium gray
          brightRed: '#ff0040',        // RED (no lighter variant)
          brightGreen: '#ff0040',      // RED
          brightYellow: '#ff0040',     // RED
          brightBlue: '#9333ea',       // SLIGHTLY LIGHTER PURPLE
          brightMagenta: '#ff0040',    // RED
          brightCyan: '#9333ea',       // SLIGHTLY LIGHTER PURPLE
          brightWhite: '#ffffff',      // Pure white
        },
        cols: TERMINAL_CONFIG.WIDTH + 25, // Explicit columns for proper text wrapping
        rows: 35,  // Explicit rows for 700px height
      });

      // Add addons
      fitAddon = new FitAddon();
      const webLinksAddon = new WebLinksAddon();
      term.loadAddon(fitAddon);
      term.loadAddon(webLinksAddon);

      // Open terminal first
      term.open(terminalRef.current!);

      // Add keydown event listener to prevent browser default behavior
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          e.stopPropagation();
        }
      };
      
      if (terminalRef.current) {
        terminalRef.current.addEventListener('keydown', handleKeyDown);
      }

      // Fit after a short delay to ensure proper rendering
      setTimeout(() => {
        if (mounted && fitAddon) {
          try {
            fitAddon.fit();
          } catch (e) {
            console.error('Error fitting terminal:', e);
          }
        }
      }, TERMINAL_CONFIG.TYPEWRITER_DELAY);

      // Prompt function
      const prompt = () => {
        if (isTourActive && tourMode) {
          const step = tourMode.getCurrentStep();
          const total = tourMode.getTotalSteps();
          term.write(`\x1b[1;33m[TOUR MODE - Step ${step}/${total}]\x1b[0m \x1b[1;36mtour@darriusgrate.com\x1b[0m:\x1b[1;34m~\x1b[0m$ `);
        } else {
          term.write('\x1b[1;36mvisitor@darriusgrate.com\x1b[0m:\x1b[1;34m~\x1b[0m$ ');
        }
      };

      // Reusable renderPrompt function for tour mode - always shows tour prompt when called
      const renderPrompt = (tourModeInstance?: any) => {
        // If renderPrompt is being called with a tourMode instance, show tour prompt
        if (tourModeInstance) {
          const step = tourModeInstance.getCurrentStep();
          const total = tourModeInstance.getTotalSteps();
          term.write(`\x1b[1;33m[TOUR MODE - Step ${step}/${total}]\x1b[0m \x1b[1;36mtour@darriusgrate.com\x1b[0m:\x1b[1;34m~\x1b[0m$ `);
        } else {
          // Fallback to regular prompt
          term.write('\x1b[1;36mvisitor@darriusgrate.com\x1b[0m:\x1b[1;34m~\x1b[0m$ ');
        }
      };

      // Write content after terminal is open and fitted
      setTimeout(() => {
        if (!mounted || !term) return;
        
        term.writeln('\x1b[1;32mWelcome to Darrius Grate\'s Red Team Portfolio!\x1b[0m');
        term.writeln('');
        term.writeln('Type \x1b[1;31m\'help\'\x1b[0m to see all available commands');
        term.writeln('Type \x1b[1;31m\'about\'\x1b[0m to learn about my 90-day journey');
        term.writeln('');
        
        prompt();

        setIsReady(true);
      }, 150);

      // Handle input (outside setTimeout so it's always available)
      let currentLine = '';
      let tempHistoryIndex = -1;
      let escapeSequence = '';
      
      term.onData((data: string) => {
        const code = data.charCodeAt(0);
        
        // Handle escape sequences (arrow keys)
        if (code === 27) {
          escapeSequence = data;
          console.log('Escape sequence started:', JSON.stringify(data));
          return;
        }
        
        if (escapeSequence) {
          escapeSequence += data;
          console.log('Escape sequence building:', JSON.stringify(escapeSequence));
          
          // Up arrow: \x1b[A or \x1b[1;2A (with modifiers)
          if (escapeSequence === '\x1b[A' || escapeSequence === '\x1b[1;2A' || escapeSequence === '\x1b[1;3A' || escapeSequence === '\x1b[1;4A' || escapeSequence === '\x1b[1;5A') {
            escapeSequence = '';
            const historyLength = commandHistory.length;
            if (historyLength > 0) {
              if (tempHistoryIndex === -1) {
                tempHistoryIndex = historyLength - 1;
              } else if (tempHistoryIndex > 0) {
                tempHistoryIndex--;
              }
              
              // Clear current line
              term.write('\r\x1b[K');
              prompt();
              
              // Write historical command
              const histCmd = commandHistory[tempHistoryIndex];
              term.write(histCmd);
              currentLine = histCmd;
            }
            return;
          }
          
          // Down arrow: \x1b[B or \x1b[1;2B (with modifiers)
          if (escapeSequence === '\x1b[B' || escapeSequence === '\x1b[1;2B' || escapeSequence === '\x1b[1;3B' || escapeSequence === '\x1b[1;4B' || escapeSequence === '\x1b[1;5B') {
            escapeSequence = '';
            const historyLength = commandHistory.length;
            if (historyLength > 0 && tempHistoryIndex !== -1) {
              if (tempHistoryIndex < historyLength - 1) {
                tempHistoryIndex++;
                
                // Clear current line
                term.write('\r\x1b[K');
                prompt();
                
                // Write historical command
                const histCmd = commandHistory[tempHistoryIndex];
                term.write(histCmd);
                currentLine = histCmd;
              } else {
                // At the end, clear line
                tempHistoryIndex = -1;
                term.write('\r\x1b[K');
                prompt();
                currentLine = '';
              }
            }
            return;
          }
          
          // If escape sequence is incomplete, wait for more data
          if (escapeSequence.length < 6) {
            return;
          }
          
          // Unknown escape sequence, clear it
          escapeSequence = '';
          return;
        }

        // Enter key
        if (code === 13) {
          term.writeln('');
          if (currentLine.trim()) {
            // Handle tour mode input first
            if (isTourActiveRef.current && tourModeRef.current) {
              tourModeRef.current.handleInput(currentLine.trim());
            } else {
              // Save command to history
              setCommandHistory(prev => [...prev, currentLine.trim()]);
              tempHistoryIndex = -1;
              setHistoryIndex(-1);
              
              handleCommand(term, currentLine.trim(), prompt, renderPrompt, tourMode, isTourActive, setTourMode, setIsTourActive);
            }
          } else {
            // Handle empty input for tour mode
            if (isTourActiveRef.current && tourModeRef.current) {
              tourModeRef.current.handleInput('');
              // Don't call prompt() - tour handles its own flow
            } else {
              prompt();
            }
          }
          currentLine = '';
        }
        // Tab key (code === 9)
        else if (code === 9) {
          // Get all available commands
          const registry = new CommandRegistry();
          const allCommands = registry.getAllCommands();
          const matches = allCommands.filter(cmd => cmd.startsWith(currentLine));
          
          if (matches.length === 1) {
            // Single match - complete it
            const completion = matches[0].slice(currentLine.length);
            term.write(completion);
            currentLine += completion;
          } else if (matches.length > 1) {
            // Multiple matches - show them
            term.writeln('');
            term.writeln(matches.join('  '));
            prompt();
            term.write(currentLine);
          }
          // No matches - do nothing (no beep)
        }
        // Backspace
        else if (code === 127) {
          if (currentLine.length > 0) {
            currentLine = currentLine.slice(0, -1);
            term.write('\b \b');
          }
        }
        // Regular character
        else if (code >= 32 && code < 127) {
          currentLine += data;
          term.write(data);
        }
      });

      // Handle resize
      const resizeObserver = new ResizeObserver(() => {
        if (mounted && fitAddon) {
          fitAddon.fit();
        }
      });
      if (terminalRef.current) {
        resizeObserver.observe(terminalRef.current);
      }
    };

    initTerminal();

    return () => {
      mounted = false;
      if (term) term.dispose();
    };
  }, [isClient]);

  return (
    <div className={styles.terminalContainer}>
      <div className={styles.terminalHeader}>
        <div className={styles.terminalButtons}>
          <span className={`${styles.terminalButton} ${styles.close}`}></span>
          <span className={`${styles.terminalButton} ${styles.minimize}`}></span>
          <span className={`${styles.terminalButton} ${styles.maximize}`}></span>
        </div>
        <div className={styles.terminalTitle}>visitor@darriusgrate.com: ~</div>
      </div>
      <div 
        ref={terminalRef} 
        className={styles.terminalBody}
        role="application"
        aria-label="Interactive terminal interface"
        aria-describedby="terminal-description"
      />
      <div id="terminal-description" className="sr-only">
        Interactive terminal with commands to explore the portfolio. Type 'help' to see available commands, 'tour' for a guided walkthrough, or 'whoami' to learn about the developer.
      </div>
    </div>
  );
}

// Command handler
function handleCommand(
  term: any, 
  command: string, 
  prompt: () => void,
  renderPrompt: (tourModeInstance?: any) => void,
  tourMode?: TourMode | null,
  isTourActive?: boolean,
  setTourMode?: (mode: TourMode | null) => void,
  setIsTourActive?: (active: boolean) => void
) {
  // Handle tour mode input
  if (isTourActive && tourMode) {
    tourMode.handleInput(command);
    return;
  }

  const parser = new CommandParser();
  const result = parser.execute(command);
  
  // Handle clear command specially
  if (command === 'clear') {
    term.clear();
    prompt();
    return;
  }

  // Handle tour start
  if (result.startTour && setTourMode && setIsTourActive) {
    const tourCallbacks: TourCallbacks = {
      write: (text: string) => {
        term.write(text);
      },
      executeCommand: (cmd: string) => {
        const cmdResult = parser.execute(cmd);
        if (cmdResult.output) {
          const lines = cmdResult.output.split('\n');
          lines.forEach(line => {
            term.writeln(line);
          });
        }
        if (cmdResult.error) {
          term.writeln(`\x1b[1;31m${cmdResult.error}\x1b[0m`);
        }
      },
      renderPrompt: (tourModeInstance: any) => {
        renderPrompt(tourModeInstance);
      },
      onComplete: () => {
        setTourMode(null);
        setIsTourActive(false);
        term.writeln('\n');
        prompt();
      },
      onSkip: () => {
        setTourMode(null);
        setIsTourActive(false);
        prompt();
      }
    };

    const newTourMode = new TourMode(tourCallbacks);
    setTourMode(newTourMode);
    setIsTourActive(true);
    newTourMode.start();
    return;
  }
  
  if (result.output) {
    const lines = result.output.split('\n');
    lines.forEach(line => {
      term.writeln(line);
    });
  }
  
  if (result.error) {
    term.writeln(`\x1b[1;31m${result.error}\x1b[0m`);
  }
  
  prompt();
}
