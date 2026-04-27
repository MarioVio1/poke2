@echo off
cd G:\baxk\poke-main
git remote set-url origin https://github.com/MarioVio1/poke2.git
git config user.email "federico@poke.com"
git config user.name "Federico"
git add -A
git commit -m "Better GBA graphics + all sprites"
git push origin master
echo FATTO!
pause