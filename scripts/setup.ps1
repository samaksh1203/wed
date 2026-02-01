param(
  [Parameter(Position=0)]
  [ValidateSet('dev','build','preview','deploy','check')]
  [string]$Action = 'dev',
  [switch]$SkipNodeCheck
)

function Fail($msg){ Write-Error $msg; exit 1 }

# Check Node presence/version
$nodeCmd = Get-Command node -ErrorAction SilentlyContinue
if (-not $nodeCmd) {
  $failMsg = @'
Node.js is not installed. Install Node >= 18 and retry. Recommended options:
- Install nvm-windows: https://github.com/coreybutler/nvm-windows/releases
  Then in a new PowerShell session:
    nvm install 18.20.0
    nvm use 18.20.0
- Or download Node LTS MSI: https://nodejs.org/en/download/
'@
  Fail $failMsg
}

$ver = (& node -v).TrimStart('v')
$major = 0
if ($ver -match '^(\d+)\.') { $major = [int]$matches[1] }

if ($major -lt 18 -and -not $SkipNodeCheck) {
  Write-Host ""
  Write-Host "Detected Node.js version $ver — Node >= 18 is required." -ForegroundColor Yellow
  Write-Host ""
  Write-Host "Upgrade options:"
  Write-Host " - nvm-windows: https://github.com/coreybutler/nvm-windows/releases"
  Write-Host " - Node MSI: https://nodejs.org/en/download/"
  $scriptFull = Join-Path $PWD "scripts\setup.ps1"
  Write-Host ""
  Write-Host "After upgrade, re-open terminal and run this command:"
  Write-Host ('  powershell -ExecutionPolicy Bypass -File "' + $scriptFull + '" check')
  Write-Host ""
  Write-Host "To continue anyway re-run with -SkipNodeCheck"
  exit 1
}

# Scaffold if missing
if (-not (Test-Path package.json)) {
  Write-Host "package.json not found. Scaffolding Vite + React..."
  npm create vite@latest . -- --template react
}

Write-Host "Installing dependencies..."
npm install

switch ($Action) {
  'dev'     { Write-Host "Starting dev server...";    npm run dev;     break }
  'build'   { Write-Host "Building...";               npm run build;   break }
  'preview' { Write-Host "Previewing build...";       npm run preview; break }
  'deploy'  { Write-Host "Deploying...";              npm run deploy;  break }
  'check'   { Write-Host "Environment OK. Node $ver"; break }
  default   { Write-Host "Unknown action: $Action"; exit 2 }
}
