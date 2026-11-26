# AGENTS.md

Static HTML calculator. The browser loads the minified CSS and JS. Source copies sit beside those files. `build.sh` regenerates them with `bunx sass` and `bunx esbuild`, nothing is installed in the repo.

## Layout

- `index.html` is the page. `lang` is `fr`. The title is Calculatrice.
- `css/style.scss` is the stylesheet source. The page loads `css/style.min.css`.
- `js/index.tsx` is the TypeScript source. The page loads `js/index.min.js`.
- The display is `header output`. Keys are `section button`. The running expression is the string `pile`.

## Run

Open `index.html` in a browser. If you change `css/style.scss` or `js/index.tsx`, run `./build.sh` and commit the `.min` files. Do not hand-edit them.

## Invariants

- The UI is French. The decimal separator is a comma. Multiply is `x`.
- Equals evaluates the expression with a small recursive-descent parser (`+ - * /`, parentheses, unary signs), after rewriting `x` to `*` and `,` to `.`. An incomplete expression or a non-finite result leaves the display unchanged. The result is shown with commas again.
- `AC` clears `pile`. `DEL` drops the last character.
- A leading `0` is stripped unless the next character is a comma.
- A new operator replaces an operator that is already the last character.
- `generateColor` sets a random body background every 8 seconds, and does nothing under `prefers-reduced-motion: reduce`.
