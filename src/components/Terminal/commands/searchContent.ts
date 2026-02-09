import { portfolioContent, PortfolioContent } from '../data/portfolioContent';

export interface SearchResult {
  file: string;
  line: number;
  content: string;
  category: string;
  matchCount: number;
}

export function searchPortfolioContent(term: string): SearchResult[] {
  const searchTerm = term.toLowerCase();
  const results: SearchResult[] = [];
  const fileMatches = new Map<string, number>();

  // Search through all portfolio content
  portfolioContent.forEach(item => {
    if (item.content.toLowerCase().includes(searchTerm)) {
      const file = item.file;
      const existingMatch = fileMatches.get(file) || 0;
      fileMatches.set(file, existingMatch + 1);

      results.push({
        file: item.file,
        line: item.line,
        content: item.content,
        category: item.category,
        matchCount: fileMatches.get(file) || 1
      });
    }
  });

  // Sort by category, then by file, then by line number
  return results.sort((a, b) => {
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category);
    }
    if (a.file !== b.file) {
      return a.file.localeCompare(b.file);
    }
    return a.line - b.line;
  });
}

export function formatSearchResults(results: SearchResult[], term: string): string {
  if (results.length === 0) {
    return `No matches found for '${term}'`;
  }

  let output = `Searching for '${term}' across portfolio...\n\n`;
  
  let currentFile = '';
  let currentCategory = '';
  
  results.forEach((result, index) => {
    // Add category header if changed
    if (result.category !== currentCategory) {
      if (currentCategory !== '') {
        output += '\n';
      }
      currentCategory = result.category;
    }
    
    // Add file header if changed
    if (result.file !== currentFile) {
      if (currentFile !== '') {
        output += '\n';
      }
      output += `${result.file}:${result.line}\n`;
      currentFile = result.file;
    }
    
    // Add content line
    output += `  ├─ "${result.content}"\n`;
  });
  
  output += `\nFound ${results.length} matches in ${new Set(results.map(r => r.file)).size} files`;
  
  return output;
}

export function getSearchSuggestions(partialTerm: string): string[] {
  const suggestions: string[] = [];
  const term = partialTerm.toLowerCase();
  
  // Common search terms
  const commonTerms = [
    'kerberoast', 'kerberoasting',
    'golden-ticket', 'golden ticket',
    'as-rep-roast', 'as-rep roasting',
    'dcsync', 'dc sync',
    'lateral-movement', 'lateral movement',
    'process-injection', 'process injection',
    'aclguard',
    'active-directory', 'active directory',
    'mitre', 'attack', 'technique',
    'python', 'c programming', 'powershell',
    'proxmox', 'virtualization', 'lab'
  ];
  
  commonTerms.forEach(suggestion => {
    if (suggestion.includes(term) && suggestion !== term) {
      suggestions.push(suggestion);
    }
  });
  
  return suggestions.slice(0, 5); // Return top 5 suggestions
}
