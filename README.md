Project scaffold for a wedding invite (React + Vite).

To run locally:
1. cd c:\Users\AKSHAT\Desktop\wed
2. npm install
3. npm run dev

Add your files to public/:
- public/sample-song.mp3 (your invite song)
- public/bride.jpg and public/groom.jpg (replace placeholders)

Deploy to GitHub Pages:
1. Create a repo and push this project.
2. Set homepage in package.json if needed.
3. npm run deploy  (uses gh-pages)

Alternatively add a GitHub Actions deploy workflow (example included).

Run locally (exact commands)
1. Verify Node & npm:
   - node -v
   - npm -v
   (Need Node >= 18)

2. If you already have the project scaffold (package.json, src/, vite config):
   - npm install
   - npm run dev
   - open http://localhost:5173

3. If scaffold is missing, create a Vite + React scaffold in the project root:
   - npm create vite@latest . -- --template react
   - npm install
   - npm run dev

Build & preview (production-approx)
- npm run build
- npm run preview

Quick troubleshooting
- Port in use: stop other dev servers or set PORT env var.
- Music won't autoplay: browsers require a user action; click "Play Song & Enter".
- Missing marker icons: ensure leaflet CSS is imported in src/main.jsx.
- If you want, I can scaffold missing files (package.json, src/, components) — say "scaffold now".

Quick checklist:
- Node >= 18 + npm installed.
- In project root:
  1. npm install
  2. npm run dev (opens http://localhost:5173)
- Add your assets to public/:
  - public/sample-song.mp3 (audio file used by the player)
  - public/bride.jpg and public/groom.jpg (landing images)
- To edit names, open src/components/Landing.jsx (currently set to "Samiksha & Akshat").
- To deploy:
  - Push repo to GitHub.
  - Use npm run deploy (gh-pages) or allow the included GitHub Action (main branch) to publish to gh-pages.

Automated local script
- Windows (PowerShell):
  powershell -ExecutionPolicy Bypass -File .\scripts\setup.ps1 dev
- macOS / Linux (bash):
  chmod +x ./scripts/setup.sh
  ./scripts/setup.sh dev

Supported actions: dev, build, preview, deploy, check
- check: verifies Node >= 18 and package.json presence.
- If package.json is missing the script will scaffold a Vite + React app for you.

Note: I can't run commands on your computer
- I cannot execute commands on your machine. Please run these exact commands in a terminal inside c:\Users\AKSHAT\Desktop\wed:

  1. Verify Node & npm:
     - node -v
     - npm -v
     (Need Node >= 18)

  2. Install deps and run dev server:
     - npm install
     - npm run dev
     - open http://localhost:5173 in your browser

  3. Verify production build locally:
     - npm run build
     - npm run preview

If any command fails, copy the terminal output here and I'll suggest fixes. If you want CI to run these checks automatically after you push, tell me "add CI" and I'll add a GitHub Actions workflow that runs npm ci and npm run build on push/PR.
