# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## Using the repo locally.
 1. From your cli(terminal, cmd, git bash, powershell, etc) clone the repo to your device using `git clone https://github.com/GDSC-University-of-Benin/the-intern-placee.git`.
 2. Make sure you have node and npm installed and up to date.
 3. Run `npm install` in the root folder of the repository to handle dependencies.
 4. Run `npm run dev` in the root folder of the repo to start a localhost server from which you can access the project, the url to access the project from should be displayed in your terminal window.

## CI/CD

- CI runs on pushes and pull requests to `main` and `dev` via GitHub Actions in `.github/workflows/typecheck-on-push.yml`.
  - Node.js 20 with npm caching
  - Steps: `lint`, `typecheck`, `build`
  - Builds use a generated `.env` with dummy values; production deploys use secrets.

- CD deploys to Firebase Hosting:
  - On merge/push to `main` or `dev`: `.github/workflows/firebase-hosting-merge.yml`
  - On pull requests (preview channels): `.github/workflows/firebase-hosting-pull-request.yml`
  - Both use Node.js 20 and build with `npm ci && npm run build`.

### Node version
- Local and CI use Node 20. Install it with `nvm install` (reads `.nvmrc`) then `nvm use`.

### Required GitHub Secrets (for deploys)
- `FIREBASE_SERVICE_ACCOUNT_THEINTERNPLACE1` (JSON for service account with Hosting deploy perms)
- `FIREBASE_API_KEY`
- `FIREBASE_AUTH_DOMAIN`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_STORAGE_BUCKET`
- `FIREBASE_STORAGE_BUCKET_URL`
- `FIREBASE_MESSAGING_ID`
- `FIREBASE_APP_ID`
- `FIREBASE_MEASUREMENT_ID`

Tip: Protect branches to require the CI workflow to pass before merging to ensure deployments only occur from passing builds.
