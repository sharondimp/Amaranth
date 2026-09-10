# Amaranth

An anonymous wish-granting platform. People post wishes (cash or a specific
item, with a short story and optional photos); anonymous "grantors" fund
them directly through Paystack. Only someone who has granted a wish can
message the wisher — the wisher can reply (to say thank you, coordinate
delivery) but can never message first.

## Status

This is a working front-end scaffold with mock data — every page is
clickable and the layout/flow is real, but it's not yet wired to a live
Firebase project or Paystack account.

## What's built

- Landing page (the sparkle hero you approved)
- Browse wishes, with status filters
- Post a wish — cash/item toggle, story, photos, anonymous/known toggle,
  bank details, conditional delivery address for item wishes
- Wish detail — funding via Paystack popup, one-directional chat that
  unlocks after funding, proof-of-receipt placeholder for item wishes
- My Wishes — tracks the current visitor's own wishes

## To run it locally (in Acode or anywhere)

```
npm install
npm run dev
```

## Before this is real, you need to:

### 1. Firebase
- Create a project at console.firebase.google.com
- Enable **Anonymous** sign-in under Authentication → Sign-in method
- Enable **Firestore** (start in test mode, then lock down with security
  rules before launch)
- Copy your config into `src/firebase.js` (replace the `YOUR_...` placeholders)

### 2. Paystack
- Get your public key from the Paystack dashboard, put it in
  `src/utils/paystack.js`
- **Payouts need a backend** — the public key alone can only take
  payments IN. To send money OUT to a wisher's bank account you need a
  Firebase Cloud Function that holds your Paystack **secret** key and calls:
  - `POST /transferrecipient` when someone submits bank details (store
    the returned `recipient_code` in Firestore, never the raw account number)
  - `POST /transfer` once a wish is fully funded, to actually pay them
  This is noted in `src/utils/paystack.js` too.

### 3. Firestore data model (suggested)
- `wishes/{wishId}` — title, story, type, goal, raised, status, photos[],
  isAnonymous, username, ownerUid, recipientCode, address (only readable
  by the wish's grantors, not public)
- `wishes/{wishId}/messages/{messageId}` — from, text, timestamp
  (only writable by: the wish's owner if they've been granted, or any
  grantor of that wish)

### 4. Fraud-check step
Not built yet — the plan discussed was a lightweight "proof of receipt"
photo the wisher uploads after a material wish is delivered, visible only
to that grantor. There's a placeholder card for this on the wish detail
page already.

## Deploying

Once it's wired up: `npm run build`, then deploy the `dist/` folder to
Netlify or Vercel like you normally do.
