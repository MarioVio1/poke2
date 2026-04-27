@echo off
cd G:\baxk\poke-main
gh repo create poke2 --public --source=. --description "Pokemona sprites"
git config user.email "federico@poke.com"
git config user.name "Federico"
git add -A
git commit -m "Added PNG sprites for first 11 besti" 2>nul
git push origin master
echo FATTO!
pause