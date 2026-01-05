/**
 * Seed script to add the 2021-2022 financial report to the database
 * Run with: npx tsx scripts/seed-financial-2021-2022.ts
 */

import { PrismaClient } from '@prisma/client';
import type { Currency, IncomeCategory, ExpenseCategory } from '../src/types/financial';

const prisma = new PrismaClient();

// Helper to create currency
const usd = (amount: number): Currency => ({ code: 'USD', symbol: '$', amount });
const rtgs = (amount: number): Currency => ({ code: 'RTGS', symbol: '$', amount });

async function main() {
  console.log('🌱 Seeding 2021-2022 financial report...');

  // Check if report already exists
  const existing = await prisma.financialReport.findFirst({
    where: { title: 'Regisbridge Private School - Annual Report 2021-2022' },
  });

  if (existing) {
    console.log('✅ Report already exists, skipping...');
    return;
  }

  // Income categories
  const income: IncomeCategory[] = [
    {
      name: 'School Fees',
      items: [
        {
          id: 'fees_regisbridge',
          description: 'Fees Income - Regisbridge',
          category: 'fees_regisbridge',
          currencies: [usd(113036), rtgs(881450)],
        },
      ],
      total: [usd(113036), rtgs(881450)],
    },
    {
      name: 'Boarding',
      items: [
        {
          id: 'boarding_income',
          description: 'Boarding Income',
          category: 'boarding_income',
          currencies: [usd(8583), rtgs(178500)],
        },
      ],
      total: [usd(8583), rtgs(178500)],
    },
    {
      name: 'Uniforms',
      items: [
        {
          id: 'uniforms_income',
          description: 'Uniforms Income',
          category: 'uniforms_income',
          currencies: [usd(13060), rtgs(224350)],
        },
      ],
      total: [usd(13060), rtgs(224350)],
    },
    {
      name: 'Administration',
      items: [
        {
          id: 'admin_567',
          description: 'Admin Grade 5, 6 & 7 Income',
          category: 'admin_income',
          currencies: [usd(360), rtgs(1507798.8)],
        },
        {
          id: 'admin_food',
          description: 'Admin from Food',
          category: 'admin_income',
          currencies: [usd(147)],
        },
      ],
      total: [usd(507), rtgs(1507798.8)],
    },
    {
      name: 'Other Income',
      items: [
        {
          id: 'registration',
          description: 'Registration Income',
          category: 'registration_income',
          currencies: [usd(759)],
        },
        {
          id: 'zb_nostro',
          description: 'ZB Nostro',
          category: 'other',
          currencies: [usd(294)],
        },
        {
          id: 'online',
          description: 'Online Income',
          category: 'online_income',
          currencies: [usd(623)],
        },
        {
          id: 'covid_fee',
          description: 'COVID Fee',
          category: 'covid_fee',
          currencies: [usd(3001)],
        },
        {
          id: 'loan_income',
          description: 'Loan Income',
          category: 'loan_income',
          currencies: [usd(4230), rtgs(16040)],
        },
        {
          id: 'graduation_fee',
          description: 'Graduation Fee',
          category: 'graduation_fee',
          currencies: [usd(3557)],
        },
        {
          id: 'marketing',
          description: 'Marketing',
          category: 'marketing',
          currencies: [usd(1050)],
        },
        {
          id: 'transfer',
          description: 'Transfer to ZB 080',
          category: 'transfer',
          currencies: [rtgs(8000)],
        },
      ],
      total: [usd(13514), rtgs(24040)],
    },
  ];

  // Expense categories
  const expenses: ExpenseCategory[] = [
    {
      name: 'Salaries & Benefits',
      items: [
        {
          id: 'staff_salaries',
          description: 'Staff Salaries',
          category: 'staff_salaries',
          currencies: [usd(74262.77)],
        },
        {
          id: 'nssa',
          description: 'NSSA (Social Security)',
          category: 'nssa',
          currencies: [usd(204.62), rtgs(342059.41)],
        },
        {
          id: 'nyaradzo',
          description: 'Nyaradzo (Insurance)',
          category: 'insurance',
          currencies: [usd(850.6), rtgs(245065.12)],
        },
      ],
      total: [usd(75317.99), rtgs(587124.53)],
    },
    {
      name: 'Administration',
      items: [
        {
          id: 'admin',
          description: 'Administration',
          category: 'admin',
          currencies: [usd(10024.24), rtgs(98533.21)],
        },
        {
          id: 'bank_charge',
          description: 'Bank Charges',
          category: 'bank_charge',
          currencies: [usd(83), rtgs(55882.25)],
        },
        {
          id: 'annual_registration',
          description: 'Annual Registration',
          category: 'annual_registration',
          currencies: [usd(10)],
        },
      ],
      total: [usd(10117.24), rtgs(154415.46)],
    },
    {
      name: 'Infrastructure',
      items: [
        {
          id: 'construction',
          description: 'Construction',
          category: 'construction',
          currencies: [usd(23534.58), rtgs(86046.29)],
        },
        {
          id: 'maintenance',
          description: 'Maintenance',
          category: 'maintenance',
          currencies: [usd(300)],
        },
        {
          id: 'block_c_payment',
          description: 'Block C Payment to Stella Nhando',
          category: 'property_payments',
          currencies: [usd(1500)],
        },
      ],
      total: [usd(25334.58), rtgs(86046.29)],
    },
    {
      name: 'Academic',
      items: [
        {
          id: 'grade_67_exams',
          description: 'Grade 6 and 7 Exam Fees',
          category: 'exam_fees',
          currencies: [rtgs(1504746.08)],
        },
        {
          id: 'grade_7_expenses',
          description: 'Grade 7 Expenses',
          category: 'grade_expenses',
          currencies: [usd(253)],
        },
        {
          id: 'education',
          description: 'Education',
          category: 'education',
          currencies: [usd(561.36)],
        },
        {
          id: 'stationery',
          description: 'Stationery',
          category: 'stationery',
          currencies: [usd(1157)],
        },
      ],
      total: [usd(1971.36), rtgs(1504746.08)],
    },
    {
      name: 'Operational',
      items: [
        {
          id: 'boarding',
          description: 'Boarding',
          category: 'boarding',
          currencies: [usd(8620.03)],
        },
        {
          id: 'groceries',
          description: 'Groceries',
          category: 'groceries',
          currencies: [usd(1404.78)],
        },
        {
          id: 'uniforms_expenses',
          description: 'Uniforms Expenses',
          category: 'uniforms_expenses',
          currencies: [usd(9600), rtgs(15254.72)],
        },
        {
          id: 'sports',
          description: 'Sports',
          category: 'sports',
          currencies: [usd(843)],
        },
        {
          id: 'ict_expenses',
          description: 'ICT Expenses',
          category: 'ict_expenses',
          currencies: [usd(550)],
        },
      ],
      total: [usd(21017.81), rtgs(15254.72)],
    },
    {
      name: 'Other Expenses',
      items: [
        {
          id: 'covid_expenses',
          description: 'COVID Expenses',
          category: 'covid_expenses',
          currencies: [usd(482)],
        },
        {
          id: 'student_expenses',
          description: 'Anenyasha & Tinodaishe Mutimbire Expenses',
          category: 'staff_expenses',
          currencies: [usd(7347)],
        },
        {
          id: 'loan_payments',
          description: 'Loan Payments',
          category: 'loan_payments',
          currencies: [usd(1005)],
        },
        {
          id: 'graduation_fee_expense',
          description: 'Graduation Fee',
          category: 'graduation_fee',
          currencies: [usd(3430)],
        },
        {
          id: 'zimra',
          description: 'ZIMRA (Tax Authority)',
          category: 'tax',
          currencies: [usd(573.58), rtgs(468955.12)],
        },
      ],
      total: [usd(12837.58), rtgs(468955.12)],
    },
  ];

  // Create the report
  const report = await prisma.financialReport.create({
    data: {
      reportType: 'income_expenditure',
      title: 'Regisbridge Private School - Annual Report 2021-2022',
      periodStart: new Date('2021-12-16'),
      periodEnd: new Date('2022-12-15'),
      periodLabel: '2021-2022',
      openingBalance: [usd(0), rtgs(0)],
      closingBalance: [usd(2103.44), rtgs(-403.4)],
      income,
      expenses,
      totalIncome: [usd(148700), rtgs(2816138.8)],
      totalExpenses: [usd(146596.56), rtgs(2816542.2)],
      netPosition: [usd(2103.44), rtgs(-403.4)],
      status: 'approved',
      approvalData: {
        compiled: { name: 'To be filled', date: new Date('2022-12-20') },
        deputy: { name: 'To be filled', date: new Date('2022-12-20') },
        head: { name: 'To be filled', date: new Date('2022-12-20') },
        director: { name: 'To be filled', date: new Date('2022-12-20') },
      },
      documentUrl: '/docs/processed/financial/2021-2022-annual-report.md',
      notes: 'Historical financial report for academic year 2021-2022. Original document extracted and digitized.',
      createdBy: 'system',
    },
  });

  console.log('✅ Successfully created financial report:', report.id);
  console.log('📊 Report details:');
  console.log(`   - Title: ${report.title}`);
  console.log(`   - Period: ${report.periodLabel}`);
  console.log(`   - Status: ${report.status}`);
  console.log(`   - Total Income: USD ${(report.totalIncome as any)[0].amount.toLocaleString()}`);
  console.log(`   - Total Expenses: USD ${(report.totalExpenses as any)[0].amount.toLocaleString()}`);
  console.log(`   - Net Position: USD ${(report.netPosition as any)[0].amount.toLocaleString()}`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
