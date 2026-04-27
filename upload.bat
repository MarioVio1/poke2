@echo off
cd G:\baxk\poke-main
git config user.email "federico@poke.com"
git config user.name "Federico"
git add -A
git commit -m "Added PNG sprites for first 11 besti"
git push origin main
echo FATTO!
pause