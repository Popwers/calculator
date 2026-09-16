# AGENTS.md

Static HTML calculator. The browser loads the minified CSS and JS. Source copies sit beside those files. There is no compiler in this repo.

## Layout

- `index.html` is the page. Language is French. Decimal separator is a comma. Multiply is `x`.
- `css/style.scss` is the stylesheet source. `css/style.min.css` is what the page loads.
- `js/index.tsx` is the TypeScript source. `js/index.min.js` is what the page loads.
- Equals uses `eval` after rewriting `x` to `*` and `,` to `.`.

## Run

Open `index.html` in a browser. If you change the source files, rebuild the `.min` files yourself. This repo has no build script.

## Constraints

Do not add `package.json`, Vite+, or a JavaScript toolchain.
