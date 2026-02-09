import { typewriterEffect } from './utils/typewriter';
import { TOUR_CONFIG, TERMINAL_CONFIG } from '@/lib/constants';

// Utility to wrap text at terminal width with proper word boundaries and ANSI support
function wrapText(text: string, maxWidth: number = TERMINAL_CONFIG.WIDTH): string[] {
  const lines: string[] = [];
  const paragraphs = text.split('\n');
  
  for (const paragraph of paragraphs) {
    if (paragraph.trim() === '') {
      lines.push('');
      continue;
    }
    
    // Split into words only (no whitespace tokens)
    const words = paragraph.trim().split(/\s+/);
    let currentLine = '';
    
    for (const word of words) {
      // Test if adding this word would exceed maxWidth
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      
      // Strip ANSI codes for length calculation
      const testLineWithoutAnsi = testLine.replace(/\x1b\[[0-9;]*m/g, '');
      
      if (testLineWithoutAnsi.length > maxWidth) {
        // Current line is full, start a new line
        if (currentLine) {
          lines.push(currentLine.trim());
          currentLine = word;
        } else {
          // Word itself is longer than maxWidth - keep it as is
          lines.push(word);
          currentLine = '';
        }
      } else {
        // Add word to current line
        currentLine = testLine;
      }
    }
    
    // Add the last line if it has content
    if (currentLine.trim()) {
      lines.push(currentLine.trim());
    }
  }
  
  return lines;
}

export interface TourStep {
  type: 'narrative' | 'command' | 'choice' | 'complete';
  narrative?: string;
  command?: string;
  choices?: { text: string; nextStep: number }[];
  nextStep?: number;
  autoAdvance?: boolean;
  autoAdvanceDelay?: number; // ms
}

export interface TourCallbacks {
  write: (text: string) => void;
  executeCommand: (command: string) => void;
  renderPrompt: (tourMode: TourMode) => void;
  onComplete: () => void;
  onSkip: () => void;
}

export class TourMode {
  private currentStep = 0;
  private isActive = false;
  private callbacks: TourCallbacks;
  private typewriterCleanup?: () => void;

  private readonly steps: TourStep[] = [
    {
      type: 'narrative',
      narrative: `Welcome to my portfolio! I'm Darrius, currently on Day 47 of my 90-day journey to break into red team operations. My philosophy is simple: Build > Study. I'm proving my expertise through production code, not just certifications. Let me show you around.`,
      nextStep: 1
    },
    {
      type: 'command',
      narrative: 'First, let me introduce myself properly...',
      command: 'whoami',
      nextStep: 2,
      autoAdvance: true,
      autoAdvanceDelay: 3000
    },
    {
      type: 'narrative',
      narrative: `I'm building a focused portfolio of tools and writeups that demonstrate offensive security workflows. Press ENTER to see what I'm working on...`,
      nextStep: 3
    },
    {
      type: 'command',
      command: 'projects',
      nextStep: 4,
      autoAdvance: true,
      autoAdvanceDelay: 4000
    },
    {
      type: 'choice',
      narrative: `I've automated several Active Directory attacks. Want to see how a Kerberoasting attack works in action? Type 'yes' to see the simulation or 'skip' to continue the tour.`,
      choices: [
        { text: 'yes', nextStep: 5 },
        { text: 'skip', nextStep: 6 }
      ]
    },
    {
      type: 'command',
      command: 'attack-sim kerberoast',
      nextStep: 6,
      autoAdvance: true,
      autoAdvanceDelay: 6000
    },
    {
      type: 'command',
      narrative: 'Here\'s my technical expertise and what I bring to the table...',
      command: 'skills',
      nextStep: 7,
      autoAdvance: true,
      autoAdvanceDelay: 4000
    },
    {
      type: 'narrative',
      narrative: `If you're hiring for red team operations or want to collaborate on security research, I'd love to connect. I'm actively seeking opportunities and sharing work in public. Type 'contact' anytime to reach out, or press ENTER to finish the tour.`,
      nextStep: 8
    },
    {
      type: 'complete',
      narrative: `That's the tour! You're now free to explore my portfolio. Type 'help' to see all available commands, or try: 'fastfetch' for system information, 'history' for my 90-day journey, 'grep [term]' to search content, or 'attack-sim [technique]' for attack simulations. Thanks for taking the tour!`
    }
  ];

  constructor(callbacks: TourCallbacks) {
    this.callbacks = callbacks;
  }

  public start(): void {
    this.isActive = true;
    this.currentStep = 0;
    
    // Add delay to let tour header be visible
    setTimeout(() => {
      if (this.isActive) {
        this.executeStep();
      }
    }, TOUR_CONFIG.STEP_DELAY); // Step delay
  }

  public handleInput(input: string): void {
    if (!this.isActive) {
      return;
    }

    const step = this.steps[this.currentStep];
    if (!step) {
      return;
    }

    // Handle skip command at any time
    if (input.toLowerCase().trim() === 'skip') {
      this.skip();
      return;
    }

    switch (step.type) {
      case 'narrative':
        // Accept empty input (ENTER) or explicit 'enter' to continue
        if (input.trim() === '' || input.toLowerCase().trim() === 'enter') {
          this.nextStep();
        } else {
          // Show hint for other inputs
          this.callbacks.write(`\nPress ENTER to continue or type 'skip' to exit.\n`);
          this.callbacks.renderPrompt(this);
        }
        break;

      case 'choice':
        const choice = step.choices?.find(c => 
          c.text.toLowerCase() === input.toLowerCase().trim()
        );
        if (choice) {
          this.currentStep = choice.nextStep! - 1; // Convert to 0-based index
          this.nextStep();
        } else {
          this.callbacks.write(`\nPlease type 'yes' or 'skip' to continue.\n`);
          this.callbacks.renderPrompt(this);
        }
        break;

      case 'complete':
        this.complete();
        break;
    }
  }

  public skip(): void {
    this.isActive = false;
    this.typewriterCleanup?.();
    this.callbacks.write(`\r\n\r\nTour exited. You're now in free exploration mode.\r\n`);
    this.callbacks.write(`Type 'help' to see all available commands.\r\n\r\n`);
    this.callbacks.onSkip();
  }

  public isRunning(): boolean {
    return this.isActive;
  }

  public getCurrentStep(): number {
    return this.currentStep + 1;
  }

  public getTotalSteps(): number {
    return this.steps.length;
  }

  private executeStep(): void {
    if (!this.isActive) return;

    const step = this.steps[this.currentStep];
    if (!step) {
      this.complete();
      return;
    }

    // Clear any existing typewriter
    this.typewriterCleanup?.();

    switch (step.type) {
      case 'narrative':
        this.executeNarrative(step);
        break;

      case 'command':
        this.executeCommand(step);
        break;

      case 'choice':
        this.executeChoice(step);
        break;

      case 'complete':
        this.executeComplete(step);
        break;
    }
  }

  private executeNarrative(step: TourStep): void {
    if (!step.narrative) return;

    this.callbacks.write('\r\n');
    
    // Wrap text and get array of lines
    const wrappedLines = wrapText(step.narrative, 75);
    
    // Display each line with typewriter effect
    let lineIndex = 0;
    const displayNextLine = () => {
      if (lineIndex < wrappedLines.length) {
        this.typewriterCleanup = typewriterEffect(
          wrappedLines[lineIndex],
          (char) => this.callbacks.write(char),
          { 
            speed: TOUR_CONFIG.TYPEWRITER_SPEED,
            onComplete: () => {
              this.callbacks.write('\r\n');
              lineIndex++;
              if (lineIndex < wrappedLines.length) {
                displayNextLine();
              } else {
                // All lines displayed, show prompt and render terminal prompt
                this.callbacks.write('\r\n');
                this.callbacks.write('\x1b[1;33m[Press ENTER to continue or type \'skip\' to exit]\x1b[0m\r\n');
                this.callbacks.renderPrompt(this);
              }
            }
          }
        );
      }
    };
    
    displayNextLine();
  }

  private executeCommand(step: TourStep): void {
    console.log('TourMode.executeCommand called, step:', step);
    if (step.narrative) {
      this.callbacks.write(`\r\n${step.narrative}\r\n\r\n`);
    }

    if (step.command) {
      this.callbacks.write(`$ ${step.command}\r\n`);
      this.callbacks.executeCommand(step.command);
    }

    if (step.autoAdvance && step.autoAdvanceDelay) {
      console.log('TourMode.executeCommand: Setting auto-advance timeout for', step.autoAdvanceDelay, 'ms');
      setTimeout(() => {
        console.log('TourMode.executeCommand: Auto-advance timeout triggered, isActive:', this.isActive);
        if (this.isActive) {
          this.nextStep();
        }
      }, step.autoAdvanceDelay);
    }
  }

  private executeChoice(step: TourStep): void {
    if (step.narrative) {
      this.callbacks.write('\r\n');
      
      // Wrap text and get array of lines
      const wrappedLines = wrapText(step.narrative, 75);
      
      // Display each line with typewriter effect
      let lineIndex = 0;
      const displayNextLine = () => {
        if (lineIndex < wrappedLines.length) {
          this.typewriterCleanup = typewriterEffect(
            wrappedLines[lineIndex],
            (char) => this.callbacks.write(char),
            { 
              speed: TOUR_CONFIG.TYPEWRITER_SPEED,
              onComplete: () => {
                this.callbacks.write('\r\n');
                lineIndex++;
                if (lineIndex < wrappedLines.length) {
                  displayNextLine();
                } else {
                  // All lines displayed, show prompt and render terminal prompt
                  this.callbacks.write('\r\n');
                  this.callbacks.write('\x1b[1;36m[Type your choice or \'skip\' to exit]\x1b[0m\r\n');
                  this.callbacks.renderPrompt(this);
                }
              }
            }
          );
        }
      };
      
      displayNextLine();
    }
  }

  private executeComplete(step: TourStep): void {
    if (step.narrative) {
      this.callbacks.write('\r\n');
      
      // Wrap text and get array of lines
      const wrappedLines = wrapText(step.narrative, 75);
      
      // Display each line with typewriter effect
      let lineIndex = 0;
      const displayNextLine = () => {
        if (lineIndex < wrappedLines.length) {
          this.typewriterCleanup = typewriterEffect(
            wrappedLines[lineIndex],
            (char) => this.callbacks.write(char),
            { 
              speed: TOUR_CONFIG.TYPEWRITER_SPEED,
              onComplete: () => {
                this.callbacks.write('\r\n');
                lineIndex++;
                if (lineIndex < wrappedLines.length) {
                  displayNextLine();
                } else {
                  // All lines displayed, complete tour
                  this.callbacks.write('\r\n');
                  setTimeout(() => {
                    this.complete();
                  }, 2000);
                }
              }
            }
          );
        }
      };
      
      displayNextLine();
    } else {
      setTimeout(() => {
        this.complete();
      }, 2000);
    }
  }

  private nextStep(): void {
    console.log('TourMode.nextStep called, current step:', this.currentStep);
    this.currentStep++;
    console.log('TourMode.nextStep: Moving to step', this.currentStep, 'of', this.steps.length);
    
    if (this.currentStep < this.steps.length) {
      setTimeout(() => {
        if (this.isActive) {
          console.log('TourMode.nextStep: Executing step', this.currentStep);
          this.executeStep();
        } else {
          console.log('TourMode.nextStep: Tour no longer active, skipping step execution');
        }
      }, TOUR_CONFIG.STEP_DELAY); // Small delay between steps
    } else {
      console.log('TourMode.nextStep: Tour complete, calling complete()');
      this.complete();
    }
  }

  private complete(): void {
    this.isActive = false;
    this.typewriterCleanup?.();
    this.callbacks.onComplete();
  }
}
