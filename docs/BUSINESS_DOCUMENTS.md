# Business Documents Reference

This document catalogs the business and administrative documents stored in the `docs/` folder.

## 📁 Document Categories

### 📊 Financial Records

#### Monthly Expenditure Reports
- **Regisbridge Expenditure**: Monthly tracking of school expenses (2018-2022)
- **Royal Angels Expenditure**: Sister institution financial records
- **Files**: `MONTHLY EXPENDITURE REGISBRIDGE *.xlsx`, `*EXPENDITURE*.xlsx`
- **Usage**: Historical financial data for reporting and analysis

#### Term-Based Income/Expenditure
- **Term 1, 2, 3 Reports**: Complete income and expenditure by term (2020-2022)
- **Files**: `TERM * INCOME AND EXPENDITURE*.xlsx`
- **Usage**: Academic year financial planning and analysis

#### Budget Documents
- **School Budgets**: Proposed and approved budgets
- **Files**: `*BUDGET*.xlsx`, `Proposed Regis term * budget*.xlsx`
- **Usage**: Financial planning and resource allocation

### 💰 Fee Structure

#### Fee Proposals & Updates
- **Files**: 
  - `REGISBRIDGE FEES UPDATE FINAL.xlsx`
  - `REGISBRIDGE TERM * FEES UPDATE.xlsx`
  - `2ND TERM FEES PROPOSAL &LEARNING STRATEGIES.docx`
- **Contains**: Tuition fees, boarding fees, exam fees, other charges
- **Usage**: Current fee structure to be integrated into FinanceManagement component

### 📋 School Administration

#### Constitution & Governance
- **Files**: 
  - `Regisbridge Group of Schools Constitution final.docx`
  - `Regisbridge Group of Schools Constitution final 1.docx`
- **Contains**: School governance structure, policies, regulations
- **Usage**: Display in About section, inform policy implementation

#### School Proposals & Reports
- **Files**:
  - `Regisbridge School Proposal.docx`
  - `REGISBRIDGE PVT SCHOOL REPORT.docx`
  - `Regisbridge_Project_Proposal.docx`
- **Contains**: School vision, mission, development plans
- **Usage**: Content for About section, marketing materials

#### Operational Documents
- **Files**:
  - `NEWSLETTER 2021.docx`
  - `REGISBRIDGE MANAGEMENT MEETING.docx`
  - `monthly report.docx`
- **Usage**: Communication templates, meeting records

### 📝 Forms & Templates

#### Application Forms
- **Files**: `APPLICATION FOR REGISTRATION*.docx` (multiple versions)
- **Contains**: Student registration form templates
- **Usage**: Reference for OnlineApplication component fields

#### Employment Documents
- **Files**: 
  - `EMPLOYEMENT TERMINATION FOR1.docx`
  - `SALARY SCHEDULE REGIS MARCH 2020 FINAL-1.docx`
  - `Profit Sharing Contract.docx`
- **Usage**: HR management reference (future implementation)

#### Other Forms
- **Files**:
  - `REGISBRIDGE INDEMNITY FORM.docx`
  - `change of use.docx`
  - `council sewer.docx`
- **Usage**: Administrative forms for various purposes

### 🏢 Assets & Infrastructure

#### Asset Management
- **Files**: 
  - `ASSET REGISTER.docx`
  - `STAFF QUARTES WATER FITTING 1.xlsx`
  - `KNOX COTTAGE.xlsx`
- **Usage**: School property and asset tracking

#### Dining & Boarding
- **Files**: 
  - `Ngezi dinning_hall final.xlsx`
  - `Ngezi 2021*.xlsx` (multiple months)
  - `Mhondoro_dinning_hall*.xlsx`
- **Usage**: Boarding facility management

### 👔 Uniforms & Inventory
- **Files**:
  - `UNIFORM 2023.xlsx`
  - `UNIFORM YEARLY INCOME AND EXPENDITURE 2022.xlsx`
  - `Uniforms monthly expenditure*.xlsx`
- **Usage**: Uniform inventory and sales tracking

### 📍 Other Records
- **Files**:
  - `REGGIS COORDINATES.xlsx` - School location data
  - `ZONE 5 PHYSICAL HEALING CENTERS DATABASE.xlsx` - Community records
  - `annexure C.docx` - Legal/administrative annex

## 🔄 Integration Plan

### Phase 1: Fee Structure (Priority 1)
**Goal**: Extract current fee structure and integrate into system

**Steps**:
1. Parse `REGISBRIDGE FEES UPDATE FINAL.xlsx`
2. Create database schema for fees (grade, term, academic year, amounts)
3. Build admin interface for fee management
4. Update FinanceManagement component with real data

