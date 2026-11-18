# Curator v1.0 — candidate Worker

This is an optional, reviewable replacement for the existing Cloudflare Worker. **Do not deploy until the site is tested and the owner approves.**

- Uses the existing GEMINI_API_KEY secret and CURATOR_LIMITS KV binding.
- Keeps the existing POST /chat message schema and GitHub Pages origin restriction.
- Adds a bounded, server-side institutional knowledge guide and explicit science/speculation/canon rules.
- The per-IP KV limiter is **best effort**, not atomic. Before public launch, review Cloudflare WAF/Turnstile, abuse limits, logs and data handling.
- Never put the API key in GitHub Pages or client-side JS.
- Test with a staging Worker before replacing the live endpoint.
