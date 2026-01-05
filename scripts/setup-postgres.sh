#!/usr/bin/env bash
# Vercel Postgres Quick Setup Script
# Run after creating Postgres database in Vercel Dashboard

echo "🚀 Vercel Postgres Setup for Regisbridge School"
echo "=============================================="
echo ""

# Step 1: Pull environment variables from Vercel
echo "📥 Step 1: Pulling environment variables from Vercel..."
vercel env pull .env.local

if [ $? -eq 0 ]; then
    echo "✅ Environment variables downloaded successfully"
else
    echo "❌ Failed to pull environment variables"
    echo "   Make sure you've created a Postgres database in Vercel Dashboard first"
    exit 1
fi

echo ""

# Step 2: Generate Prisma Client
echo "🔧 Step 2: Generating Prisma Client..."
npx prisma generate

if [ $? -eq 0 ]; then
    echo "✅ Prisma Client generated successfully"
else
    echo "❌ Failed to generate Prisma Client"
    exit 1
fi

echo ""

# Step 3: Run migrations
echo "🗄️  Step 3: Running database migrations..."
npx prisma migrate deploy

if [ $? -eq 0 ]; then
    echo "✅ Migrations applied successfully"
else
    echo "❌ Failed to run migrations"
    echo "   You may need to create an initial migration:"
    echo "   npx prisma migrate dev --name init"
    exit 1
fi

echo ""

# Step 4: Seed database (optional)
echo "🌱 Step 4: Would you like to seed the database with sample data? (y/n)"
read -r answer

if [ "$answer" = "y" ]; then
    echo "Seeding database..."
    npx prisma db seed
    if [ $? -eq 0 ]; then
        echo "✅ Database seeded successfully"
    else
        echo "⚠️  No seed script found. You can create one in prisma/seed.ts"
    fi
fi

echo ""
echo "=============================================="
echo "✅ Vercel Postgres setup complete!"
echo ""
echo "🎉 Next steps:"
echo "   1. Open Prisma Studio: npx prisma studio"
echo "   2. View your data at http://localhost:5555"
echo "   3. Start dev server: npm run dev"
echo "   4. Your app now uses PostgreSQL instead of in-memory storage!"
echo ""
echo "📊 Database Info:"
echo "   - Check connection in Vercel Dashboard"
echo "   - View logs in Vercel → Storage → Postgres"
echo "   - Manage data with Prisma Studio"
echo ""
