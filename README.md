# The Aetherium v0.4 — The Curator Awakens

The Curator UI now calls the Cloudflare Worker `/chat` endpoint. The website does not contain a Gemini API key.

## IMPORTANT BEFORE PUBLIC DEPLOYMENT
The current Cloudflare Worker (configured separately) still has temporary diagnostic error exposure and no robust server-side abuse controls. Remove diagnostic explanations and add server-side rate limiting and bot/abuse mitigation before publishing this frontend to GitHub Pages. Origin headers are not authentication.

The current Worker only uses the latest user message. This frontend sends up to 12 recent messages, but the Worker must be updated to use them for actual conversation continuity.

## Deployment
Upload `index.html` and the `assets/` folder to the repository root after securing the Worker. Do not upload the ZIP itself as the website.
