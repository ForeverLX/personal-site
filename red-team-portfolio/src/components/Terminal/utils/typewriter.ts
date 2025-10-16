export interface TypewriterOptions {
  speed?: number; // ms per character
  onComplete?: () => void;
  onInterrupt?: () => void;
}

export function typewriterEffect(
  text: string,
  callback: (char: string) => void,
  options: TypewriterOptions = {}
): () => void {
  const { speed = 75, onComplete, onInterrupt } = options;
  let index = 0;
  let isInterrupted = false;

  const typeNextChar = () => {
    if (isInterrupted || index >= text.length) {
      if (onComplete && !isInterrupted) {
        onComplete();
      }
      return;
    }

    const char = text[index];
    callback(char);
    index++;

    if (index < text.length) {
      setTimeout(typeNextChar, speed);
    } else if (onComplete) {
      onComplete();
    }
  };

  // Start typing
  typeNextChar();

  // Return cleanup function
  return () => {
    isInterrupted = true;
    if (onInterrupt) {
      onInterrupt();
    }
  };
}

export function typewriterEffectAsync(
  text: string,
  callback: (char: string) => void,
  options: TypewriterOptions = {}
): Promise<void> {
  return new Promise((resolve, reject) => {
    const cleanup = typewriterEffect(text, callback, {
      ...options,
      onComplete: () => {
        resolve();
      },
      onInterrupt: () => {
        reject(new Error('Typewriter effect interrupted'));
      }
    });
  });
}

