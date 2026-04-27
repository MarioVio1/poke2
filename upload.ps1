# Script per upload automatico su GitHub
# Esegui con: .\upload.ps1

$repoName = "poke"  # Nome del repository GitHub

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  POKEMONA - Upload su GitHub" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verifica se Git è installato
$gitCmd = Get-Command git -ErrorAction SilentlyContinue
if (-not $gitCmd) {
    Write-Host "ERRORE: Git non è installato!" -ForegroundColor Red
    Write-Host "Scaricalo da: https://git-scm.com" -ForegroundColor Yellow
    exit 1
}

# Verifica se GitHub CLI è installato
$ghCmd = Get-Command gh -ErrorAction SilentlyContinue
if (-not $ghCmd) {
    Write-Host "ERRORE: GitHub CLI non è installato!" -ForegroundColor Red
    Write-Host "Scaricalo da: https://cli.github.com" -ForegroundColor Yellow
    exit 1
}

# Verifica autenticazione GitHub
Write-Host "Verifica autenticazione GitHub..." -ForegroundColor Cyan
$ghStatus = gh auth status 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Non autenticato. Esegui: gh auth login" -ForegroundColor Yellow
    exit 1
}
Write-Host "  Autenticazione OK!" -ForegroundColor Green

# Vai nella directory del progetto
$projectDir = $PSScriptRoot
if (-not $projectDir) {
    $projectDir = Get-Location
}

Write-Host ""
Write-Host "Directory: $projectDir" -ForegroundColor Cyan
Set-Location $projectDir

# Verifica se è un repository git
$isGitRepo = git rev-parse --git-dir 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "Inizializzo repository Git..." -ForegroundColor Yellow
    git init
    
    # Chiedi se creare il repository remoto
    $createRemote = Read-Host "Vuoi creare un repository GitHub? (s/n)"
    if ($createRemote -eq "s") {
        Write-Host "Creazione repository GitHub..." -ForegroundColor Yellow
        gh repo create poke-main --public --source=. --description "Pokemona - Besti di Venetia - GBA Online Emulator Style" --yes
        if ($LASTEXITCODE -ne 0) {
            Write-Host "Errore nella creazione del repository!" -ForegroundColor Red
            exit 1
        }
    }
}

# Aggiungi tutti i file
Write-Host ""
Write-Host "Aggiungo i file..." -ForegroundColor Cyan
git add -A
$status = git status --porcelain
if ($status.Count -eq 0) {
    Write-Host "Nessun file modificato." -ForegroundColor Yellow
} else {
    Write-Host "  $($status.Count) file modificati" -ForegroundColor Green
    
    # Commit
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
    $commitMsg = "Update: $timestamp"
    Write-Host ""
    Write-Host "Faccio commit..." -ForegroundColor Cyan
    git commit -m $commitMsg
    Write-Host "  Commit effettuato!" -ForegroundColor Green
    
    # Push
    Write-Host ""
    Write-Host "Carico su GitHub..." -ForegroundColor Cyan
    git push -u origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Green
        Write-Host "  UPLOAD COMPLETATO CON SUCCESSO!" -ForegroundColor Green
        Write-Host "========================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "Repository: https://github.com/$(gh repo view --json owner -q '.owner.login')/poke-main" -ForegroundColor Cyan
    } else {
        Write-Host "Errore durante il push!" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Pause