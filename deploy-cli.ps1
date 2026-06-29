<#
.SYNOPSIS
Start helper for the Regisbridge School Next.js + Prisma + Supabase project.
#>
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Push-Location $root

function Stop-Jobs {
    Get-Job -ErrorAction SilentlyContinue | Receive-Job -ErrorAction SilentlyContinue | Out-Null
    Get-Job -ErrorAction SilentlyContinue | Stop-Job -ErrorAction SilentlyContinue
}

function Invoke-ScriptStep {
    param([string]$Label, [scriptblock]$Action)
    Write-Host "==> ${Label}" -ForegroundColor Cyan
    try {
        & $Action
    } catch {
        Write-Host "   [!] ${Label} failed: $_" -ForegroundColor Red
        exit 1
    }
}

try {
    Invoke-ScriptStep -Label 'Check Node.js' -Action { node -v | Out-Null }
    Invoke-ScriptStep -Label 'Check npm' -Action { npm -v | Out-Null }
    Invoke-ScriptStep -Label 'Generate Prisma client' -Action { npx prisma generate }

    $jobs = @()

    Write-Host "Starting processes..." -ForegroundColor Cyan

    $jobs += Start-Job -ScriptBlock { param($p) Set-Location $p; Set-StrictMode -Version Latest; npm run dev } -ArgumentList $root
    Start-Sleep -Seconds 2

    Write-Host "==> Frontend/dev server started" -ForegroundColor Green
    Write-Host "   http://localhost:3000" -ForegroundColor White

    Write-Host ""
    Write-Host "Press Ctrl+C to stop all background jobs." -ForegroundColor Yellow

    try {
        while ($true) { Start-Sleep -Seconds 5 }
    } finally {
        Write-Host "`nStopping background jobs..." -ForegroundColor Yellow
        Stop-Jobs
    }
}
finally {
    Pop-Location
}
