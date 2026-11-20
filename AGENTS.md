# Instructions for AI agents

This repo powers the interactive sector map on the Wonderstruct homepage (Webflow). GitHub Pages serves `sector-map.js`; the homepage loads it from https://tn-design-25.github.io/sector-map/sector-map.js.

## Every change
1. Edit `src/prototype.html` only. Never hand-edit `sector-map.js`.
2. Run `python3 src/build.py` to rebuild `sector-map.js`.
3. Open `index.html` to check the map loads with no console errors.
4. Commit both `src/prototype.html` and `sector-map.js` together, with a plain-English commit message.
5. Commit to `main` unless told to open a pull request.

## Don't change
- The file name `sector-map.js` or the mount ID `ws-sector-map`. Webflow depends on both.
- The `wsm-` class prefix added by the build script.
- Icon markup `fa-sharp fa-regular` (loaded by the site's Font Awesome kit).

## Style
- Writing: no em dashes, active voice.
- Art: true isometric (30°). No oil and gas imagery.
