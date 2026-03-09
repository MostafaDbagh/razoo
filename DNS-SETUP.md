# barber2door.com DNS Fix — ERR_NAME_NOT_RESOLVED

## Problem
- **A record** points to `216.198.79.1` (name.com parking) — **wrong**
- Vercel needs its own IP for the root domain

## Steps to Fix (name.com)

### 1. Edit the A Record (root domain)
- Go to **name.com** → Manage DNS → Edit the A record
- **HOST:** `barber2door.com` (or `@` depending on name.com)
- **TYPE:** A
- **ANSWER:** Change from `216.198.79.1` to **`76.76.21.21`** (Vercel's IP)
- **TTL:** 300 (or 60 for faster propagation)
- Save

### 2. Verify CNAME (www)
- **HOST:** `www`
- **TYPE:** CNAME  
- **ANSWER:** Use exactly what Vercel shows
  - Vercel Dashboard → razoo → Settings → Domains → Click `www.barber2door.com`
  - Copy the CNAME target (e.g. `cname.vercel-dns.com` or `xxx.vercel-dns-017.com`)
- Your current `a1043d45ace6e406.vercel-dns-017.com` may be correct if Vercel assigned it

### 3. Confirm in Vercel
- Vercel → razoo → Settings → Domains
- Both domains should show **Valid Configuration**
- If invalid, Vercel will show the exact records to add

## Propagation
- **5 minutes ago** = too soon. DNS often needs **15 min–2 hours**
- name.com: up to **48 hours**
- Check: https://dnschecker.org/#A/barber2door.com

## While Waiting
- Site still works at **https://razoo.vercel.app**
- After DNS propagates, **https://www.barber2door.com** will work
