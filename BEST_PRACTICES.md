# 🛠️ Bonnes Pratiques - Développement Web Sécurisé & CI/CD

> Document générique réutilisable pour tous les projets web - Focus sécurité, CI/CD, et qualité

[![Security](https://img.shields.io/badge/Security-Hardened-green.svg)](SECURITY.md)
[![CI/CD](https://img.shields.io/badge/CI%2FCD-Automated-blue.svg)](.github/workflows)
[![Quality](https://img.shields.io/badge/Quality-Opquast-orange.svg)](https://checklists.opquast.com/)

---

## 📚 Table des matières

1. [🔒 Sécurité](#-sécurité)
2. [🚀 CI/CD & Automatisation](#-cicd--automatisation)
3. [🎯 Qualité & Standards](#-qualité--standards)
4. [📦 Gestion des Dépendances](#-gestion-des-dépendances)
5. [📝 Versioning & Git](#-versioning--git)
6. [🛡️ Protection des Données](#️-protection-des-données)
7. [📊 Monitoring & Logs](#-monitoring--logs)
8. [♿ Accessibilité](#-accessibilité)
9. [🌍 Performance](#-performance)
10. [📚 Documentation](#-documentation)

---

## 🔒 Sécurité

### 🛡️ Headers de Sécurité

**Obligatoires** sur TOUS les projets :

```python
# Flask exemple
@app.after_request
def set_security_headers(response):
    # Prévient le MIME sniffing
    response.headers['X-Content-Type-Options'] = 'nosniff'
    
    # Prévient le clickjacking
    response.headers['X-Frame-Options'] = 'DENY'
    
    # Active le filtre XSS du navigateur
    response.headers['X-XSS-Protection'] = '1; mode=block'
    
    # Force HTTPS pendant 1 an
    response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
    
    # Content Security Policy - À adapter selon vos besoins
    response.headers['Content-Security-Policy'] = (
        "default-src 'self'; "
        "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; "
        "style-src 'self' 'unsafe-inline'; "
        "img-src 'self' data: https:; "
        "font-src 'self' data:; "
        "connect-src 'self' https://api.example.com; "
        "frame-ancestors 'none'"
    )
    
    # Contrôle les Referrer headers
    response.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'
    return response
```

### 🔑 Authentification & Autorisation

**Bonnes pratiques :**

- Utiliser des tokens JWT avec expiration courte
- Implémenter le refresh token de manière sécurisée
- Hasher les mots de passe avec bcrypt ou Argon2
- Activer l'authentification multi-facteurs (MFA)
- Valider les permissions côté serveur (jamais côté client uniquement)

### 🛡️ Protection contre les attaques courantes

| Attaque | Protection |
|---------|------------|
| XSS | Échapper les sorties, CSP strict |
| CSRF | Tokens CSRF, SameSite cookies |
| SQL Injection | Requêtes paramétrées, ORM |
| SSRF | Validation des URLs, whitelist |

---

## 🔄 CI/CD & Automatisation

### 🔧 Pipeline CI/CD Standard

**Étapes obligatoires :**

1. **Lint** - Vérification du style de code
2. **Tests unitaires** - Couverture minimum 80%
3. **Tests d'intégration** - Vérification des APIs
4. **Analyse de sécurité** - SAST/DAST
5. **Build** - Construction des artefacts
6. **Deploy staging** - Déploiement environnement de test
7. **Tests E2E** - Tests end-to-end
8. **Deploy production** - Déploiement production

```yaml
# Exemple GitHub Actions
name: CI/CD Pipeline
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run tests
        run: npm test
      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

---

## ✅ Qualité & Standards

### 📏 Standards de Code

**Outils recommandés :**

- **JavaScript/TypeScript** : ESLint + Prettier
- **Python** : Black + Flake8 + isort
- **CSS** : Stylelint

**Règles générales :**

- Noms de variables explicites et en anglais
- Fonctions courtes (< 30 lignes)
- Commentaires pour la logique complexe uniquement
- Documentation des APIs (OpenAPI/Swagger)

### 🧪 Tests

| Type | Couverture cible | Outils |
|------|------------------|--------|
| Unitaires | > 80% | Jest, Pytest |
| Intégration | > 60% | Supertest, pytest-django |
| E2E | Parcours critiques | Playwright, Cypress |

---

## 📦 Gestion des Dépendances

### 🔒 Sécurité des dépendances

**Obligatoire :**

- Scanner les vulnérabilités : `npm audit`, `pip-audit`, Snyk
- Mettre à jour régulièrement (au moins mensuel)
- Utiliser des lockfiles (`package-lock.json`, `poetry.lock`)
- Vérifier les licences des dépendances

```bash
# Audit des dépendances
npm audit --audit-level=moderate
pip-audit
```

### 📌 Versioning des dépendances

- Utiliser des versions exactes en production
- Tester les mises à jour majeures en staging d'abord
- Documenter les breaking changes

---

## 🔀 Versioning & Git

### 📝 Conventions de commits

Utiliser [Conventional Commits](https://www.conventionalcommits.org/) :

```
type(scope): description

Types: feat, fix, docs, style, refactor, test, chore
```

**Exemples :**
- `feat(auth): add OAuth2 login`
- `fix(api): handle null response`
- `docs(readme): update installation steps`

### 🌿 Stratégie de branches

```
main (production)
└── develop (intégration)
    ├── feature/xxx
    ├── bugfix/xxx
    └── hotfix/xxx
```

---

## 🔒 Protection des Données

### 🗃️ Données sensibles

**Ne jamais commiter :**

- Clés API, tokens, secrets
- Mots de passe
- Données personnelles (PII)
- Fichiers de configuration locaux

**Solutions :**

- Variables d'environnement
- Gestionnaires de secrets (Vault, AWS Secrets Manager)
- Fichiers `.env` dans `.gitignore`

### 🔐 Chiffrement

- **Au repos** : AES-256 pour les données stockées
- **En transit** : TLS 1.3 minimum
- **Mots de passe** : bcrypt avec cost factor >= 12

---

## 📊 Monitoring & Logs

### 📈 Métriques essentielles

- **Disponibilité** : Uptime, health checks
- **Performance** : Latence P50/P95/P99, throughput
- **Erreurs** : Taux d'erreur, stack traces
- **Business** : KPIs métier

### 📝 Bonnes pratiques de logging

```python
import logging
import json

# Format structuré
logger.info(json.dumps({
    "event": "user_login",
    "user_id": user.id,
    "ip": request.remote_addr,
    "timestamp": datetime.utcnow().isoformat()
}))
```

**Niveaux de log :**
- `DEBUG` : Développement uniquement
- `INFO` : Événements normaux
- `WARNING` : Situations anormales non bloquantes
- `ERROR` : Erreurs nécessitant attention
- `CRITICAL` : Erreurs système graves

---

## ♿ Accessibilité

### 🎯 Standards WCAG 2.1

**Niveau AA minimum :**

- Contraste des couleurs >= 4.5:1
- Navigation au clavier complète
- Textes alternatifs pour les images
- Labels pour tous les formulaires
- Structure de headings logique (h1 > h2 > h3)

### 🔧 Outils de vérification

- **Automatisés** : axe-core, Lighthouse, WAVE
- **Manuels** : Tests avec lecteur d'écran (NVDA, VoiceOver)

```javascript
// Exemple test accessibilité avec Jest + axe
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('should have no accessibility violations', async () => {
  const { container } = render(<Component />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

---

## ⚡ Performance

### 🎯 Objectifs Core Web Vitals

| Métrique | Bon | À améliorer |
|----------|-----|-------------|
| LCP | < 2.5s | > 4s |
| FID | < 100ms | > 300ms |
| CLS | < 0.1 | > 0.25 |

### 🚀 Optimisations clés

**Frontend :**
- Lazy loading des images et composants
- Minification et compression (gzip/brotli)
- CDN pour les assets statiques
- Code splitting

**Backend :**
- Mise en cache (Redis, Memcached)
- Pagination des APIs
- Compression des réponses
- Connection pooling base de données

---

## 📖 Documentation

### 📋 Documentation obligatoire

1. **README.md** - Installation, démarrage rapide
2. **CONTRIBUTING.md** - Guide de contribution
3. **API Documentation** - OpenAPI/Swagger
4. **Architecture Decision Records (ADR)** - Décisions techniques
5. **CHANGELOG.md** - Historique des versions

### 📝 Template README

```markdown
# Nom du Projet

> Description courte

## 🚀 Démarrage rapide

## 📦 Installation

## 🔧 Configuration

## 🧪 Tests

## 📖 Documentation

## 🤝 Contribution

## 📄 Licence
```

---

> 📅 Dernière mise à jour : Novembre 2025
> 
> 👥 Maintenu par l'équipe Phoenix Agency
    
    # Permissions Policy (anciennement Feature-Policy)

---

## 🔐 Authentification & Gestion des Credentials

### Bonnes Pratiques Essentielles

#### 1. **JAMAIS de credentials en dur dans le code**

✅ **BON:**
```javascript
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const apiKey = process.env.API_KEY_SUPABASE;
```

❌ **MAUVAIS:**
```javascript
const googleClientId = 'YOUR_ACTUAL_CLIENT_ID_12345'; // NE JAMAIS FAIRE!
const apiKey = 'sk-proj-xxxxx'; // Credential expose!
```

#### 2. **Variables d'Environnement**

- Stocker TOUS les credentials sensibles dans `.env.local` ou `.env` (JAMAIS commiter!)
- Utiliser `.env.example` pour documenter les variables SANS les valeurs
- Gérer les secrets via GitHub Actions Secrets ou TrueKey

#### 3. **Noms de Clés Standardisés**

**Format pour GitHub Secrets & Supabase:**
```
[PROVIDER]_CLIENT_ID
[PROVIDER]_CLIENT_SECRET
[PROVIDER]_[CUSTOM_FIELD]
```

**Exemples:**
- `GOOGLE_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`
- `APPLE_CLIENT_IDS`
- `AZURE_TENANT_ID`
- `FACEBOOK_APP_ID`

#### 4. **Sécurité des Credentials OAuth2**

**À chaque création de credentials:**
- ✅ Télécharger le fichier JSON depuis le provider
- ✅ Copier les valeurs dans TrueKey ou Password Manager
- ✅ Ne JAMAIS laisser les fichiers JSON traîner sur l'ordinateur
- ✅ Utiliser des Authorized Redirect URIs spécifiques
- ✅ Rotationner les secrets régulièrement (tous les 3-6 mois)
- ❌ NE PAS partager les credentials par email/Slack/Discord

#### 5. **Supabase Auth Configuration**

**Dans Supabase Dashboard UNIQUEMENT:**
- [x] Client IDs pour authentification sociale
- [x] Client Secrets pour backend
- [x] Callback URLs correctement configurées
- [x] Domains autorisés spécifiés

**Les vrais noms de clés dans Supabase:**
- `Client ID` et `Client Secret` (OAuth2 standard)
- `App ID` et `App Secret` (Facebook)
- `Client IDs` (liste CSV - Apple)
- `Secret Key` ou `Private Key` (format spécifique par provider)

#### 6. **Gestion Multi-Environnements**

**Dev**
- Utiliser credentials de dev/sandbox
- Autoriser localhost:3000, localhost:5173

**Staging**
- Credentials de staging distincts
- Domain: staging.example.com

**Production**
- Credentials de production + secrets rotating
- Domain: app.example.com seulement
- Audit logs activés

#### 7. **Checklist Configuration OAuth2**

- [ ] Credentials obtenus depuis provider officiel
- [ ] Valeurs stockées dans TrueKey/Password Manager
- [ ] Variables d'environnement crées correctement
- [ ] GitHub Actions Secrets configurés (noms exacts)
- [ ] Supabase Dashboard mis à jour avec les bons values
- [ ] Authorized Redirect URLs configurées dans le provider
- [ ] Tests d'authentification fonctionnels
- [ ] Documentation mise à jour (SANS les valeurs)
- [ ] Audit log de qui a accédé aux secrets

#### 8. **Rotation des Secrets**

**Procédure obligatoire tous les 6 mois:**
1. Générer nouveau Client Secret dans le provider
2. Tester avec le nouveau secret avant de switcher
3. Mettre à jour GitHub Actions Secrets
4. Mettre à jour Supabase Dashboard
5. Invalider l'ancien secret dans le provider
6. Documenter la rotation dans CHANGELOG.md

#### 9. **Incident Response - Credential Compromise**

Si un credential est exposé:
1. **IMMEDIATEMENT** invalider la clé dans le provider
2. Générer nouveau credential
3. Mettre à jour partout (GitHub, Supabase, TrueKey)
4. Auditer les logs pour usage non-autorisé
5. Documenter l'incident

#### 10. **Documentation Requise**

**Ne JAMAIS documenter:**
- ❌ Client IDs complets
- ❌ Client Secrets
- ❌ API Keys
- ❌ Exemples avec vrais credentials

**Documenter TOUJOURS:**
- ✅ Noms des variables d'environnement
- ✅ Format attendu (UUID, string, etc)
- ✅ Où obtenir chaque credential (lien provider)
- ✅ Procédure de configuration
- ✅ Noms exacts pour GitHub Secrets

### Providers Supportés & Credentials

| Provider | Credentials Nécessaires | Durée de Validité |
|----------|------------------------|-------------------|
| Google | Client ID, Client Secret | Illimité |
| GitHub | Client ID, Client Secret | Illimité |
| Apple | Client IDs, Secret Key (JWT) | 6 mois |
| Facebook | App ID, App Secret | Illimité |
| GitLab | Client ID, Client Secret | Illimité |
| Notion | Client ID, Client Secret | Illimité |
| LinkedIn | Client ID, Client Secret | Illimité |
| Azure/Microsoft | Tenant ID, Client ID, Client Secret | Illimité |
| SMS (Twilio) | Account SID, Auth Token | Illimité |

### Ressources de Sécurité

- [OWASP - Secrets Management](https://owasp.org/)
- [GitHub - Encrypted Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Supabase - Auth Security](https://supabase.com/docs/guides/auth)
- [TrueKey - Password Manager](https://www.truekey.com/)
    response.headers['Permissions-Policy'] = (
        "geolocation=()


---

## 🚦 Rate Limiting & Protection DDoS

### Pourquoi c'est CRITIQUE

- Prévient les attaques DDoS (Denial of Service)
- Protège votre API contre les abus
- Évite que l'app crash sous une charge massive
- Réduit les coûts d'infrastructure

### Implémentation avec Supabase + Express

```javascript
const rateLimit = require('express-rate-limit');

// Rate Limiting global - 100 requêtes par 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limite 100 requêtes par windowMs
  message: 'Trop de requêtes, veuillez réessayer plus tard',
  standardHeaders: true, // Retourne info dans `RateLimit-*` headers
  legacyHeaders: false, // Désactive les headers `X-RateLimit-*`
});

// Rate Limiting strict pour authentification - 5 tentatives par 15 min
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  skipSuccessfulRequests: true, // Ne compte que les erreurs
  message: 'Trop de tentatives de connexion. Réessayez dans 15 minutes.',
});

// Rate Limiting pour API endpoints sensibles - 20 req/min
const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20,
  message: 'Limite API dépassée',
});

app.use(limiter); // Appliquer globalement
app.post('/login', authLimiter, handleLogin);
app.get('/api/events', apiLimiter, getEvents);
```

### Rate Limiting côté Client (React Native)

```javascript
// Throttle/Debounce pour les appels API
import { debounce } from 'lodash';

const debouncedSearch = debounce(async (query) => {
  try {
    const response = await fetch(`/api/search?q=${query}`);
    // ...
  } catch (error) {
    if (error.status === 429) { // Too Many Requests
      console.warn('Limite dépassée, réessayez dans quelques secondes');
    }
  }
}, 500); // Attend 500ms après la dernière frappe

// Retry logic avec exponential backoff
const retryRequest = async (fn, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (error.status === 429 && i < maxRetries - 1) {
        const delay = Math.pow(2, i) * 1000; // 1s, 2s, 4s
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        throw error;
      }
    }
  }
};
```

### Configuration par Endpoint

| Endpoint | Limite | Fenêtre | Raison |
|----------|--------|---------|--------|
| Login | 5 req | 15 min | Prévient brute force |
| API Weather | 100 req | 15 min | Consomme peu de ressources |
| API Traffic | 50 req | 15 min | Appels plus lourds |
| API Events | 30 req | 15 min | Accès DB intensif |
| File Upload | 10 req | 1 h | Protection storage |

---

## 📊 Gestion des Erreurs & Codes HTTP

### Codes HTTP Standards à Respecter

#### 2xx - Succès
- **200 OK**: Requête réussie, réponse contient les données
- **201 Created**: Ressource créée (POST)
- **204 No Content**: Succès sans contenu (DELETE)

#### 4xx - Erreur Client
- **400 Bad Request**: Paramètres invalides
- **401 Unauthorized**: Authentification requise
- **403 Forbidden**: Authentifié mais pas autorisé
- **404 Not Found**: Ressource n'existe pas
- **409 Conflict**: Conflit (ex: doublon)
- **429 Too Many Requests**: Rate limit dépassé

#### 5xx - Erreur Serveur
- **500 Internal Server Error**: Erreur non gérée
- **502 Bad Gateway**: Serveur inaccessible
- **503 Service Unavailable**: Service temporairement indisponible

### Implémentation Error Handling

```javascript
// Middleware de gestion d'erreurs globale
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  
  const errorResponse = {
    success: false,
    error: {
      code: err.code || 'UNKNOWN_ERROR',
      message: err.message || 'Une erreur est survenue',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  };
  
  res.status(statusCode).json(errorResponse);
});

// Exemple d'endpoint avec gestion d'erreurs
app.get('/api/events/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({
        success: false,
        error: { code: 'INVALID_ID', message: 'ID requis' }
      });
    }
    
    const event = await supabase
      .from('events')
      .select()
      .eq('id', id)
      .single();
    
    if (!event.data) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Événement non trouvé' }
      });
    }
    
    res.status(200).json({ success: true, data: event.data });
  } catch (error) {
    console.error('Erreur API:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Erreur serveur' }
    });
  }
});
```

### Gestion d'Erreurs React Native

```javascript
// Service API avec gestion d'erreurs
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers
      },
      ...options
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      // Gestion spécifique par code d'erreur
      switch (response.status) {
        case 400:
          throw new Error(`Requête invalide: ${data.error.message}`);
        case 401:
          // Refresh token ou redirection login
          await refreshToken();
          throw new Error('Session expirée, reconnexion nécessaire');
        case 403:
          throw new Error('Accès refusé');
        case 404:
          throw new Error('Ressource non trouvée');
        case 429:
          throw new Error('Trop de requêtes. Réessayez dans quelques instants.');
        case 500:
          throw new Error('Erreur serveur. Nos équipes ont été notifiées.');
        default:
          throw new Error(data.error?.message || 'Erreur inconnue');
      }
    }
    
    return { success: true, data: data.data };
  } catch (error) {
    console.error(`Erreur API [${endpoint}]:`, error);
    return { success: false, error: error.message };
  }
};

// Utilisation dans component
const getEvents = async () => {
  setLoading(true);
  const result = await apiCall('/api/events');
  
  if (!result.success) {
    setError(result.error);
    // Afficher toast/snackbar avec le message d'erreur
    showNotification(result.error, 'error');
  } else {
    setEvents(result.data);
  }
  setLoading(false);
};
```

### Logging des Erreurs

```javascript
// Enregistrer les erreurs critiques
const logError = (error, context) => {
  console.error(`[${new Date().toISOString()}] ${context}:`, error);
  
  // Envoyer à service monitoring (Sentry, etc)
  if (process.env.NODE_ENV === 'production') {
    // Sentry.captureException(error, { tags: { context } });
    // Ou envoyer à votre système de logging
  }
};
```

### Checklist Gestion d'Erreurs

- ✅ Tous les endpoints retournent le bon code HTTP
- ✅ Messages d'erreur clairs pour l'utilisateur
- ✅ Pas de stack traces visibles en production
- ✅ Retry logic pour erreurs temporaires (429, 503)
- ✅ Logging des erreurs 5xx pour debugging
- ✅ Rate limiting activé sur tous les endpoints
- ✅ Timeout défini pour les requêtes longues
- ✅ Circuit breaker pour services externes
