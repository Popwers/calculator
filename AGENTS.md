# AGENTS.md

Static HTML calculator. The browser loads the minified CSS and JS. Source copies sit beside those files. There is no compiler in this repo.

## Layout

- `index.html` is the page. `lang` is `fr`. The title is Calculatrice.
- `css/style.scss` is the stylesheet source. The page loads `css/style.min.css`.
- `js/index.tsx` is the TypeScript source. The page loads `js/index.min.js`.
- The display is `header p`. Keys are `section span`. The running expression is the string `pile`.

## Run

Open `index.html` in a browser. If you change `css/style.scss` or `js/index.tsx`, rebuild the `.min` files yourself.

## Invariants

- The UI is French. The decimal separator is a comma. Multiply is `x`.
- Equals runs `eval` after rewriting `x` to `*` and `,` to `.`. The result is shown with commas again.
- `AC` clears `pile`. `DEL` drops the last character.
- A leading `0` is stripped unless the next character is a comma.
- A new operator replaces an operator that is already the last character.
- `generateColor` sets a random body background every 8 seconds.
