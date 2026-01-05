# Document Organization Script
# This script helps organize business documents in the docs folder

# Create processed folder structure
$docsPath = "c:\Users\armut\Documents\GitHub\regisbridge.page\docs"
$processedPath = "$docsPath\processed"
$categories = @("constitution", "fees", "financial", "proposals", "forms", "staff", "other")

Write-Host "Creating document organization structure..." -ForegroundColor Green

# Create main processed folder
if (!(Test-Path $processedPath)) {
    New-Item -ItemType Directory -Path $processedPath | Out-Null
    Write-Host "✓ Created processed folder" -ForegroundColor Green
}

# Create category folders
foreach ($category in $categories) {
    $categoryPath = "$processedPath\$category"
    if (!(Test-Path $categoryPath)) {
        New-Item -ItemType Directory -Path $categoryPath | Out-Null
        Write-Host "✓ Created $category folder" -ForegroundColor Green
    }
}

Write-Host "`nDocument organization structure ready!" -ForegroundColor Green
Write-Host "`nFolder structure:" -ForegroundColor Cyan
Write-Host "docs/" -ForegroundColor Cyan
Write-Host "  processed/" -ForegroundColor Cyan
Write-Host "    constitution/    (School constitution and governance)" -ForegroundColor Gray
Write-Host "    fees/            (Fee structures and payment schedules)" -ForegroundColor Gray
Write-Host "    financial/       (Income, expenditure, budgets)" -ForegroundColor Gray
Write-Host "    proposals/       (School proposals and plans)" -ForegroundColor Gray
Write-Host "    forms/           (Application and registration forms)" -ForegroundColor Gray
Write-Host "    staff/           (Employment and salary documents)" -ForegroundColor Gray
Write-Host "    other/           (Miscellaneous documents)" -ForegroundColor Gray

Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "1. Review documents in docs/ folder" -ForegroundColor White
Write-Host "2. Extract data using DATA_EXTRACTION_GUIDE.md" -ForegroundColor White
Write-Host "3. Move processed documents to appropriate category folder" -ForegroundColor White
Write-Host "4. Update code with extracted data" -ForegroundColor White

# List some key documents to process first
Write-Host "`n Priority documents to process:" -ForegroundColor Yellow
Write-Host "1. Constitution documents (2 files)" -ForegroundColor White
Write-Host "2. REGISBRIDGE FEES UPDATE FINAL.xlsx" -ForegroundColor White
Write-Host "3. Regisbridge School Proposal.docx" -ForegroundColor White
Write-Host "4. APPLICATION FOR REGISTRATION.docx" -ForegroundColor White
