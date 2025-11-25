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
