# Financial Data Extraction & Management System

## Overview

This system provides comprehensive financial data extraction, parsing, storage, and analytics capabilities for Regisbridge Private School. It supports multi-currency operations (USD, RTGS, ZWL, ZIG) and provides detailed income/expenditure tracking with approval workflows.

## Features

### ✅ Implemented

1. **TypeScript Types** (`src/types/financial.ts`)
   - `FinancialReport` - Main report structure
   - `Currency` - Multi-currency support
   - `IncomeCategory` / `ExpenseCategory` - Categorized transactions
   - `FinancialAnalytics` - Automated analytics and insights

2. **Database Schema** (`prisma/schema.prisma`)
   - `FinancialReport` model with JSON fields for flexible data storage
   - Support for multiple report types: income_expenditure, balance_sheet, cash_flow, budget
   - Approval workflow tracking
   - Indexed queries for performance

3. **Parser Utilities** (`src/lib/financial-parser.ts`)
   - Currency parsing and formatting
   - Total calculations across categories
   - Net position calculations
   - Percentage breakdown analysis
   - Profit margin calculations
   - Automated recommendations generation
   - CSV export functionality
   - Financial period parsing

4. **API Endpoints**
   - `GET /api/financial/reports` - List all reports (with pagination and filters)
   - `POST /api/financial/reports` - Create new report (admin only)
   - `GET /api/financial/reports/[id]` - Get specific report
   - `PUT /api/financial/reports/[id]` - Update report (admin only)
   - `DELETE /api/financial/reports/[id]` - Delete draft report (admin only)
   - `GET /api/financial/reports/[id]/analytics` - Get analytics and insights

5. **Data Storage**
   - Structured financial report in `/docs/processed/financial/2021-2022-annual-report.md`
   - Database seeding script in `/scripts/seed-financial-2021-2022.ts`

## Quick Start

### 1. Generate Prisma Client

```bash
npx prisma generate
```

### 2. Apply Database Migration

```bash
npx prisma migrate dev --name add_financial_reports
```

### 3. Seed 2021-2022 Financial Data

```bash
npx tsx scripts/seed-financial-2021-2022.ts
```

### 4. Test API Endpoints

```bash
# List all reports (requires admin auth)
curl http://localhost:3000/api/financial/reports \
  -H "Cookie: auth-token=YOUR_TOKEN"

# Get specific report
curl http://localhost:3000/api/financial/reports/REPORT_ID \
  -H "Cookie: auth-token=YOUR_TOKEN"

# Get analytics
curl http://localhost:3000/api/financial/reports/REPORT_ID/analytics \
  -H "Cookie: auth-token=YOUR_TOKEN"
```

## Data Structure

### 2021-2022 Report Summary

**Period:** December 16, 2021 - December 15, 2022

**Total Income:**
- USD: $148,700.00
- RTGS: $2,816,138.80

**Total Expenses:**
- USD: $146,596.56
- RTGS: $2,816,542.20

**Net Position:**
- USD: +$2,103.44 (Profit)
- RTGS: -$403.40 (Loss)

### Income Categories

1. **School Fees** - 76% of USD income
2. **Uniforms** - 9%
3. **Boarding** - 6%
4. **Other** - 9% (loans, graduation, COVID, admin, etc.)

### Expense Categories

1. **Salaries & Benefits** - 51% of USD expenses
2. **Infrastructure** - 17%
3. **Operational** - 14%
4. **Administration** - 7%
5. **Academic** - 1%
6. **Other** - 10%

## API Usage Examples

### Create a New Financial Report

```typescript
const response = await fetch('/api/financial/reports', {
  method: 'POST',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Q1 2023 Financial Report',
    reportType: 'income_expenditure',
    period: {
      startDate: new Date('2023-01-01'),
      endDate: new Date('2023-03-31'),
      label: 'Q1 2023'
    },
    openingBalance: [
      { code: 'USD', symbol: '$', amount: 5000 }
    ],
    income: [
      {
        name: 'School Fees',
        items: [
          {
            id: 'fees_q1',
            description: 'Tuition fees collected',
            category: 'fees_regisbridge',
            currencies: [
              { code: 'USD', symbol: '$', amount: 50000 }
            ]
          }
        ],
        total: [{ code: 'USD', symbol: '$', amount: 50000 }]
      }
    ],
    expenses: [
      {
        name: 'Salaries',
        items: [
          {
            id: 'salaries_q1',
            description: 'Staff salaries',
            category: 'staff_salaries',
            currencies: [
              { code: 'USD', symbol: '$', amount: 30000 }
            ]
          }
        ],
        total: [{ code: 'USD', symbol: '$', amount: 30000 }]
      }
    ]
  })
});
```

