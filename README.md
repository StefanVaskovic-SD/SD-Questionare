# Client Questionnaire System

Next.js 14 aplikacija za kreiranje i upravljanje upitnicima za klijente.

## 🚀 Setup Instrukcije

### 1. Instalacija Dependencies

Dependencies su već instalirani. Ako treba da reinstaliraš:

```bash
npm install
```

### 2. Supabase Setup (VAŽNO - Uradi ovo sada!)

**Korak 1: Kreiraj Supabase projekat**
1. Idi na [supabase.com](https://supabase.com)
2. Kreiraj novi projekat
3. Sačuvaj **Project URL** i **anon/public key**

**Korak 2: Pokreni Database Schema**
1. U Supabase dashboard-u, idi na **SQL Editor**
2. Otvori fajl `DATABASE_SCHEMA.sql` iz ovog projekta
3. Kopiraj ceo SQL kod i pokreni ga u SQL Editor-u
4. Ovo će kreirati sve tabele i storage bucket

**Korak 3: Konfiguriši Environment Variables**
1. Kreiraj fajl `.env.local` u root folderu projekta
2. Dodaj sledeće vrednosti:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_N8N_WEBHOOK_URL=your_n8n_webhook_url_here
NEXT_PUBLIC_ADMIN_PASSWORD=your_admin_password_here
```

**Gde da nađem ove vrednosti:**
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase Dashboard → Settings → API → Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase Dashboard → Settings → API → Project API keys → `anon` `public`
- `NEXT_PUBLIC_N8N_WEBHOOK_URL`: Ovo ćemo dodati kasnije kada dođemo do n8n integracije
- `NEXT_PUBLIC_ADMIN_PASSWORD`: Tvoj admin password za pristup zaštićenim stranicama (default: `admin123`)

### 3. Pokretanje Development Servera

```bash
npm run dev
```

Aplikacija će biti dostupna na [http://localhost:3000](http://localhost:3000)

## 📁 Struktura Projekta

```
├── app/                    # Next.js App Router stranice
│   ├── questionnaires/     # Questionnaire routes
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/
│   ├── ui/                # Reusable UI components
│   └── questionnaire/     # Questionnaire-specific components
├── lib/
│   ├── supabase.ts       # Supabase client
│   └── utils.ts          # Utility functions
├── types/
│   └── questionnaire.ts  # TypeScript types
└── config/
    └── questions.ts      # Questions configuration
```

## 🔐 Security Notes

- **NEVER commit `.env.local`** - već je u `.gitignore`
- Access tokeni se generišu automatski i moraju biti verifikovani na svakom pristupu
- File uploads se čuvaju u Supabase Storage bucket `questionnaire-files`

### Password Protection

Sve stranice su zaštićene password-om **osim** linkova koji se šalju klijentima (questionnaire stranice sa token-om u URL-u).

**Kako radi:**
- Kada admin pristupi bilo kojoj stranici (osim klijentskih linkova), prikazuje se password modal
- Admin unosi password i dobija pristup svim stranicama
- Autentifikacija se čuva u `localStorage` - admin ne mora da unosi password za svaku stranicu
- Admin može da se odjavi klikom na "Logout" dugme na `/questionnaires` stranici

**Javne stranice (bez password-a):**
- `/questionnaires/[type]/[slug]?token=xxx` - Questionnaire forma za klijente
- `/questionnaires/[type]/[slug]/success?token=xxx` - Success stranica za klijente

**Zaštićene stranice (zahtevaju password):**
- `/` - Homepage
- `/questionnaires` - Lista tipova questionnaire-a
- `/questionnaires/[type]` - Kreiranje novog questionnaire-a

## 📝 TODO

- [x] Project setup
- [x] Database schema
- [x] TypeScript types
- [x] Questions config
- [ ] UI components
- [ ] Homepage
- [ ] Create form
- [ ] Client questionnaire page
- [ ] File upload
- [ ] Draft save
- [ ] n8n webhook integration

## 🛠️ Development

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint
npm run lint
```

