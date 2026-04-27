@echo off
cd G:\baxk\poke-main
git remote remove origin 2>nul
git remote add origin https://github.com/MARIOVIO01/poke2.git
git config user.email "federico@poke.com"
git config user.name "Federico"
git add -A
git commit -m "Added PNG sprites for first 11 besti" 2>nul
git push origin master
echo FATTO!
pause