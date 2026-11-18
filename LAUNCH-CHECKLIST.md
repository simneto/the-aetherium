# Genesis v1.0 release candidate — launch checklist

Status: **NOT launched**. The public v0.4 must remain stable until approved.

1. Open `index.html` locally; navigate Archives, Laboratory, Observatory, Nexus, Researcher Desk and Curator.
2. Check Observatory marker selection, zoom, keyboard controls, and distinction between real and fictional objects.
3. Verify Nexus mission progress, journal persistence and JSON export across page reloads.
4. Verify offline Research Index search in Curator hub. AI chat requires internet and may fail from `file://` due to Worker CORS restrictions; test on staging GitHub Pages.
5. Review scientific content and simplified numerical models for correctness and limitations.
6. Test on iPhone Safari, desktop Safari, Firefox and Chrome; inspect keyboard focus, contrast, and screen-reader labels.
7. Review Worker code for privacy, abuse mitigation, origin controls, rate-limit races, and Gemini API behavior; do not expose API keys in frontend.
8. Deploy Worker to a **staging Worker** with correct secret/KV binding, test AI boundaries and response schema; promote only after approval.
9. Test static site on a staging URL with the correct API origin, then take a GitHub backup and promote release to public Pages.
10. Confirm all pages, paths and live chat after deployment.
