# Data Extraction Guide

This document tracks the extraction of real data from business documents into the system.

## Document Processing Status

### ✅ Completed
- None yet

### 🔄 In Progress
- School Constitution (basic info extraction)

### ⏳ Pending
- Fee structures (Excel files)
- Financial records (Income/Expenditure)
- Staff information
- Student records

---

## 1. Constitution Documents

**Files:**
- `Regisbridge Group of Schools Constitution final.docx`
- `Regisbridge Group of Schools Constitution final 1.docx`

**Data to Extract:**
- [ ] Official school name
- [ ] Mission statement
- [ ] Vision statement
- [ ] School motto (already have: "Supervincimus - We Conquer Together")
- [ ] Core values
- [ ] Governance structure
- [ ] School policies
- [ ] Official address
- [ ] Contact information

**Target Files to Update:**
- `src/lib/school-config.ts`
- `src/app/layout.tsx`
- `src/components/AboutSection.tsx`
- `README.md`

---

## 2. Fee Structure Documents

**Files:**
- `REGISBRIDGE FEES UPDATE FINAL.xlsx`
- `REGISBRIDGE TERM 1 2021 FEES UPDATE.xlsx`
- `REGISBRIDGE TERM 2 2021 FEES UPDATE.xlsx`
- `2ND TERM FEES PROPOSAL &LEARNING STRATEGIES.docx`

**Data to Extract:**
- [ ] Tuition fees by grade
- [ ] Boarding fees
- [ ] Development levy
- [ ] Exam fees
- [ ] Other charges (transport, uniform, etc.)
- [ ] Payment terms and schedules
- [ ] Currency and effective dates

**Actions:**
1. Create `prisma/schema.prisma` entries for FeeStructure model
2. Create seed data file: `prisma/seed-fees.ts`
3. Create API endpoint: `/api/fees/structure`
4. Update `FinanceManagement` component with real data
5. Update `AdmissionsSection` with fee information

---

## 3. Financial Records (Income & Expenditure)

**Files (2019-2022 records):**
- Monthly expenditure files (multiple)
- Term income and expenditure files
- Budget files (2020, 2021)
- Salary schedules

**Data to Extract:**
- [ ] Monthly income by category
- [ ] Monthly expenditure by category
- [ ] Revenue trends (2019-2022)
- [ ] Major expense categories
- [ ] Budget vs actual analysis

**Actions:**
1. Create database schema for financial records
2. Extract and aggregate data by year/month
3. Create seed file with historical data
4. Update admin dashboard with real statistics
5. Create financial reports component

---

## 4. School Proposal Documents

**Files:**
- `Regisbridge School Proposal.docx`
- `Regisbridge_Project_Proposal.docx`

**Data to Extract:**
- [ ] Detailed school description
- [ ] Facilities list
- [ ] Academic programs
- [ ] Target enrollment numbers
- [ ] Unique selling points
- [ ] Future development plans

**Target Components:**
- `AboutSection.tsx`
- `AcademicsSection.tsx`
- `BoardingSection.tsx`

---

## 5. Application and Registration Forms

**Files:**
- `APPLICATION FOR REGISTRATION.docx` (4 versions)
- `REGISBRIDGE INDEMNITY FORM.docx`

**Data to Extract:**
- [ ] Required fields for application
- [ ] Document requirements
- [ ] Terms and conditions
- [ ] Indemnity clauses

**Actions:**
1. Update `OnlineApplication.tsx` component
2. Update registration form validation
3. Create proper form PDFs for download
4. Update application workflow

---

## 6. Staff and Employment Documents

**Files:**
- `SALARY SCHEDULE REGIS MARCH 2020 FINAL-1.docx`
- `EMPLOYEMENT TERMINATION FOR1.docx`
- `Profit Sharing Contract.docx`

**Data to Extract:**
- [ ] Staff positions and structure
- [ ] Salary scales (anonymized)
- [ ] Employment terms
- [ ] Organizational hierarchy

**Actions:**
1. Create organizational chart
2. Update "Meet Our Staff" section
3. Add realistic staff profiles (with permission)

---

## 7. Contact Information & Addresses

**Files:**
- `REGGIS COORDINATES.xlsx`
- Various letterhead documents
- Contract documents

**Data to Extract:**
- [ ] GPS coordinates
- [ ] Physical address
- [ ] Postal address
- [ ] Phone numbers
- [ ] Email addresses
- [ ] Bank details (for fees payment)

**Actions:**
1. Update `school-config.ts`
2. Update contact section
3. Update Google Maps integration
4. Update footer information

---

## Data Processing Workflow

### Step 1: Manual Extraction
Since we can't programmatically read .docx/.xlsx files easily:
1. Open document
2. Copy relevant data
3. Update extraction guide with data
4. Mark section as "Data Extracted"

### Step 2: Code Implementation
1. Update `school-config.ts` with extracted data
2. Create database schemas if needed
3. Create seed files for database
4. Update components with real data
5. Remove placeholder/demo data

### Step 3: Document Archival
1. Move processed document to `docs/processed/` folder
2. Add notes about what was extracted
3. Update this guide with completion date

### Step 4: Verification
1. Review changes in development
2. Test all updated components
3. Verify data accuracy
4. Get stakeholder approval

---

## Next Steps

1. **Open Constitution document** - Extract mission, vision, values
2. **Open Fee structure Excel** - Extract current fee schedules  
3. **Create database migrations** - Add schemas for fees, financial records
4. **Implement seed data** - Populate database with real data
5. **Update components** - Replace demo data with real data
6. **Archive documents** - Move to processed folder after extraction

---

## Notes

- All financial data should be anonymized where necessary
- Staff information requires permission before publication
- Student data must NEVER be committed to repository
- Maintain data privacy and comply with regulations
- Keep original documents as backup

---

**Status:** 🔄 In Progress  
**Started:** December 9, 2025  
**Last Updated:** December 9, 2025
