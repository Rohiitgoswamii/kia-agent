# Kia (Gemini version) — setup

## 1. Get a free key
aistudio.google.com → "Get API key". Never paste it in code or chat.

## 2. Deploy backend
1. New GitHub repo `kia-agent` → upload this folder's contents (api/, public/, package.json, README.md).
2. vercel.com → Add New → Project → import `kia-agent`.
3. Environment Variables (before deploying):
   - GEMINI_API_KEY   = your key            (required)
   - GITHUB_USER      = your GitHub username
   - CONTACT_EMAIL    = your real email
   - GEMINI_MODEL     = optional, default gemini-2.5-flash
   - SITE_URL / ALLOWED_ORIGINS = optional, defaults to rohiit.online
4. Deploy → open https://YOUR-APP.vercel.app/kia-widget.js to confirm it's live.

## 3. Add to your portfolio (before </body> in index.html)
<script src="https://YOUR-APP.vercel.app/kia-widget.js"
        data-endpoint="https://YOUR-APP.vercel.app/api/kia" defer></script>

## Troubleshooting
- 404 / "limit: 0" in Vercel logs → model has no free tier for you; set GEMINI_MODEL to another free one.
- CORS error → add your exact site origin to ALLOWED_ORIGINS.
- 429 → free-tier rate limit hit; wait or enable billing.

## Placeholders
- widget: --kia-accent colors, header text, greeting, chips, input placeholder (top of kia-widget.js)
- kia.js: "Vibe" line in SYSTEM prompt
