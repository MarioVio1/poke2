# Guida per Upload automatico su GitHub

## Prerequisiti

1. **Git installato** - Scarica da https://git-scm.com
2. **GitHub CLI (gh)** - Scarica da https://cli.github.com

## Configurazione iniziale (una volta)

### 1. Configura Git
```bash
git config --global user.name "Il tuo nome"
git config --global user.email "tua@email.com"
```

### 2. Autenticati con GitHub
```bash
gh auth login
```
Segui le istruzioni:
- Seleziona "GitHub.com"
- Seleziona "HTTPS"
- Seleziona "Login with a web browser"
- Copia il codice mostrato

### 3. Crea un repository su GitHub (se non esiste)
```bash
gh repo create poke-main --public --source=. --description "Pokemona - Besti di Venetia - GBA Online Emulator Style"
```

## Upload con un solo comando

Dopo la configurazione iniziale, usa questo comando:

```bash
.\upload.ps1
```

Questo script:
1. Aggiunge tutti i file
2. Fa commit con messaggio automatico
3. Fa push su GitHub

## Comandi manuali (se preferisci)

```bash
git add .
git commit -m "Update: $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
git push origin main
```

## Note

- Il repository deve essere inizializzato con `git init` se non lo è già
- La prima volta potrebbe chiederti di creare il branch main
- Usa `gh repo create` la prima volta per creare il repository remoto

## Problemi comuni

### "gh: command not found"
Scarica e installa GitHub CLI da https://cli.github.com

### Errore di autenticazione
Esegui `gh auth logout` e poi `gh auth login` di nuovo

### Remote already exists
Il remote esiste già, usa direttamente `git push`