# Packaging by Caio

An independent YouTube title and thumbnail portfolio: six existing videos, each shown with a captured original and three proposed pairs. The concepts were not uploaded, live tested, or endorsed by the video creators. No performance increase is claimed.

## Local preview

```sh
npm ci
npx playwright install chromium
npm run lint
npm run typecheck
npm test
npm run build
npm run serve
```

Open `http://127.0.0.1:4191/youtube-packaging-case-studies/`. All public paths are relative so the same output works under the GitHub Pages project path.

## Content and provenance

The six curated studies live in `src/cases.mjs`. `asset-provenance.json` records every captured source and finished variant, its agency-workspace-relative source path, source SHA-256, web derivative SHA-256, and dimensions. The public images are resized/compressed display copies; the source records and masters remain in the private/local agency workspace. The selected résumé source title was captured through localization, so the page labels it accordingly.

The site uses local Caveat font files under the included [Open Font License](src/assets/fonts/OFL.txt). Site code and explanatory copy are by Caio; original video and thumbnail rights belong to their respective creators. The displayed redesign artwork is not offered as a reusable image library.

## Publishing

The `pages.yml` workflow verifies content and browser behavior, builds `dist/`, and publishes it with GitHub Pages from `main`. This site is separate from the data analyst portfolio and has no link there.
