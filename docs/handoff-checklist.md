# Handoff Checklist

## Done

- [x] Keystatic switched to GitHub storage mode (local in dev, GitHub in prod)
- [x] Netlify site renamed to `ivanoworkshops` (https://ivanoworkshops.netlify.app)
- [x] Netlify connected to `lmeraz/ivano-site` repo, deploys from `main`
- [x] Client guide written (`docs/client-guide.md`)

## Remaining -- needs domain info

- [ ] Add custom domain in Netlify: Site settings > Domain management > Add domain
- [ ] Update DNS at Hostinger: add CNAME or A record pointing to Netlify (exact values shown in Netlify after adding domain)
- [ ] Wait for DNS propagation (up to 48 hours, usually minutes)
- [ ] Enable Netlify SSL (auto-provisions after DNS resolves)
- [ ] Update `site` field in `astro.config.mjs` to the final domain
- [ ] Update `docs/client-guide.md` replacing `your-domain.com` with actual domain

## Remaining -- needs Ivano

- [ ] Create a GitHub account for Ivano (github.com/signup)
- [ ] Add Ivano as collaborator: `gh api repos/lmeraz/ivano-site/collaborators/THEIR_USERNAME -X PUT`
- [ ] Ivano visits the live `/keystatic` URL and signs in with GitHub for the first time (authorizes OAuth)
- [ ] Walk through the client guide together (15-minute screen share)

## Optional -- full independence

- [ ] Transfer GitHub repo to Ivano's account (Settings > Danger Zone > Transfer)
- [ ] Create Netlify account for Ivano, transfer site to their team
- [ ] Update `keystatic.config.ts` repo field if repo owner changes
- [ ] Cancel Hostinger hosting plan (keep domain registration active)
