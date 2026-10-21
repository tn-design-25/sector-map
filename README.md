# Wonderstruct Sector City Map

Interactive isometric map of Wonderstruct's six sectors and 33 markets, embedded on the Webflow homepage.

## How it reaches the website
Vercel serves `sector-map.js` from this repo. The Webflow homepage loads it with one Code Embed:

```html
<div id="ws-sector-map"></div>
<script src="https://YOUR-VERCEL-URL/sector-map.js" defer></script>
```

Every push to `main` redeploys automatically. Webflow does not need to be republished.

## How to change it
1. Edit `src/prototype.html` (the art, labels, copy, and behavior all live here).
2. Run `python3 src/build.py`. It rebuilds `sector-map.js` with every class and ID prefixed `wsm-` so the site's styles can't collide with it.
3. Open `index.html` locally to check, then commit both files.

## Notes
- Icons use the Font Awesome kit already in the Webflow site head (`fa-sharp fa-regular`).
- Links go to `/industries/<sector>` and `/industries/<sector>#<market>`. To override any link, set `window.WSM_LINKS = {'nuclear': '/industries/nuclear'}` before the script loads.
- GSAP loads from cdnjs if the page does not already have it.
- Build log and decisions: Claude project doc `claude/sector-city-map-build-log.md`.
