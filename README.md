# DinoVerse 3D
Interactive 3D dinosaur park (React 18, TypeScript, Vite, React Three Fiber, Zustand, Recharts, Bootstrap 5). All data is simulated.
## Run
1. Install Node.js 18+ (nodejs.org). 2. Unzip and open a terminal in `dinoverse-3d`.
```
npm install
npm run dev
npm run build
npm run preview
```
## Deploy to GitHub Pages
Config uses `base: './'` and HashRouter, so any repo name (e.g. `dinoverse-3d`) works. Run `npm run build`, then publish the `dist/` folder (e.g. `npx gh-pages -d dist`, or a GitHub Actions Pages workflow).
## Included
Overview dashboard, 3D Park Explorer (6 habitats, 8 species / 24 dinosaurs, selection, camera and layer controls, day/night), Dinosaur catalog with search/filter/sort, Habitat management with validation and LocalStorage persistence.
## Not yet built
Safari Experience, Tickets, Analytics, Settings, global search, notifications, light theme.
