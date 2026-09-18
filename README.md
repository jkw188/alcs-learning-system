# ALCS — A Level Computer Science Learning System

One shared React + TypeScript frontend for all ALCS chapters.

## Stack

- Vite
- React + TypeScript
- React Router
- React Markdown + GFM
- rehype-highlight + highlight.js
- GitHub Pages via GitHub Actions

## Run locally

```bash
npm install
npm run dev
```

Production check:

```bash
npm run build
npm run preview
```

## Add a chapter

Create a new folder under:

```text
src/content/chapters/chapter-XX-name/
```

Required files:

```text
chapter.json
overview.md
module-01.md
module-02.md
...
```

The app discovers `chapter.json` and Markdown files automatically through Vite `import.meta.glob`. You do not need to add a route or React component for each chapter.

### chapter.json example

```json
{
  "id": "chapter-02-communication",
  "number": 2,
  "title": "Communication",
  "description": "How computers exchange data reliably.",
  "status": "available",
  "overview": "overview.md",
  "modules": [
    {
      "id": "module-01",
      "number": 1,
      "title": "First Module",
      "file": "module-01.md"
    }
  ]
}
```

## Content rule

- Knowledge/content changes -> Markdown / `chapter.json`
- Shared UI/function changes -> React/CSS/components
- Do not create a new React app for each chapter

## GitHub Pages

The Vite `base` is computed automatically from `GITHUB_REPOSITORY` during GitHub Actions builds. For a project page repository such as `https://github.com/user/alcs-learning-system`, the build base becomes `/alcs-learning-system/`.

The build also creates `dist/404.html` from the SPA entry so deep React Router URLs can load on GitHub Pages.

After pushing to GitHub:

1. Repository **Settings -> Pages**.
2. Set **Source** to **GitHub Actions**.
3. Push to `main` or run the workflow manually.
