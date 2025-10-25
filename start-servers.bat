@echo off
echo ========================================
echo  Regisbridge School - Start Servers
echo ========================================
echo.

echo Starting Backend Server...
start "Backend API" cmd /k "cd server && npm start"

timeout /t 3 /nobreak > nul

echo Starting Frontend Server...
start "Frontend" cmd /k "npm run dev"

echo.
echo ========================================
echo  Servers Starting!
echo ========================================
echo  Backend:  http://localhost:3002
echo  Frontend: http://localhost:8080
echo ========================================
echo.
echo Press any key to stop all servers...
pause > nul

taskkill /FI "WINDOWTITLE eq Backend API*" /T /F
taskkill /FI "WINDOWTITLE eq Frontend*" /T /F
