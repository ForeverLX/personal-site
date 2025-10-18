# Contributing to Red Team Portfolio

Thank you for your interest in contributing to the Darrius Grate Red Team Portfolio! This document provides guidelines for contributing to this project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Code Style Guidelines](#code-style-guidelines)
- [Commit Message Format](#commit-message-format)
- [Pull Request Process](#pull-request-process)
- [Testing Requirements](#testing-requirements)
- [Security Disclosure](#security-disclosure)
- [Documentation](#documentation)

## Code of Conduct

This project adheres to a code of conduct that ensures a welcoming environment for all contributors. By participating, you agree to uphold this code.

### Our Standards

- **Be respectful**: Treat everyone with respect and professionalism
- **Be constructive**: Provide helpful feedback and suggestions
- **Be inclusive**: Welcome contributors from all backgrounds
- **Be collaborative**: Work together to improve the project

### Unacceptable Behavior

- Harassment, discrimination, or offensive language
- Personal attacks or trolling
- Spam or off-topic discussions
- Any behavior that creates an unwelcoming environment

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git
- Basic knowledge of React, TypeScript, and Next.js

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/red-team-portfolio.git
   cd red-team-portfolio
   ```
3. Add the upstream repository:
   ```bash
   git remote add upstream https://github.com/ForeverLX/red-team-portfolio.git
   ```

## Development Setup

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create environment file:
   ```bash
   cp .env.example .env.local
   ```

3. Configure environment variables in `.env.local`:
   ```env
   NEXT_PUBLIC_FORMSPREE_ID=your_formspree_id
   NEXT_PUBLIC_GITHUB_USERNAME=your_github_username
   NEXT_PUBLIC_GA_ID=your_google_analytics_id
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler

## Code Style Guidelines

### TypeScript

- Use TypeScript strict mode
- Define types for all props and state
- Use interfaces for object types
- Prefer `const` over `let` when possible
- Use meaningful variable and function names

**Example**:
```typescript
interface ButtonProps {
  children: React.ReactNode
  onClick: () => void
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  disabled = false 
}) => {
  // Component implementation
}
```

### React Components

- Use functional components with hooks
- Keep components small and focused
- Use proper prop destructuring
- Implement proper error boundaries
- Use React.memo for performance when appropriate

**Example**:
```typescript
import React, { useState, useCallback } from 'react'

interface CounterProps {
  initialValue?: number
  onCountChange?: (count: number) => void
}

const Counter: React.FC<CounterProps> = ({ 
  initialValue = 0, 
  onCountChange 
}) => {
  const [count, setCount] = useState(initialValue)
  
  const increment = useCallback(() => {
    const newCount = count + 1
    setCount(newCount)
    onCountChange?.(newCount)
  }, [count, onCountChange])
  
  return (
    <div>
      <span>{count}</span>
      <button onClick={increment}>Increment</button>
    </div>
  )
}

export default React.memo(Counter)
```

### Tailwind CSS

- Use utility classes for styling
- Follow mobile-first responsive design
- Use consistent spacing scale
- Prefer semantic color names
- Group related classes logically

**Example**:
```tsx
<div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
  <h1 className="text-4xl font-bold mb-8 text-center">
    Welcome to the Portfolio
  </h1>
  <p className="text-lg text-gray-300 max-w-2xl text-center leading-relaxed">
    This is a professional red team portfolio showcasing offensive security expertise.
  </p>
</div>
```

### File Organization

- Use PascalCase for component files: `MyComponent.tsx`
- Use camelCase for utility files: `myUtility.ts`
- Use kebab-case for page files: `my-page.tsx`
- Group related files in folders
- Use index files for clean imports

**Example Structure**:
```
src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── index.ts
│   └── Terminal/
│       ├── Terminal.tsx
│       ├── commands/
│       └── utils/
├── hooks/
│   └── useGitHubStats.ts
└── lib/
    └── constants.ts
```

## Commit Message Format

We use a structured commit message format to maintain a clear project history.

### Format

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements
- `security`: Security-related changes

### Examples

```bash
feat(terminal): add command history navigation
fix(contact): resolve Formspree 403 error
docs(readme): update installation instructions
style(navigation): improve mobile responsiveness
refactor(components): extract reusable Button component
test(terminal): add unit tests for command registry
chore(deps): update Next.js to 14.2.33
perf(images): optimize video compression
security(headers): implement CSP policy
```

### Scope

Use the component or area being changed:
- `terminal` - Terminal component
- `navigation` - Navigation components
- `contact` - Contact form
- `docs` - Documentation
- `deps` - Dependencies
- `config` - Configuration files

## Pull Request Process

### Before Submitting

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the code style guidelines

3. **Test your changes**:
   ```bash
   npm run build
   npm run lint
   npm run type-check
   ```

4. **Update documentation** if needed

5. **Commit your changes** with descriptive messages

6. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

### Pull Request Template

When creating a pull request, please include:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Security enhancement

## Testing
- [ ] Local build successful
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] Manual testing completed
- [ ] Cross-browser testing (if applicable)

## Screenshots (if applicable)
Add screenshots to help explain your changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes
```

### Review Process

1. **Automated Checks**: All PRs must pass automated checks
2. **Code Review**: At least one maintainer review required
3. **Testing**: Manual testing may be requested
4. **Documentation**: Ensure documentation is updated
5. **Approval**: Maintainer approval required before merge

## Testing Requirements

### Automated Testing

All pull requests must pass:

- **TypeScript Compilation**: No type errors
- **ESLint**: No linting errors or warnings
- **Build Process**: Successful production build
- **Performance**: Bundle size within limits

### Manual Testing

For significant changes, manual testing may be required:

- **Cross-browser**: Chrome, Firefox, Safari, Edge
- **Mobile**: iPhone, Android, tablet devices
- **Accessibility**: Keyboard navigation, screen readers
- **Performance**: Lighthouse audit scores

### Test Coverage

While not currently enforced, consider adding tests for:

- Complex components (Terminal, Tour Mode)
- Critical user flows (contact form, navigation)
- Utility functions and hooks
- Error handling scenarios

## Security Disclosure

### Reporting Security Issues

If you discover a security vulnerability, please report it responsibly:

**Email**: contact@darriusgrate.com  
**Subject**: Security Vulnerability Report  
**Response Time**: 48 hours

### What to Include

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### Disclosure Policy

- **Coordinated Disclosure**: 90-day disclosure timeline
- **No Public Disclosure**: Until vulnerability is fixed
- **Credit**: Contributors will be credited (if desired)
- **Responsibility**: Report responsibly, don't exploit

## Documentation

### Documentation Standards

- **Clear and Concise**: Write for your future self
- **Examples**: Include code examples where helpful
- **Up-to-date**: Keep documentation current with code
- **Accessible**: Use clear language and structure

### Types of Documentation

- **Code Comments**: Explain complex logic
- **README Updates**: Installation and usage instructions
- **API Documentation**: Component props and methods
- **Architecture Docs**: System design and decisions

### Documentation Updates

When making changes that affect:

- **User-facing features**: Update README
- **API changes**: Update component documentation
- **Architecture changes**: Update architecture docs
- **Security changes**: Update security documentation

## Getting Help

### Questions and Support

- **GitHub Issues**: For bug reports and feature requests
- **Discussions**: For questions and general discussion
- **Email**: contact@darriusgrate.com for private matters

### Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Recognition

Contributors will be recognized in:

- **README**: Contributors section
- **CHANGELOG**: Release notes
- **GitHub**: Contributor statistics
- **Portfolio**: Featured contributions (with permission)

## License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project (MIT License).

---

**Thank you for contributing to the Red Team Portfolio!** 🚀

Your contributions help make this project better for everyone in the security community.
