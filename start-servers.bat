@echo off
chcp 65001 >nul
echo ========================================
echo  Regisbridge School - Start Servers
echo ========================================
echo.

setlocal
where node >nul 2>&1
if %errorlevel% neq 0 (
  echo [ERROR] Node.js not found in PATH.
  pause
  exit /b 1
)

echo Generating Prisma client...
call npx prisma generate
if %errorlevel% neq 0 exit /b %errorlevel%
echo.

echo Starting Next.js server...
start "Next.js" cmd /k "npm run dev"

echo.
echo ========================================
echo  Servers Starting!
echo ========================================
echo  Next.js:  http://localhost:3000
echo ========================================
echo.
echo Press any key to stop all servers...
pause > nul

echo Stopping servers...
for /f "tokens=2" %%A in ('tasklist /fi "WINDOWTITLE eq Next.js*" /fo csv /nh ^| findstr /i "cmd.exe"') do (
  taskkill /fi "PID eq %%B" /f >nul 2>&1
)
taskkill /FI "WINDOWTITLE eq Next.js*" /T /F >nul 2>&1
echo Done.
