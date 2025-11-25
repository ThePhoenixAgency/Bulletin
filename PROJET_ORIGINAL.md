# PROJET ORIGINAL - Bulletin Application

**Date**: 2025-11-25
**Status**: REFERENCE DOCUMENT - NEVER MODIFY
**Purpose**: Complete original requirements specification

---

## PROJECT OVERVIEW

**Name**: Bulletin
**Type**: Enterprise-grade mobile application
**Target**: Weather, traffic, local events, and alerts platform for Oisans, France
**Stack**: React Native/Expo (mobile), Node.js (backend), Supabase (database)

---

## CRITICAL RULES (INVIOLABLE)

### RULE #1: NEVER INVENT
- Always read original .md document FIRST
- Always ask if unclear instead of assuming
- Never invent features or architectural choices
- Every decision must be documented in BEST_PRACTICES.md

### RULE #2: NEVER FORGET USER CHOICES
- Cannot modify infrastructure decisions:
  - Render.com ONLY (no VMs, no Azure, no Oracle Cloud VMs)
  - Podman rootless ONLY (NOT Docker)
  - Supabase for database
  - Oracle Cloud SMTP/IMAP for emails ONLY
  - HuggingFace Inference API (FREE tier with fallback tokens)
  - GitHub Secrets ONLY (ZERO .env files)

### RULE #3: SECURITY IS MANDATORY
- TLS 1.3 MINIMUM - HTTPS forced
- ZERO CORS headers allowed
- ZERO injection vulnerabilities (XSS, SQL injection, header injection)
- All inputs validated, escaped, sanitized
- Rate limiting for DDoS protection
- RGPD compliant (13-month cookies, consent-driven)

### RULE #4: DEVELOPMENT PROCESS
- 100% JSDoc commented code
- Zero AI-generated generic code
- Semver versioning strictly enforced
- E2E + unit tests required
- CI/CD with GitHub Actions
- BACKLOG.md must be updated at every commit
- Update BEST_PRACTICES.md with every architectural decision

---

## TECHNICAL STACK (NON-NEGOTIABLE)

### Frontend
- React Native 0.71+
- Expo managed workflow
- Navigation: React Navigation v6+
- UI Components: React Native Paper / Custom
- Dark/Light theme support
- Mobile-first, responsive design
- WCAG 2.1 AA accessibility
- OPQUAST standards compliance
- Lazy loading for performance
- iOS Safari PWA ready

### Backend / Services
- Node.js 18+ (via Render.com)
- Express.js for API
- No paid APIs (ALL FREE)
- HuggingFace Inference API (TOKEN_HF_BULLETIN1 + fallback TOKEN_HF_BULLETIN2)
- Weather data: Open-Meteo (free API)
- Traffic data: OpenRouteService (free tier)
- Maps: Leaflet + OpenStreetMap (free)

### Database
- Supabase (PostgreSQL, free tier)
- Real-time subscriptions
- Row-level security (RLS)
- Auto-backups

### Email / Communication
- Oracle Cloud SMTP/IMAP for newsletters ONLY
- Newsletter system for campaigns
- Contact management

### Deployment
- Hosting: Render.com ONLY
- Containerization: Podman rootless
- Certificates: Oracle Cloud OR EntraID (NOT Azure VMs)
- CI/CD: GitHub Actions
- Dependabot for security updates

### Authentication
- EntraID available (but NOT Azure services)
- Optional: OAuth GitHub, Google
- Session management with secure tokens
- No password storage vulnerabilities

---

## PROJECT COMPONENTS

### 1. Mobile App (React Native/Expo)

**Screens (14 total)**:
1. HomeScreen - Announcements & quick actions
2. WeatherScreen - Gradient UI, forecasts, alerts
3. TrafficScreen - Maps, routes, incidents
4. EventsScreen - Local events discovery
5. AlertsScreen - Emergency alerts
6. ChatbotScreen - AI user guidance
7. AdminScreen - Panel administration
8. SettingsScreen - User preferences
9. DocumentationScreen - Help & guides
10. SupportScreen - Tickets & support
11. NewsletterScreen - Subscription management
12. ProfileScreen - User account
13. MapScreen - Interactive map
14. (Others as needed)

**Features**:
- Real-time weather updates with forecasts and alerts
- Traffic information for better route planning
- Local events discovery and notifications
- Emergency alerts with priority notifications
- AI-powered chatbot for user guidance
- Admin panel for content management
- Newsletter subscription and management
- User support tickets system
- Multi-language support (at least French + English)
- Offline capability (local caching)
- Push notifications

### 2. Services Layer
- aiService.js - HuggingFace API with fallback tokens
- weatherService.js - Weather API integration
- trafficService.js - Traffic data fetching
- emailService.js - Oracle SMTP/IMAP
- newsletterService.js - Campaign management
- chatbotService.js - Conversational AI
- notificationService.js - Push notifications
- authService.js - OAuth/authentication
- storageService.js - Supabase integration