**Files to Parse**:
- `REGISBRIDGE FEES UPDATE FINAL.xlsx`
- `REGISBRIDGE TERM 1 2021 FEES UPDATE.xlsx`

### Phase 2: Application Forms (Priority 2)
**Goal**: Ensure OnlineApplication component matches actual forms

**Steps**:
1. Review `APPLICATION FOR REGISTRATION.docx` fields
2. Update OnlineApplication component to match
3. Add any missing fields (medical info, previous school details, etc.)
4. Implement document upload matching form requirements

**Reference Files**:
- `APPLICATION FOR REGISTRATION.docx`
- `APPLICATION FOR REGISTRATION (1).docx`

### Phase 3: School Information (Priority 3)
**Goal**: Extract school policies, constitution, and information

**Steps**:
1. Parse constitution documents
2. Create CMS content from school proposals
3. Update About section with accurate information
4. Add school policies and regulations page

**Reference Files**:
- `Regisbridge Group of Schools Constitution final.docx`
- `Regisbridge School Proposal.docx`
- `REGISBRIDGE PVT SCHOOL REPORT.docx`

### Phase 4: Document Management System (Priority 4)
**Goal**: Build admin interface for document management

**Features**:
- Upload new documents
- View/download existing documents
- Categorize and tag documents
- Version control for important documents
- Access control (admin-only for sensitive files)

**Component**: `AdminDocumentManager.tsx` (to be created)

### Phase 5: Financial Reporting (Priority 5)
**Goal**: Use historical data for reporting and analytics

**Steps**:
1. Import historical expenditure data
2. Create reporting dashboard
3. Build expense tracking system
4. Generate financial reports and charts

**Data Sources**: Monthly and term expenditure files

## 📝 Data Extraction Notes

### Fee Structure Example
Based on file review, typical fee structure includes:
- **Tuition Fees**: By grade level
- **Boarding Fees**: Day vs. boarding students
- **Exam Fees**: Per term
- **Other Fees**: Transport, uniforms, activities

### Application Fields Required
From registration forms:
- Personal Information (name, DOB, nationality, ID number)
- Contact Information (address, phone, email)
- Parent/Guardian Information
- Previous School Details
- Medical Information
- Emergency Contacts
- Admission Grade/Form
- Day/Boarding Preference

## 🔒 Security Considerations

### Document Access Control
- **Public**: School proposals, newsletters (marketing content)
- **Student/Parent**: Fee structures, application forms
- **Teacher**: Academic templates, schedules
- **Admin Only**: Financial records, salaries, contracts, sensitive documents

### Data Privacy
- Financial records contain sensitive information
- Personal data in application forms must be protected
- Implement role-based access control for document viewing

## 📊 Technical Implementation

### Database Schema Needed

```typescript
// Fee Structure
interface FeeStructure {
  id: string
  academicYear: string
  term: number
  grade: string
  tuitionFee: number
  boardingFee?: number
  examFee?: number
  transportFee?: number
  otherFees?: { name: string; amount: number }[]
  currency: 'USD' | 'ZWL'
  effectiveDate: Date
}

// Document Management
interface Document {
  id: string
  title: string
  category: 'financial' | 'academic' | 'administrative' | 'forms'
  fileType: string
  filePath: string
  uploadedBy: string
  uploadedAt: Date
  accessLevel: 'public' | 'student' | 'teacher' | 'admin'
  tags: string[]
  version: number
}
```

### API Endpoints Needed

```typescript
// Fee Management
POST /api/admin/fees - Create/update fee structure
GET /api/fees - Get current fee structure (public)
GET /api/admin/fees/history - Get fee history (admin)

// Document Management
POST /api/admin/documents/upload - Upload document
GET /api/documents/:id - Download document (with auth check)
GET /api/admin/documents - List all documents
DELETE /api/admin/documents/:id - Delete document
```

## 🎯 Next Steps

1. ✅ **Catalog Complete** - This document created
2. ⏳ **Extract Fee Data** - Parse Excel files for current fees
3. ⏳ **Update Components** - Integrate real fee data into FinanceManagement
4. ⏳ **Document Upload** - Build document management system
5. ⏳ **Content Integration** - Extract school information from Word docs
6. ⏳ **Database Migration** - Create schemas for fees and documents

## 📞 Contact

For questions about specific documents or data extraction needs, consult the school administration.

---

**Last Updated**: December 9, 2025  
**Status**: Catalog Complete, Integration Pending  
**Priority**: Fee Structure → Application Forms → School Info → Document Manager
