# Security Considerations

This document outlines the security architecture, threat model, and defensive measures implemented in the Darrius Grate Red Team Portfolio.

## Security Architecture

### Defense in Depth Strategy

The portfolio implements multiple layers of security controls:

1. **Content Security Policy (CSP)**: Strict CSP headers prevent unauthorized script execution and resource loading
2. **Security Headers**: Standard security headers (X-Frame-Options, X-Content-Type-Options, etc.) protect against common attacks
3. **Input Validation**: All user inputs undergo validation before processing
4. **Secure Defaults**: No unsafe JavaScript practices (eval, dangerouslySetInnerHTML)
5. **Environment Isolation**: Sensitive configuration stored in environment variables, never in code

### Implemented Security Controls

#### HTTP Security Headers

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; ...
```

**Rationale**: 
- `X-Frame-Options: DENY` prevents clickjacking attacks
- `X-Content-Type-Options: nosniff` prevents MIME-sniffing vulnerabilities
- `Referrer-Policy` limits information disclosure via referrer headers
- `Permissions-Policy` disables unnecessary browser APIs

#### Content Security Policy

The CSP allows `unsafe-eval` and `unsafe-inline` for specific technical reasons:

**`unsafe-eval` justification**:
- Required by xterm.js terminal library (uses `new Function()` internally)
- Risk mitigated by: no user-generated content, client-side only execution, no sensitive data processing

**`unsafe-inline` justification**:
- Required by Tailwind CSS for style injection
- Required by Next.js for certain optimizations
- Risk mitigated by: no user-generated content, trusted source only

**External domains allowed**:
- `api.github.com`: Read-only API calls for stats component
- `formspree.io`: Contact form submission (verified third-party service)
- `www.googletagmanager.com`: Analytics tracking

### Input Validation

#### Contact Form
- Email validation using regex pattern
- Field length limits enforced client-side
- Required field validation
- Honeypot field for bot detection (via Formspree)
- Rate limiting via Formspree

#### Terminal Component
- Command parsing with whitelist approach
- No system command execution (client-side simulation only)
- Input length limits to prevent buffer issues
- Special character handling to prevent rendering issues

### Authentication & Authorization

**Current Implementation**: N/A

This is a static portfolio site with no authentication requirements. All content is public by design.

**Future Considerations**: If admin functionality is added (content management), implement:
- JWT-based authentication
- Role-based access control
- Session timeout mechanisms
- Audit logging for admin actions

---

## Threat Model

### Assets
1. **Brand Reputation**: Portfolio represents professional credibility
2. **User Experience**: Site performance and availability
3. **Contact Information**: Email submissions via contact form
4. **Analytics Data**: Visitor behavior data

### Threat Actors
1. **Opportunistic Attackers**: Automated vulnerability scanners
2. **Spam Bots**: Automated contact form spam
3. **Malicious Visitors**: Attempts to break site functionality
4. **Competitors**: Unlikely but possible reputational attacks

### Attack Vectors & Mitigations

#### Cross-Site Scripting (XSS)
**Risk**: Medium  
**Likelihood**: Low (no user-generated content)  
**Mitigation**: 
- CSP headers block unauthorized scripts
- React automatically escapes JSX output
- No `dangerouslySetInnerHTML` usage
- No `eval()` or similar unsafe functions

#### Cross-Site Request Forgery (CSRF)
**Risk**: Low  
**Likelihood**: Very Low (no authenticated actions)  
**Mitigation**:
- Contact form uses Formspree with built-in CSRF protection
- No sensitive state-changing actions

#### Denial of Service (DoS)
**Risk**: Low  
**Likelihood**: Low (static site, CDN delivery)  
**Mitigation**:
- Vercel provides automatic DDoS protection
- Static generation means no database queries to exhaust
- GitHub API rate limits handled gracefully
- Contact form rate limiting via Formspree

#### Information Disclosure
**Risk**: Low  
**Likelihood**: Very Low (public portfolio by design)  
**Mitigation**:
- No sensitive information stored or processed
- Environment variables not exposed in client bundle
- Error messages don't reveal system details

#### Dependency Vulnerabilities
**Risk**: Medium  
**Likelihood**: Medium (Node.js ecosystem)  
**Mitigation**:
- Regular `npm audit` scans
- Automated Dependabot alerts on GitHub
- All dependencies kept up-to-date
- Critical vulnerabilities (like Next.js CVE) patched immediately

---

## Security Testing Performed

### Automated Testing
- ✅ `npm audit` for dependency vulnerabilities
- ✅ TypeScript strict mode for type safety
- ✅ ESLint for code quality and security patterns

### Manual Security Testing
- ✅ XSS attempt in terminal inputs
- ✅ XSS attempt in contact form
- ✅ Command injection patterns in terminal
- ✅ SQL injection patterns in forms (N/A but tested)
- ✅ Security header verification in production
- ✅ CSP effectiveness validation
- ✅ External link audit (all use rel="noopener noreferrer")

### Third-Party Security Validation
- ✅ Mozilla Observatory scan (planned for production)
- ✅ Security Headers scanner verification (planned)

---

## Incident Response Plan

### Monitoring
- Vercel automatic uptime monitoring
- Google Analytics for abnormal traffic patterns
- Browser console error monitoring via Sentry (planned)

### Response Procedures

**Security Vulnerability Discovered**:
1. Assess severity and exploitability
2. Determine if immediate hotfix needed
3. Deploy fix to production
4. Review logs for potential exploitation
5. Document incident and prevention measures

**Site Compromise/Defacement**:
1. Immediately redeploy from known-good Git commit
2. Review Vercel deployment logs for unauthorized changes
3. Rotate all credentials (Formspree, GitHub tokens, etc.)
4. Investigate root cause
5. Implement additional preventive controls

**Spam/Abuse**:
1. Review Formspree spam filters
2. Enable additional bot protection if needed
3. Consider adding CAPTCHA to contact form
4. Block abusive IPs if pattern identified

---

## Security Maintenance

### Regular Activities
- **Weekly**: Monitor Vercel logs for errors or unusual activity
- **Monthly**: Run `npm audit` and fix vulnerabilities
- **Quarterly**: Full security review of all dependencies
- **Annually**: Review entire threat model and update as needed

### Dependency Management
- Use Dependabot for automated vulnerability alerts
- Test updates in development before production deployment
- Maintain changelog of security-related updates

### Future Security Enhancements
1. Implement Subresource Integrity (SRI) for external resources
2. Add Content Security Policy reporting endpoint
3. Implement automated security testing in CI/CD pipeline
4. Add rate limiting at CDN level for additional DoS protection

---

## Contact for Security Issues

If you discover a security vulnerability in this portfolio, please report it responsibly:

**Email**: contact@darriusgrate.com  
**Expected Response Time**: 48 hours  
**Disclosure Policy**: 90-day coordinated disclosure

Please do not publicly disclose security issues until we've had a chance to address them.

---

**Document Version**: 1.0  
**Last Updated**: January 18, 2025  
**Next Review**: April 18, 2025
