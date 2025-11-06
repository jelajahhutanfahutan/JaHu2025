@echo off
cd /d "%~dp0"
echo.
echo 🔄 Menarik update terbaru dari GitHub...
git pull origin main
echo.
echo 📤 Mengirim perubahan lokal...
git add .
git commit -m "Auto update from VS Code"
git push origin main
echo.
echo ✅ Perubahan sudah dikirim ke GitHub: JelajahHutan2025 (%date% %time%)
timeout /t 60 >nul
call autopush.bat
