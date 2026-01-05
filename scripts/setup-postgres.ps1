# Vercel Postgres Quick Setup Script (PowerShell)
# Run after creating Postgres database in Vercel Dashboard

Write-Host "🚀 Vercel Postgres Setup for Regisbridge School" -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Pull environment variables from Vercel
Write-Host "📥 Step 1: Pulling environment variables from Vercel..." -ForegroundColor Yellow
vercel env pull .env.local

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Environment variables downloaded successfully" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to pull environment variables" -ForegroundColor Red
    Write-Host "   Make sure you've created a Postgres database in Vercel Dashboard first" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Step 2: Generate Prisma Client
Write-Host "🔧 Step 2: Generating Prisma Client..." -ForegroundColor Yellow
npx prisma generate

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Prisma Client generated successfully" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to generate Prisma Client" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Step 3: Run migrations
Write-Host "🗄️  Step 3: Running database migrations..." -ForegroundColor Yellow
npx prisma migrate deploy

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Migrations applied successfully" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to run migrations" -ForegroundColor Red
    Write-Host "   You may need to create an initial migration:" -ForegroundColor Yellow
    Write-Host "   npx prisma migrate dev --name init" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Step 4: Seed database (optional)
Write-Host "🌱 Step 4: Would you like to seed the database with sample data? (y/n)" -ForegroundColor Yellow
$answer = Read-Host

if ($answer -eq "y") {
    Write-Host "Seeding database..." -ForegroundColor Yellow
    npx prisma db seed
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Database seeded successfully" -ForegroundColor Green
    } else {
        Write-Host "⚠️  No seed script found. You can create one in prisma/seed.ts" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host "✅ Vercel Postgres setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "🎉 Next steps:" -ForegroundColor Cyan
Write-Host "   1. Open Prisma Studio: npx prisma studio"
Write-Host "   2. View your data at http://localhost:5555"
Write-Host "   3. Start dev server: npm run dev"
Write-Host "   4. Your app now uses PostgreSQL instead of in-memory storage!"
Write-Host ""
Write-Host "📊 Database Info:" -ForegroundColor Cyan
Write-Host "   - Check connection in Vercel Dashboard"
Write-Host "   - View logs in Vercel → Storage → Postgres"
Write-Host "   - Manage data with Prisma Studio"
Write-Host ""
