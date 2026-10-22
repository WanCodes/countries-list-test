# Countries List

A React application that loads countries from the public [Countries GraphQL API](https://countries.trevorblades.com/) and shows them as paginated cards.

Written by [Wan Yau](https://github.com/WanCodes) for the [countries-list-test](https://github.com/WanCodes/countries-list-test) coding exercise.

## What it does

`src/index.tsx` mounts the app inside an Apollo `ApolloProvider`. `App` renders one screen, `CountiresList` (the folder name is spelled that way in the repo).

On load the list runs the `Countries` query:

1. While the request is in flight, the screen is a Material UI linear progress bar.
2. If the request fails, the screen is an error alert with the text `Error loading countires...`.
3. When the request succeeds, countries are shown in a two-column grid, up to six cards per page.
4. A Material UI pagination control under the grid changes the page. The page count is `Math.ceil(countries.length / 6)`, kept in component state. The API currently returns 250 countries, which is 42 pages.

Each card shows the country name, flag emoji, ISO code (for example `🇦🇩 - AD`), capital, and native name. Text is centered because `.App` sets `text-align: center`.

The grid item is `xs={6}` at every breakpoint, so the list stays two columns wide on small screens. Each card container has a minimum width of 300px, so a narrow viewport can overflow horizontally.

There is no search, filter, or sort. The document title in `public/index.html` is still `React App`. The npm package name is `heni-test`, which is the name the dev server prints.

## Stack

| Area | Libraries |
| --- | --- |
| UI | React 17, TypeScript 4.6, Create React App (`react-scripts` 5.0.0) |
| Data | Apollo Client 3 (`@apollo/client` 3.5) and `graphql` 16 |
| Components | Material UI 5 (`@mui/material`) and Emotion |
| Lint | ESLint 8, Airbnb (`eslint-config-airbnb`), `@typescript-eslint` |
| Tests | Jest and React Testing Library, via Create React App |

`package.json` also depends on `@mui/x-data-grid`, `styled-components`, and Prettier. `@mui/x-data-grid` and `styled-components` have no imports under `src/`. Prettier has no config file and no npm script.

The Apollo client lives in `src/graphql/TrevorbladesClient.ts`. It points at `https://countries.trevorblades.com/` and uses `InMemoryCache`. The endpoint is public.

```graphql
query Countries {
  countries {
    code
    name
    native
    capital
    emoji
  }
}
```

`Country` in `src/types/global.ts` also declares `languages` and `currency`. The query and the card use `code`, `name`, `native`, `capital`, and `emoji` only. `capital` is nullable in the API; the card prints the returned value, including an empty line when it is null. `Language` is declared beside `Country` and is unused by the UI.

## Prerequisites

- Node.js 14 or later. `react-scripts@5.0.0` declares that engine. The commands below were run with Node.js 22 and npm 10.
- npm.
- Outbound HTTPS to `https://countries.trevorblades.com/` when you want live data in the browser.

## Run locally

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000). The dev server reloads on save. `npm ci` installs the tree pinned by the committed lockfile.

`npm install` prints an audit report for the locked dependency tree. The install still finishes, and the scripts below run. The dev server and production build also print a Browserslist notice that `caniuse-lite` is outdated; compilation still succeeds.

## Scripts

| Command | What it does |
| --- | --- |
| `npm start` | Development server at [http://localhost:3000](http://localhost:3000). Create React App's ESLint plugin reports issues in this terminal. |
| `npm test` | Jest in interactive watch mode. |
| `CI=true npm test` | Jest once, then exit. Use this in a non-interactive shell. |
| `npm run build` | Production bundle in `build/`, hosted from `/`. |
| `npm run lint` | `eslint 'src/**/*'` using `.eslintrc.json` (Airbnb and the TypeScript parser). `eslintIgnore` in `package.json` skips `*.test.tsx` and `*.css`. |
| `npm run ts-compile-check` | `tsc -p tsconfig.json --noEmit`. `strict` is enabled. |
| `npm run eject` | Copies the Create React App configuration into the project. This is one-way. `start`, `test`, and `build` keep working through `react-scripts` without it. |

On the current source:

- `npm start` compiles.
- `npm run build` compiles.
- `npm run lint` exits 0.
- `npm run ts-compile-check` exits 0.
- `CI=true npm test` fails. Details are in the next section.

## Tests

```bash
CI=true npm test
```

The only test is `src/App.test.tsx`, still the Create React App template. It renders `<App />` and expects text matching `/learn react/i`.

That test fails:

- The test renders `App` by itself. `ApolloProvider` is mounted only in `src/index.tsx`, so `useQuery` throws `Could not find "client" in the context or passed in as an option.`
- The UI has no "Learn React" link. Render throws before that assertion runs.

`src/setupTests.ts` adds `@testing-library/jest-dom`. Test files are outside `npm run lint`.

## Project layout

```text
src/
  index.tsx                                 ApolloProvider and React root
  App.tsx                                   Renders the list
  App.test.tsx                              Create React App template test
  components/CountiresList/index.tsx        Query, loading, error, pagination
  components/CountiresList/CountryCard.tsx  One country card
  graphql/TrevorbladesClient.ts             Apollo Client instance
  graphql/queries/GET_COUNTRIES.queries.ts  Countries query
  types/global.ts                           Country and Language types
  setupTests.ts                             Jest DOM matchers
public/
  index.html                                Document shell, title "React App"
```

## Notes left in the source

`src/components/CountiresList/index.tsx` marks four follow-ups in comments: move the page size into a shared constant, move the query into a custom hook, give loading and error their own component, and adjust the grid for smaller screens. The page size is the local constant `CARDS_PER_PAGE` (6). Loading and error handling are early returns in that same component.
