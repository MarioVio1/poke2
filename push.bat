@echo off
set PATH=C:\Program Files\Git\bin;%PATH%
cd /d G:\baxk\poke-main
git add -A
git commit -m "Added PNG sprites"
git push origin main
pause