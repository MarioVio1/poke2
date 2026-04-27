@echo off
cd G:\baxk\poke-main
git config user.email "federico@poke.com"
git config user.name "Federico"
git remote add origin https://github.com/poke2/poke.git
git add -A
git commit -m "Added PNG sprites for first 11 besti" 2>nul
git push origin master
echo FATTO!
pause