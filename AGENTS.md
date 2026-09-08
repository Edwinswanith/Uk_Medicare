# Repository Guidelines

## Project Structure & Module Organization
This is a single-page Vite, React, and TypeScript website for Prof. Hemant Sheth. The entry point is `src/main.tsx`; page composition and shared UI state live in `src/App.tsx`. Reusable UI sections are in `src/components/`, while medical, clinic, FAQ, testimonial, and publication content belongs in `src/data/*.ts`. Global Tailwind styles are in `src/index.css`, with theme extensions in `tailwind.config.js`. Static images and SEO files live in `public/`. Documentation is in `docs/`; generated review evidence belongs in `artifacts/`. Treat `Feedback Cards/` as private reference material, not app code.

## Build, Test, and Development Commands
- `npm install`: install dependencies from `package-lock.json`.
- `npm run dev`: start the Vite dev server on port `3000`.
- `npm run build`: run `tsc` type checking, then create the production Vite build.
- `npm run preview`: serve the production build locally for final review.

There is currently no `npm test` or lint script. Use `npm run build` as the minimum verification step for code changes.

## Coding Style & Naming Conventions
Use TypeScript with strict compiler settings. Follow the existing React functional component style and 2-space indentation. Component files use PascalCase names, for example `HeroSection.tsx`; data modules use camelCase names, for example `contactInfo.ts`. Prefer adding structured content to `src/data/` instead of hardcoding copy inside components. Use Tailwind utility classes and the configured `navy`, `teal`, and `gold` theme colors where possible; match nearby styles before adding new inline hex values.

## Testing Guidelines
No automated test framework is configured. When changing UI, run `npm run build` and manually verify affected flows in `npm run dev`, including desktop and mobile breakpoints. For visual or accessibility fixes, capture evidence under `artifacts/` when useful. If tests are introduced later, colocate them near the changed component as `ComponentName.test.tsx` and document the new command here.

## Commit & Pull Request Guidelines
This checkout does not include a `.git` directory, so local commit history cannot be inspected. Use concise, imperative commit subjects such as `Fix mobile booking modal spacing` or `Update clinic contact data`. Pull requests should describe the user-facing change, list verification performed, link any relevant issue or source document, and include screenshots for visual changes. Call out updates to `index.html` SEO or JSON-LD metadata when content changes affect structured data.

## Agent-Specific Instructions
Before editing, check `src/App.tsx` to confirm whether a component is rendered. Keep generated files out of source directories, avoid private feedback material unless explicitly requested, and preserve medical claims only when supported by verification docs.
