# Handoff Checklist

## Done

- [x] Netlify site `ivanoworkshops` connected to `lmeraz/ivano-site`, auto-deploys from `main`
- [x] Custom domain `ivanoconte.com` live with SSL (apex primary, www redirects)
- [x] Hostinger DNS: apex A → `75.2.60.5`, www CNAME → `ivanoworkshops.netlify.app`
- [x] Netlify Force HTTPS enabled, Let's Encrypt cert valid through 2026-08-05
- [x] `site` in `astro.config.mjs` and `siteUrl` in `src/content/singletons/site-settings.json` set to `https://ivanoconte.com`
- [x] Keystatic CMS in GitHub mode using a **GitHub App** (`ivano-conte-keystatic`, client_id `Iv23limw2C4ifNm1BUDc`)
- [x] Netlify env vars set: `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`, `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`
- [x] Production `/keystatic` sign-in verified working (Luis)
- [x] Old OAuth App (the wrong setup) deleted from github.com/settings/developers
- [x] Client guide written (`docs/client-guide.md`)
- [x] Ivano added as collaborator on `lmeraz/ivano-site` (`ivanoconte-create`, write access)

## Remaining -- needs Ivano

- [ ] Ivano visits https://ivanoconte.com/keystatic, signs in with GitHub, authorizes the `ivano-conte-keystatic` app
- [ ] 15-min screen share walking through the client guide and a sample edit

## Worth considering

- [ ] Rotate the GitHub App's client secret. The value was echoed in CLI output during setup and now lives in the local `.env` (gitignored) and Netlify env. To rotate: github.com/settings/apps/ivano-conte-keystatic → **Generate a new client secret** → update `KEYSTATIC_GITHUB_CLIENT_SECRET` in Netlify → trigger redeploy

## Optional -- infra polish

- [ ] Swap apex A record (`75.2.60.5`) for an ALIAS to `apex-loadbalancer.netlify.com` at Hostinger (more resilient if Netlify changes load-balancer IPs). At Hostinger: pick CNAME, name `@`, target `apex-loadbalancer.netlify.com` — it shows as "CNAME ALIAS" after saving
- [ ] Add a CAA record at Hostinger restricting cert issuance to Let's Encrypt

## Optional -- full independence

- [ ] Transfer GitHub repo to Ivano's account (Settings > Danger Zone > Transfer)
- [ ] Update `repo` field in `keystatic.config.ts` if repo owner changes
- [ ] Update the GitHub App's owner / installation if the repo transfers
- [ ] Create Netlify account for Ivano, transfer site to their team
- [ ] Cancel Hostinger hosting plan (keep the domain registration active)
