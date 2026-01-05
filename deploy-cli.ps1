# Vercel CLI Deployment Script for PowerShell
# This script deploys both frontend and backend to Vercel

Write-Host "🚀 Vercel Deployment Script for Regisbridge School" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host ""

# Check if Vercel CLI is installed
Write-Host "Checking for Vercel CLI..." -ForegroundColor Yellow
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue

if (-not $vercelInstalled) {
    Write-Host "❌ Vercel CLI not found!" -ForegroundColor Red
    Write-Host "Installing Vercel CLI globally..." -ForegroundColor Yellow
    npm install -g vercel
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install Vercel CLI" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Vercel CLI installed successfully" -ForegroundColor Green
} else {
    Write-Host "✅ Vercel CLI found" -ForegroundColor Green
}

Write-Host ""
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "Please ensure you have:" -ForegroundColor Yellow
Write-Host "  1. Pushed all changes to GitHub" -ForegroundColor White
Write-Host "  2. Your SendGrid API key ready" -ForegroundColor White
Write-Host "  3. Generated a JWT secret (32+ characters)" -ForegroundColor White
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host ""

$continue = Read-Host "Continue with deployment? (y/n)"
if ($continue -ne "y") {
    Write-Host "Deployment cancelled." -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "📦 Step 1: Deploying Backend..." -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan

# Navigate to server directory
Set-Location -Path ".\server"

Write-Host "Deploying backend to Vercel..." -ForegroundColor Yellow
Write-Host "⚠️ You will need to set environment variables in Vercel dashboard:" -ForegroundColor Yellow
Write-Host "  - NODE_ENV=production" -ForegroundColor White
Write-Host "  - JWT_SECRET=<your-secret>" -ForegroundColor White
Write-Host "  - SENDGRID_API_KEY=<your-key>" -ForegroundColor White
Write-Host "  - ALLOWED_ORIGINS=<frontend-url>" -ForegroundColor White
Write-Host ""

vercel --prod

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Backend deployment failed" -ForegroundColor Red
    Set-Location -Path ".."
    exit 1
}

Write-Host "✅ Backend deployed successfully!" -ForegroundColor Green
$backendUrl = Read-Host "Enter your backend URL (e.g., https://regisbridge-backend.vercel.app)"

# Return to root directory
Set-Location -Path ".."

Write-Host ""
Write-Host "🎨 Step 2: Deploying Frontend..." -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan

Write-Host "Setting VITE_API_URL environment variable..." -ForegroundColor Yellow
Write-Host "Backend URL: $backendUrl/api" -ForegroundColor White
Write-Host ""
Write-Host "⚠️ Make sure to add this in Vercel dashboard:" -ForegroundColor Yellow
Write-Host "  VITE_API_URL=$backendUrl/api" -ForegroundColor White
Write-Host ""

vercel --prod

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Frontend deployment failed" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ Frontend deployed successfully!" -ForegroundColor Green

Write-Host ""
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "🎉 Deployment Complete!" -ForegroundColor Green
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 Post-Deployment Checklist:" -ForegroundColor Yellow
Write-Host "  1. ✅ Backend deployed" -ForegroundColor Green
Write-Host "  2. ✅ Frontend deployed" -ForegroundColor Green
Write-Host "  3. ⚠️ Update backend ALLOWED_ORIGINS with frontend URL" -ForegroundColor Yellow
Write-Host "  4. ⚠️ Add environment variables in Vercel dashboard" -ForegroundColor Yellow
Write-Host "  5. ⚠️ Test authentication and API endpoints" -ForegroundColor Yellow
Write-Host ""
Write-Host "📖 For detailed instructions, see DEPLOYMENT_GUIDE.md" -ForegroundColor Cyan
Write-Host ""
