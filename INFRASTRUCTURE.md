# 🏗️ Bulletin - Infrastructure Documentation

> **IMPORTANT**: Cette documentation reflète les choix techniques RÉELS du projet.

## ✅ Stack Technique Validé

### Hébergement
- **Render.com** - TOUT est hébergé sur Render (containers, services, workers)
- **Podman** - Containerisation (pas Docker)
- **PAS de VM** - Pas de serveurs virtuels Oracle Cloud
- **PAS d'Azure** - Bien qu'on ait EntraID disponible

### Base de Données
- **Supabase** (PostgreSQL) - Free tier, hébergé par Supabase

### Email / Newsletters  
- **Oracle Cloud Email Delivery** - IMAP/SMTP pour newsletters
- Configuration via GitHub Secrets

### Intelligence Artificielle
- **HuggingFace Inference API** - 100% GRATUIT
- Tokens: TOKEN_HF_BULLETIN1 (primary) + TOKEN_HF_BULLETIN2 (fallback)
- Aucun coût IA

### APIs Externes
- **AUCUNE API PAYANTE** ❌
- Toutes les APIs utilisées sont gratuites
- **Monétisation**: Annonces et publicités uniquement

---

## 🚀 Architecture sur Render

### Services Déployés

```yaml
Render Services:
  1. bulletin-web:
      type: Web Service
      runtime: Node.js 18
      build: podman build
      port: 3000
      instances: 1 (Free tier)
      
  2. bulletin-api:
      type: Web Service  
      runtime: Node.js 18
      endpoints: /api/*
      port: 3001
      
  3. n8n-automation:
      type: Web Service
      runtime: Docker (n8n image)
      port: 5678
      plan: Starter ($7/mois)
      
  4. textbelt-sms:
      type: Background Worker
      runtime: Node.js 18
      plan: Starter ($7/mois)
```

### Containerfile (Podman)

```dockerfile
# Bulletin App - Podman Container
FROM node:18-alpine

WORKDIR /app

# Dependencies
COPY package*.json ./
RUN npm ci --only=production

# Source code
COPY . .

# NO SECRETS IN IMAGE!
EXPOSE 3000

CMD ["npm", "start"]
```

---

## 📧 Newsletters avec Oracle Cloud

### Configuration IMAP/SMTP

**Tous les secrets dans GitHub Secrets:**

```env
# NE JAMAIS commiter ces valeurs!
ORACLE_SMTP_HOST=smtp.email.eu-paris-1.oci.oraclecloud.com
ORACLE_SMTP_PORT=587
ORACLE_SMTP_USER=ocid1.user.oc1...
ORACLE_SMTP_PASSWORD=<généré OCI>
ORACLE_SMTP_FROM=noreply@bulletin.com

ORACLE_IMAP_HOST=imap.email.eu-paris-1.oci.oraclecloud.com
ORACLE_IMAP_PORT=993
ORACLE_IMAP_USER=ocid1.user.oc1...
ORACLE_IMAP_PASSWORD=<généré OCI>
```

### Limites Gratuites

- 📨 **100 emails/jour** (Oracle Free Tier)
- 📨 Upgrade à **1000+/jour** si croissance
- ✅ SPF/DKIM/DMARC configurés
- ✅ Bounce/Complaint handling

---

## 🔐 Secrets Management

### GitHub Secrets UNIQUEMENT

**❌ ZERO fichier .env**  
**✅ Tous secrets dans GitHub → Settings → Secrets**

```yaml
# Oracle Email
ORACLE_SMTP_HOST
ORACLE_SMTP_PORT  
ORACLE_SMTP_USER
ORACLE_SMTP_PASSWORD
ORACLE_IMAP_HOST
ORACLE_IMAP_PORT
ORACLE_IMAP_USER
ORACLE_IMAP_PASSWORD

# HuggingFace IA (GRATUIT)
TOKEN_HF_BULLETIN1
TOKEN_HF_BULLETIN2

# Supabase
SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY

# GitHub
GITHUB_TOKEN

# Expo
EXPO_PUSH_TOKEN

# N8N
N8N_WEBHOOK_URL
N8N_API_KEY
```

---

## 💰 Coûts Réels

### Gratuit (Free Tier)

- ✅ **Render**: 1 Web Service gratuit
- ✅ **Supabase**: Database gratuite
- ✅ **HuggingFace**: IA gratuite illimitée
- ✅ **Oracle Email**: 100 emails/jour gratuits
- ✅ **GitHub**: Repos + Actions gratuits
- ✅ **Expo**: Push notifications gratuites

### Payant

- 💵 **Render N8N**: ~$7/mois (automation)
- 💵 **Render TextBelt**: ~$7/mois (SMS worker)

### APIs - AUCUN COÛT ❌

