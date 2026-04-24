# Grocery List App

A React + Vite grocery list app with local storage persistence, category tracking, completion filters, and a GitHub Pages deployment workflow.

## Features

- Add grocery items with quantity and category
- Mark items as completed
- Filter by all, active, or completed
- Clear completed items
- Persist the list in `localStorage`
- Deploy automatically to GitHub Pages with GitHub Actions

## Run Locally

1. Open a terminal in this project folder.
2. Install dependencies:

```bash
npm install
```

3. Start the local development server:

```bash
npm run dev
```

4. Open the local URL shown in the terminal. Vite usually serves at `http://localhost:5173`.

## Build For Production

1. Run the production build:

```bash
npm run build
```

2. Preview the built app locally:

```bash
npm run preview
```

## Deploy To GitHub Pages

1. Create a new empty GitHub repository.
2. Initialize git in this folder if it is not already initialized:

```bash
git init
```

3. Add the GitHub remote:

```bash
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
```

4. Switch to the main branch:

```bash
git branch -M main
```

5. Stage and commit the project:

```bash
git add .
git commit -m "Recreate grocery list app"
```

6. Push the branch:

```bash
git push -u origin main
```

7. In GitHub, open `Settings` -> `Pages`.
8. Under `Build and deployment`, set `Source` to `GitHub Actions`.
9. Wait for the workflow in `.github/workflows/deploy.yml` to finish.
10. Open the live site at:

```text
https://YOUR-USERNAME.github.io/YOUR-REPO/
```

## Project Scripts

- `npm run dev` starts the local Vite dev server
- `npm run build` creates the production build in `dist`
- `npm run preview` serves the production build locally
- `npm run lint` runs ESLint

## Notes

- The app uses a relative Vite `base` path so the same build works on GitHub Pages project sites.
- Grocery items are saved in the browser, so each browser keeps its own local list.
