# Setup backend: database, autenticazione, pagamenti

Guida passo-passo per attivare le funzionalità aggiunte (login, anamnesi salvata, abbonamenti). Tutti questi valori vanno inseriti su **Vercel → progetto kinesis-studio → Settings → Environment Variables** (Production + Preview), poi si fa un redeploy.

## 1. Database Postgres (Supabase)

1. Vai su [supabase.com](https://supabase.com) → crea account gratuito → **New Project**.
2. Scegli nome progetto, password del database (salvala), regione vicina (es. Frankfurt/EU).
3. Attendi il provisioning (~2 minuti).
4. Vai su **Project Settings → Database → Connection string → URI**, modalità **Transaction** (porta 6543, per compatibilità serverless).
5. Copia la stringa, sostituisci `[YOUR-PASSWORD]` con la password scelta al punto 2.
6. Su Vercel, imposta:
   - `DATABASE_URL` = la stringa copiata

Alternativa equivalente: [neon.com](https://neon.com) (stesso procedimento, connection string già pronta all'uso).

### Applicare lo schema al database

Dopo aver impostato `DATABASE_URL` anche in un file locale `.env` (non committato), da terminale nel progetto:

```
npx prisma migrate dev --name init
```

Questo crea le tabelle (User, Account, Session, Subscription, AnamnesiRecord, ecc.) sul database reale.

## 2. AUTH_SECRET (obbligatorio)

Da terminale nel progetto:

```
npx auth secret
```

Copia il valore generato in Vercel come `AUTH_SECRET`. Imposta anche `NEXTAUTH_URL` = l'URL del sito live (es. `https://kinesis-studio-9ou2.vercel.app`).

## 3. Google OAuth (login con Google)

1. Vai su [console.cloud.google.com](https://console.cloud.google.com/apis/credentials).
2. Crea un progetto (o usane uno esistente) → **Create Credentials → OAuth client ID**.
3. Tipo applicazione: **Web application**.
4. **Authorized redirect URIs**, aggiungi:
   `https://kinesis-studio-9ou2.vercel.app/api/auth/callback/google`
   (e la stessa cosa con `http://localhost:3000/...` se vuoi testare in locale).
5. Copia **Client ID** e **Client Secret**.
6. Su Vercel: `AUTH_GOOGLE_ID` = Client ID, `AUTH_GOOGLE_SECRET` = Client Secret.

Se salti questo passaggio, il login con email/password funziona comunque — solo il bottone "Continua con Google" darà errore.

## 4. Stripe (abbonamenti)

1. Crea account su [dashboard.stripe.com](https://dashboard.stripe.com) (puoi partire in modalità *test*, poi passare a *live* quando sei pronto a vendere davvero).
2. Vai su **Product catalog → Add product**, crea **3 prodotti ricorrenti**:
   - "Kinesis Studio — Mensile", prezzo ricorrente €14,99 / mese
   - "Kinesis Studio — 6 mesi", prezzo ricorrente €69,99 / ogni 6 mesi
   - "Kinesis Studio — 12 mesi", prezzo ricorrente €149,99 / ogni 12 mesi
3. Per ciascuno, copia il **Price ID** (inizia con `price_...`).
4. Su Vercel:
   - `STRIPE_PRICE_MONTHLY` = price ID mensile
   - `STRIPE_PRICE_SEMIANNUAL` = price ID 6 mesi
   - `STRIPE_PRICE_ANNUAL` = price ID 12 mesi
5. Vai su **Developers → API keys**, copia la **Secret key** → `STRIPE_SECRET_KEY` su Vercel.
6. Vai su **Developers → Webhooks → Add endpoint**:
   - URL: `https://kinesis-studio-9ou2.vercel.app/api/stripe/webhook`
   - Eventi da ascoltare: `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`
   - Copia il **Signing secret** (inizia con `whsec_...`) → `STRIPE_WEBHOOK_SECRET` su Vercel.

## 5. Redeploy

Dopo aver impostato le variabili su Vercel, vai su **Deployments → ⋯ sull'ultimo deploy → Redeploy** (le env var non si applicano retroattivamente a un deploy già completato).

## Checklist rapida

- [ ] `DATABASE_URL` impostata + `npx prisma migrate dev` eseguito
- [ ] `AUTH_SECRET` + `NEXTAUTH_URL` impostate
- [ ] Google OAuth configurato (opzionale)
- [ ] 3 prodotti Stripe creati, price ID copiati
- [ ] `STRIPE_SECRET_KEY` + `STRIPE_WEBHOOK_SECRET` impostate
- [ ] Redeploy effettuato
