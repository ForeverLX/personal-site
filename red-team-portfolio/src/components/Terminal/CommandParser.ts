import { CommandRegistry } from './CommandRegistry';

export interface CommandResult {
  output?: string;
  error?: string;
  startTour?: boolean;
}

export class CommandParser {
  private registry: CommandRegistry;

  constructor() {
    this.registry = new CommandRegistry();
  }

  execute(input: string): CommandResult {
    const parts = input.trim().split(/\s+/);
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Check if command exists
    if (!this.registry.has(command)) {
      return this.handleUnknownCommand(command);
    }

    // Execute command
    try {
      return this.registry.execute(command, args);
    } catch (error) {
      return {
        error: `Error executing command: ${error}`,
      };
    }
  }

  private handleUnknownCommand(command: string): CommandResult {
    // Use Levenshtein distance to suggest similar commands
    const suggestion = this.suggestCommand(command);
    
    if (suggestion) {
      return {
        error: `Command not found: ${command}\n\x1b[33mDid you mean '${suggestion}'?\x1b[0m`,
      };
    }

    // Generic error with helpful message
    return {
      error: `Command not found: ${command}\n\x1b[33mType 'help' to see available commands.\x1b[0m`,
    };
  }

  private getLevenshteinDistance(a: string, b: string): number {
    const matrix: number[][] = [];
    
    // Initialize matrix
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }
    
    // Fill matrix
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            matrix[i][j - 1] + 1,     // insertion
            matrix[i - 1][j] + 1      // deletion
          );
        }
      }
    }
    
    return matrix[b.length][a.length];
  }

  private suggestCommand(input: string): string | null {
    const threshold = 2; // Max edit distance for suggestion
    const allCommands = this.registry.getAllCommands();
    let bestMatch: string | null = null;
    let bestDistance = Infinity;
    
    for (const cmd of allCommands) {
      const distance = this.getLevenshteinDistance(input, cmd);
      if (distance < bestDistance && distance <= threshold) {
        bestDistance = distance;
        bestMatch = cmd;
      }
    }
    
    return bestMatch;
  }
}
