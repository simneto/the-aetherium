# The Aetherium — Genesis v0.5 checkpoint

This ZIP is a development checkpoint, NOT a public deployment. It extends the supplied v0.4 site without changing its existing Curator API integration.

## Preview

Unzip and open `index.html` in a browser, then choose Archives. The new Archives page works offline with embedded structured record data. For a local HTTP preview run `python3 -m http.server 8000` inside this folder, then open `http://localhost:8000`.

## Included

- `index.html`: existing v0.4 homepage, plus Archives navigation
- `archives.html`: responsive archive interface
- `archives.js`: search, filters, record details, cross-references and structured records
- `archives-data.json`: editable content source snapshot (the JS embeds the same records for offline previews)
- `assets/`: existing site assets

## Notes

- Science entries are introductory summaries, not peer-reviewed articles; sources are further reading, not citations to every individual claim. Review science content before a public release.
- Speculation and fictional canon are clearly labeled.
- The Curator remains unchanged from v0.4. The public Worker endpoint may still be called if you open the existing Curator widget while previewing the homepage.
- Avoid deploying this development ZIP to GitHub Pages until it has been tested.


## v0.7 — Cosmic Cartography
- `observatory.html` is the new Observatory, with separate Known Cosmos and Aetherium Expanse layers.
- `observatory-data.js` holds six real astronomy profiles and five explicitly fictional canon records.
- `observatory.js` provides map marker selection, drag-to-pan, scroll/button/keyboard zoom, text search, accessible record list, and related Archive links.
- The chart is a *schematic illustration*, not a sky map, physical-scale representation, ephemeris, or observational measurement.
- The First Anomaly narrative continues at Station Halcyon; the 43-second discrepancy is fictional.
- No changes to the Cloudflare Worker or Curator intelligence.
- Open `index.html` then `Observatory`; no build server is required.


## v0.8 — Research Nexus
- `nexus.html`, `nexus-data.js`, and `nexus.js` provide three cross-division research missions.
- Mission completion checkboxes and optional journal notes persist in localStorage on the current browser only; they are not server-synced.
- Missions link directly to Archive entries and Observatory objects; Laboratory wave tab deep-linking is implemented in `laboratory.js`.
- The Observatory now accepts `?layer=fiction&object=relay` (or `layer=real&object=andromeda`) to open a specific object.
- Fictional anomalies are explicitly labeled; scientific comparisons are not presented as evidence of fictional claims.
- The Curator and Cloudflare Worker are unchanged. Keep the public GitHub Pages v0.4 deployment untouched.

## v0.9 — Institutional Refinement
- Unified navigation across all six wings.
- `researcher.html` + `researcher.js`: researcher designation, focus, journal, mission dashboard, JSON backup.
- `genesis-ui.js`: active navigation state.
- `QUALITY-REVIEW.md`: completed work and outstanding release gates.
- No changes to Curator backend.

## v1.0 Genesis release candidate (NOT YET PUBLICLY DEPLOYED)
- Added `curator.html`, an integrated Curator research hub and offline searchable index of 15 Archive records.
- Added `curator-catalog.js` (static local catalog) and `curator.js` (existing Worker API client).
- Added `cloudflare-worker/worker.js` with institutional knowledge and clear science/speculation/canon rules. **This Worker is NOT deployed.**
- Existing homepage Curator remains unchanged until the Worker upgrade is approved and tested.
- Browser-local journal and missions are not sent automatically to the Curator.
- The current live Worker does not yet have the new institutional prompt; its responses may not match the v1.0 guide until the backend is separately deployed.