### Get Financial Analytics

```typescript
const response = await fetch(`/api/financial/reports/${reportId}/analytics`, {
  credentials: 'include'
});

const { data } = await response.json();

// Access analytics
console.log('Income Breakdown:', data.incomeBreakdown);
console.log('Expense Breakdown:', data.expenseBreakdown);
console.log('Profit Margin:', data.profitMargin);
console.log('Recommendations:', data.recommendations);
```

## Parser Utilities

### Parse Currency

```typescript
import { parseCurrency, formatCurrency } from '@/lib/financial-parser';

const currency = parseCurrency('$1,234.56', 'USD');
// { code: 'USD', symbol: '$', amount: 1234.56 }

const formatted = formatCurrency(currency);
// "$1,234.56"
```

### Calculate Totals

```typescript
import { calculateTotal } from '@/lib/financial-parser';

const currencies: Currency[] = [
  { code: 'USD', symbol: '$', amount: 100 },
  { code: 'USD', symbol: '$', amount: 200 },
  { code: 'RTGS', symbol: '$', amount: 500 }
];

const totals = calculateTotal(currencies);
// [
//   { code: 'USD', symbol: '$', amount: 300 },
//   { code: 'RTGS', symbol: '$', amount: 500 }
// ]
```

### Generate Analytics

```typescript
import { generateFinancialAnalytics } from '@/lib/financial-parser';

const analytics = generateFinancialAnalytics(report);
// Returns full analytics including summary, breakdowns, and recommendations
```

## Database Schema

```prisma
model FinancialReport {
  id            String   @id @default(cuid())
  reportType    String   // income_expenditure, balance_sheet, cash_flow, budget
  title         String
  periodStart   DateTime @db.Date
  periodEnd     DateTime @db.Date
  periodLabel   String
  
  openingBalance Json    // Currency[]
  closingBalance Json    // Currency[]
  income        Json     // IncomeCategory[]
  expenses      Json     // ExpenseCategory[]
  totalIncome   Json     // Currency[]
  totalExpenses Json     // Currency[]
  netPosition   Json     // Currency[]
  
  status        String   @default("draft") // draft, pending_approval, approved, archived
  approvalData  Json?    // Approval signatures and dates
  
  documentUrl   String?
  notes         String?  @db.Text
  createdBy     String
  
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  @@index([reportType])
  @@index([periodStart, periodEnd])
  @@index([status])
  @@index([createdBy])
}
```

## Security & Permissions

- **Admin Only**: Create, update, delete operations require admin role
- **Authenticated**: View operations require authentication
- **Draft Deletion**: Only reports with `status: "draft"` can be deleted
- **Approval Workflow**: Reports can be moved through draft → pending_approval → approved → archived states

## Export Capabilities

### CSV Export

```typescript
import { exportToCSV } from '@/lib/financial-parser';

const csv = exportToCSV(report);
// Download or save CSV data
```

### PDF Export

> 📝 TODO: Implement PDF generation using libraries like `jsPDF` or `PDFKit`

## Next Steps

### 🔜 Upcoming Features

1. **UI Components**
   - Financial report dashboard
   - Interactive charts (income vs expenses over time)
   - Breakdown pie charts
   - Export buttons (CSV, PDF)

2. **Advanced Analytics**
   - Year-over-year comparison
   - Budget vs actual analysis
   - Forecasting and projections
   - Currency exchange rate tracking

3. **Additional Data**
   - Extract 2019-2020 financial data
   - Extract 2020-2021 financial data
   - Extract 2022-2023 financial data
   - Monthly reports instead of just annual

4. **Integration**
   - Link to fee payment system
   - Automated monthly report generation
   - Email notifications for approvals
   - Export to accounting software formats

## Related Files

- **Types**: `src/types/financial.ts`
- **Parser**: `src/lib/financial-parser.ts`
- **API Routes**: `src/app/api/financial/**`
- **Schema**: `prisma/schema.prisma` (FinancialReport model)
- **Seed Script**: `scripts/seed-financial-2021-2022.ts`
- **Documentation**: `docs/processed/financial/2021-2022-annual-report.md`
- **Guide**: `docs/DATA_EXTRACTION_GUIDE.md`

## Support

For issues or questions about the financial system:
1. Check the API error messages
2. Review the validation errors
3. Ensure database is configured (`DATABASE_URL` env variable)
4. Verify admin authentication
5. Check Prisma client is generated (`npx prisma generate`)

---

**Last Updated:** December 10, 2025  
**Version:** 1.0.0  
**Status:** Production Ready ✅
