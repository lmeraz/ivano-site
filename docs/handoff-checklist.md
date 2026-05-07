# Handoff Checklist

## Done

- [x] Keystatic switched to GitHub storage mode (local in dev, GitHub in prod)
- [x] Netlify site renamed to `ivanoworkshops` (https://ivanoworkshops.netlify.app)
- [x] Netlify connected to `lmeraz/ivano-site` repo, deploys from `main`
- [x] Client guide written (`docs/client-guide.md`)
- [x] Custom domain `ivanoconte.com` added in Netlify (apex primary, www redirects)
- [x] Hostinger DNS configured (apex A → 75.2.60.5, www CNAME → ivanoworkshops.netlify.app)
- [x] Netlify SSL provisioned (Let's Encrypt, valid through 2026-08-05) and Force HTTPS enabled
- [x] `site` in `astro.config.mjs` and `siteUrl` in site settings updated to `https://ivanoconte.com`
- [x] `docs/client-guide.md` and `README.md` updated with the live domain

## Remaining -- needs deploy

- [ ] Commit and push the `astro.config.mjs` + `site-settings.json` changes to `main` so Netlify rebuilds with correct canonical / OG URLs
- [ ] After redeploy, view source on https://ivanoconte.com/ and confirm `<link rel="canonical">` and `og:url` reference `ivanoconte.com`

## Remaining -- GitHub OAuth app for Keystatic

The OAuth app's URLs must match the live domain or production CMS sign-in will fail.

- [ ] In GitHub > Settings > Developer settings > OAuth Apps, open the existing Keystatic OAuth app
- [ ] Update **Homepage URL** to `https://ivanoconte.com`
- [ ] Update **Authorization callback URL** to `https://ivanoconte.com/api/keystatic/github/oauth/callback`
- [ ] (No need to rotate the client secret — just update the URLs)

## Remaining -- needs Ivano

- [ ] Create a GitHub account for Ivano (github.com/signup)
- [ ] Add Ivano as collaborator: `gh api repos/lmeraz/ivano-site/collaborators/THEIR_USERNAME -X PUT`
- [ ] Ivano visits https://ivanoconte.com/keystatic and signs in with GitHub for the first time (authorizes OAuth)
- [ ] Walk through the client guide together (15-minute screen share)

## Optional -- nice-to-haves

- [ ] Switch apex DNS from A record (`75.2.60.5`) to ALIAS pointing to `apex-loadbalancer.netlify.com` for resilience if Netlify changes IPs (Hostinger ALIAS = pick CNAME, name `@`, target `apex-loadbalancer.netlify.com`)
- [ ] Add a CAA record at Hostinger restricting cert issuance to Let's Encrypt

## Optional -- full independence

- [ ] Transfer GitHub repo to Ivano's account (Settings > Danger Zone > Transfer)
- [ ] Update `repo` field in `keystatic.config.ts` if repo owner changes
- [ ] Create Netlify account for Ivano, transfer site to their team
- [ ] Cancel Hostinger hosting plan (keep domain registration active)
