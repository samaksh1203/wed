Add your assets here:
- sample-song.mp3 -> audio file used by the player
- bride.jpg and groom.jpg -> photos used in the landing section

Scripts (project root)
- Windows (PowerShell): powershell -ExecutionPolicy Bypass -File .\scripts\setup.ps1 dev
- macOS / Linux (bash):
  chmod +x ./scripts/setup.sh
  ./scripts/setup.sh dev

Supported actions: dev, build, preview, deploy, check
- check: verifies Node >= 18 and package.json presence.
- The scripts will scaffold a Vite+React app if package.json is missing.

Note where to put assets.
