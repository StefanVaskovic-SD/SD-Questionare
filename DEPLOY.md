# Deployment Guide

## Preporuka: Vercel 🚀

**Zašto Vercel?**
- ✅ Napravljen od strane Next.js tima - najbolja integracija
- ✅ Automatske optimizacije za Next.js
- ✅ Besplatan tier sa generous limitima
- ✅ Automatski SSL sertifikati
- ✅ Edge functions podrška
- ✅ Jednostavan setup (1 klik deploy)
- ✅ Automatski deploys na push u main branch

**Render** je takođe dobar, ali Vercel je bolji izbor za Next.js projekte.

---

## Korak 1: Git Setup

### 1.1. Inicijalizuj Git repo

```bash
git init
git add .
git commit -m "Initial commit: Client Questionnaire System"
```

### 1.2. Kreiraj GitHub repo

1. Idi na [github.com](https://github.com)
2. Klikni "New repository"
3. Ime: `client-questionnaire-system` (ili kako želiš)
4. **NE** kreiraj README, .gitignore ili license (već imamo)
5. Klikni "Create repository"

### 1.3. Push na GitHub

```bash
git remote add origin https://github.com/TVOJ_USERNAME/client-questionnaire-system.git
git branch -M main
git push -u origin main
```

---

## Korak 2: Vercel Deployment

### 2.1. Kreiraj Vercel Account

1. Idi na [vercel.com](https://vercel.com)
2. Sign up sa GitHub account-om (najlakše)

### 2.2. Deploy Project

1. Klikni "Add New Project"
2. Importuj GitHub repo (`client-questionnaire-system`)
3. Vercel će automatski detektovati Next.js
4. **Environment Variables** - dodaj sledeće:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_N8N_WEBHOOK_URL=your_n8n_webhook_url
```

5. Klikni "Deploy"

### 2.3. Post-Deploy

- Vercel će automatski dodeliti URL (npr. `client-questionnaire-system.vercel.app`)
- Možeš dodati custom domain kasnije
- Svaki push u `main` branch će automatski deploy-ovati novu verziju

---

## Korak 3: Render Deployment (Alternativa)

Ako ipak želiš Render:

### 3.1. Kreiraj Render Account

1. Idi na [render.com](https://render.com)
2. Sign up sa GitHub account-om

### 3.2. Kreiraj Web Service

1. Klikni "New +" → "Web Service"
2. Connect GitHub repo
3. Settings:
   - **Name**: `client-questionnaire-system`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free (ili paid)

### 3.3. Environment Variables

Dodaj u Render dashboard:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_N8N_WEBHOOK_URL=your_n8n_webhook_url
```

### 3.4. Deploy

- Klikni "Create Web Service"
- Render će automatski build-ovati i deploy-ovati

---

## Korak 4: Post-Deploy Checklist

### 4.1. Testiraj Deployment

- [ ] Homepage se učitava
- [ ] Možeš kreirati questionnaire
- [ ] Link sa tokenom radi
- [ ] Forma se može popuniti
- [ ] Save Draft radi
- [ ] Submit radi
- [ ] File upload radi
- [ ] Webhook se poziva

### 4.2. Update n8n Webhook URL

Ako si koristio `localhost:3000` u n8n webhook URL-u, update-uj ga na production URL:

```
https://your-app.vercel.app/questionnaires/...
```

### 4.3. Supabase Storage

Proveri da li Supabase Storage bucket `questionnaire-files` ima pravilne permissions za production.

---

## Troubleshooting

### Build Errors

Ako dobiješ build errors:
1. Proveri da li su sve environment variables postavljene
2. Proveri console logove u Vercel/Render dashboard-u
3. Testiraj lokalno: `npm run build`

### Environment Variables

- **VAŽNO**: Sve `NEXT_PUBLIC_*` varijable moraju biti postavljene u Vercel/Render dashboard-u
- Ne commit-uj `.env.local` fajl (već je u `.gitignore`)

### CORS Issues

Ako imaš CORS probleme sa Supabase:
- Proveri Supabase dashboard → Settings → API → CORS settings
- Dodaj production URL u allowed origins

---

## Production Best Practices

1. **Custom Domain**: Dodaj custom domain u Vercel/Render settings
2. **SSL**: Automatski se dodaje SSL sertifikat
3. **Monitoring**: Koristi Vercel Analytics ili Render logs
4. **Backups**: Supabase automatski pravi backup-e baze
5. **Error Tracking**: Razmotri dodavanje Sentry ili sličnog servisa

---

## Support

Ako imaš problema sa deployment-om:
1. Proveri Vercel/Render logs
2. Proveri da li su environment variables postavljene
3. Testiraj lokalno sa `npm run build`