- ✅ **Météo**: API gratuite (OpenWeatherMap free tier)
- ✅ **Trafic**: Données publiques gratuites
- ✅ **Maps**: Alternatives gratuites (OpenStreetMap)
- ✅ **Toutes autres APIs**: 100% gratuites

**TOTAL: ~$14/mois** (hors gratuit)

### 💸 Monétisation

**Sources de revenus:**
- 📢 **Annonces payantes** des utilisateurs
- 📢 **Publicités** dans l'app
- 📢 PAS de frais d'abonnement utilisateur

---

## 🚀 Déploiement sur Render

### 1. Connexion GitHub

```bash
# Render détecte automatiquement:
- Containerfile (Podman)
- render.yaml (configuration)
```

### 2. Configuration render.yaml

```yaml
services:
  - type: web
    name: bulletin-web
    runtime: docker
    dockerfilePath: ./Containerfile
    dockerCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      # Tous les secrets depuis Render Dashboard
    
  - type: web
    name: bulletin-api
    runtime: docker
    dockerfilePath: ./Containerfile.api
    
  - type: worker
    name: textbelt-worker
    runtime: docker
    dockerfilePath: ./Containerfile.sms
```

### 3. Build avec Podman

```bash
# Local testing
podman build -t bulletin:latest .
podman run -p 3000:3000 bulletin:latest

# Render builds automatically on push
git push origin main
```

### 4. Secrets sur Render

**Render Dashboard → Service → Environment:**
- Ajouter tous les secrets GitHub
- Render injecte dans containers
- Pas de .env nécessaire!

---

## 🔒 Sécurité

### Application

- ✅ **HTTPS forcé** (Render SSL automatique)
- ✅ **Rate limiting**: 100 req/min
- ✅ **Input sanitization**: XSS/SQL protection
- ✅ **CORS**: Origines whitelistées
- ✅ **CSP**: Content Security Policy
- ✅ **Helmet.js**: Headers sécurisés

### Données

- ✅ **Encryption at rest**: Supabase AES-256
- ✅ **Encryption in transit**: TLS 1.3
- ✅ **Secrets**: GitHub + Render uniquement
- ✅ **Backups**: Supabase automatiques

### Infrastructure

- ✅ **Containers rootless**: Podman sécurisé
- ✅ **DDoS protection**: Render built-in
- ✅ **Monitoring**: Render metrics
- ✅ **Logs**: Render centralisés

---

## 📊 Monitoring

### Render Dashboard

- **Metrics**: CPU, RAM, Requests/sec
- **Logs**: Temps réel + recherche
- **Alerts**: Email si service down
- **Deploys**: Historique + rollback

### Health Checks

```javascript
// /health endpoint
app.get('/health', async (req, res) => {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    services: {
      database: await checkSupabase(),
      email: await checkOracleEmail(),
      ai: await checkHuggingFace(),
    },
    version: process.env.GIT_SHA
  };
  
  res.json(health);
});
```

---

## 🎯 Authentification (Optionnel)

### EntraID Disponible

Bien qu'on n'utilise **PAS Azure**, on a **EntraID** disponible:

- Possibilité d'authentification Microsoft
- SSO pour entreprises
- Peut être ajouté plus tard si besoin

---

## 📚 Documentation Complète

### Liens Utiles

- [Render Documentation](https://render.com/docs)
- [Podman Guide](https://docs.podman.io/)
- [Oracle Email Delivery](https://docs.oracle.com/en-us/iaas/Content/Email/)
- [Supabase Docs](https://supabase.com/docs)
- [HuggingFace Inference](https://huggingface.co/docs/inference-endpoints/)

---

## 🆘 Support

### En cas de problème:

1. **Logs Render**: Dashboard → Service → Logs
2. **Health Check**: `curl https://bulletin.onrender.com/health`
3. **Secrets**: Vérifier Render Environment variables
4. **Database**: Supabase Dashboard
5. **Contact**: Phoenix Agency

---

## 📝 Décisions Techniques Résumées

| Aspect | Choix | Raison |
|--------|-------|--------|
| Hébergement | **Render** | Simplicité, free tier, containers |
| Container | **Podman** | Sécurité rootless, compatibilité |
| Database | **Supabase** | PostgreSQL gratuit, temps réel |
| Email | **Oracle Cloud** | SMTP/IMAP gratuit, fiable |
| IA | **HuggingFace** | Gratuit illimité, puissant |
| APIs | **Gratuites uniquement** | Pas de coûts cachés |
| Secrets | **GitHub + Render** | Jamais dans code |
| Monétisation | **Annonces + Pubs** | Revenue model |

---

**Infrastructure maintenue par:** Phoenix Agency  
**Dernière mise à jour:** 2025-11-25  
**Version:** 1.0.0  
**Coût total:** ~$14/mois
