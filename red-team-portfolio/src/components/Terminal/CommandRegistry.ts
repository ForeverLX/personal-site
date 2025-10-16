import { CommandResult } from './CommandParser';
import * as Commands from './commands';

export class CommandRegistry {
  private commands: Map<string, (args: string[]) => CommandResult>;

  constructor() {
    this.commands = new Map();
    this.registerCommands();
  }

  private registerCommands() {
    // Core navigation commands
    this.commands.set('help', Commands.help);
    this.commands.set('about', Commands.about);
    this.commands.set('whoami', Commands.whoami);
    this.commands.set('projects', Commands.projects);
    this.commands.set('skills', Commands.skills);
    this.commands.set('contact', Commands.contact);
    this.commands.set('ls', Commands.ls);
    this.commands.set('pwd', Commands.pwd);
    this.commands.set('clear', Commands.clear);
    
    // Advanced commands
    this.commands.set('fastfetch', Commands.fastfetch);
    this.commands.set('neofetch', Commands.neofetch);
    this.commands.set('history', Commands.history);
    this.commands.set('ps', Commands.ps);
    this.commands.set('attack-sim', Commands.attackSim);
    this.commands.set('grep', Commands.grep);
    this.commands.set('tour', Commands.tour);
    
    // Easter eggs
    this.commands.set('sudo', Commands.sudo);
    this.commands.set('cowsay', Commands.cowsay);
    this.commands.set('sl', Commands.sl);
    this.commands.set('wget', Commands.wget);
    this.commands.set('ssh', Commands.ssh);
  }

  has(command: string): boolean {
    return this.commands.has(command);
  }

  execute(command: string, args: string[]): CommandResult {
    const cmd = this.commands.get(command);
    if (!cmd) {
      return { error: 'Command not found' };
    }
    return cmd(args);
  }

  getAllCommands(): string[] {
    return Array.from(this.commands.keys()).sort();
  }
}