### 3. Dashboard & Admin Panel
- Web interface for administrators
- Logo upload functionality
- Content management and moderation
- Newsletter campaign scheduling
- Multi-contact support
- User management

### 4. Newsletter System
- Automated email delivery via Oracle Cloud SMTP
- Campaign scheduling
- Contact list management
- Template system
- Analytics tracking

### 5. Chatbot
- AI-powered user guidance
- FAQ responses
- Context-aware answers
- Integration with HuggingFace API

### 6. PWA/TWA
- Progressive Web App
- Trusted Web Activity for native app installation
- Offline functionality
- App shortcuts
- Web app manifest

### 7. Support Module
- Ticket system
- FAQ database
- Documentation
- Contact forms

---

## MONETIZATION

**ONLY**: Announcements + Advertisements
- NO subscription fees
- NO paid features
- NO user data sales
- Transparent ad disclosure

---

## SECURITY REQUIREMENTS

### Certificates & TLS
- Root Certificate Authority (Oracle Cloud OR EntraID)
- Application Certificate (Oracle Cloud OR EntraID)
- TLS 1.3 minimum
- HTTPS forced on all connections
- HSTS headers

### Input Validation
- XSS protection (escape all user inputs)
- SQL injection prevention (parameterized queries)
- CSRF token validation
- Header injection prevention
- Content Security Policy (CSP) headers

### Data Protection
- RGPD compliance
- 13-month cookie expiration
- Explicit consent banner
- Data minimization principle
- User data export functionality
- Right to be forgotten implementation

### Rate Limiting
- IP-based rate limiting
- Endpoint-specific limits
- Sliding window algorithm
- DDoS protection

---

## QUALITY STANDARDS

### Code Quality
- 100% JSDoc documentation
- Zero AI-generated generic code
- Linting: ESLint
- Code formatting: Prettier
- No type errors (TypeScript strict mode)

### Testing
- Unit tests with Jest (>80% coverage)
- Integration tests
- E2E tests with Detox
- Performance tests
- Security tests

### Accessibility
- WCAG 2.1 AA compliance
- OPQUAST standards
- Screen reader support
- Keyboard navigation
- Color contrast verification
- Semantic HTML

### Performance
- Lazy loading for components
- Code splitting
- Bundle size optimization
- Image optimization
- Caching strategies
- Network optimization

---

## PROJECT STRUCTURE

```
Bulletin/
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js
│   │   ├── WeatherScreen.js
│   │   ├── TrafficScreen.js
│   │   ├── EventsScreen.js
│   │   ├── AlertsScreen.js
│   │   ├── ChatbotScreen.js
│   │   ├── AdminScreen.js
│   │   ├── SettingsScreen.js
│   │   ├── DocumentationScreen.js
│   │   ├── SupportScreen.js
│   │   ├── NewsletterScreen.js
│   │   ├── ProfileScreen.js
│   │   └── MapScreen.js
│   ├── services/
│   │   ├── aiService.js
│   │   ├── weatherService.js
│   │   ├── trafficService.js
│   │   ├── emailService.js
│   │   ├── newsletterService.js
│   │   ├── chatbotService.js
│   │   ├── notificationService.js
│   │   ├── authService.js
│   │   └── storageService.js
│   ├── utils/
│   │   ├── security.js
│   │   ├── encryption.js
│   │   ├── validation.js
│   │   └── rateLimit.js
│   ├── components/
│   ├── styles/
│   └── App.js
├── dashboard/
├── __tests__/
├── .github/workflows/
├── App.json
├── package.json
├── Containerfile
├── render.yaml
├── README.md
├── INFRASTRUCTURE.md
├── BEST_PRACTICES.md
├── BACKLOG.md
└── .gitignore
```

---

## DEPLOYMENT CHECKLIST

- [ ] All security tests passing
- [ ] TLS 1.3 certificates configured
- [ ] CORS disabled
- [ ] Rate limiting active
- [ ] RGPD compliance verified
- [ ] Backup strategy implemented
- [ ] Monitoring configured
- [ ] Error logging active
- [ ] Performance benchmarks met
- [ ] All tests passing (>80% coverage)
- [ ] Security audit completed
- [ ] BACKLOG.md updated
- [ ] Documentation complete

---

## KEY CONTACTS & RESOURCES

**Repository**: https://github.com/ThePhoenixAgency/Bulletin
**Owner**: EthanThePhoenix38 (The Phoenix Agency)
**Branch**: main
**Visibility**: Private

---

**IMPORTANT**: This document is the source of truth for project requirements. All development decisions must reference this document. If anything is unclear, ask before proceeding.
