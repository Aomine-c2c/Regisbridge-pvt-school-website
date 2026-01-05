# Monthly Report Data Extraction Summary
**Report Period:** March 15 - April 21, 2021  
**Compiled by:** Head T. Mutambasere  
**Extracted:** December 9, 2025

## ✅ Data Successfully Extracted and Applied

### 1. **School Leadership** → `src/lib/school-config.ts`
- **Head Teacher:** T. Mutambasere (EC: 0225902 V, B.Ed Administration, 20+ years experience)
- **Deputy Head:** P.K. Mhlanga (EC: 0884950 B, Diploma in Ed General)
- **Teacher In Charge:** T. Munyani (EC: M155134, B.Ed ECD)
- **ICT Coordinator:** W. Mafunga (EC: 0998176Y, Diploma in Ed General)

### 2. **Staff Information** → `src/lib/seed-data-staff.ts`
**14 Teachers Total:**
- 3 with Degrees in Education
- 6 with Diplomas in Education General
- 5 with Diplomas in ECD
- Experience ranging from 1-2 years to 20+ years

**Complete Staff List with EC Numbers and Qualifications:**
1. T. Mutambasere (Head) - 0225902 V
2. P.K. Mhlanga (Deputy) - 0884950 B
3. T. Munyani (TIC) - M155134
4. T. Shambare - 1992967S
5. C. Gwazawafa - 1336237X
6. T. Matinia
7. G. Nyadenga - 1998279R
8. T. Goneso - M162944
9. M. Gotora - 1995241P
10. E. Hondo - 1997245S
11. E. Dhiura - 5503670Z
12. M. Nhende - 2004836T
13. R. Nyamaropa - 1996507Q
14. W. Mafunga (ICT) - 0998176Y

**Additional Staff:**
- 4 Boarding caregivers
- 2 Kitchen staff

### 3. **Enrollment Data** → `src/lib/seed-data-enrollment.ts`
**March 15, 2021 (Opening):** 258 students (130 male, 128 female)  
**April 21, 2021 (Current):** 286 students (127 male, 149 female)  
**Growth:** +28 students (+10.9%)

**Grade-by-Grade Breakdown:**
| Grade | Opening | Current | Growth |
|-------|---------|---------|--------|
| ECD A | 24 | 16 | -8 (-33.3%) |
| ECD B1 | 27 | 46 | +19 (+70.4%) ⭐ |
| ECD B2 | 29 | 30 | +1 (+3.4%) |
| Grade 1A | 20 | 20 | 0 |
| Grade 1B | 18 | 20 | +2 (+11.1%) |
| Grade 2A | 17 | 19 | +2 (+11.8%) |
| Grade 2B | 16 | 17 | +1 (+6.3%) |
| Grade 3 | 31 | 33 | +2 (+6.5%) |
| Grade 4 | 29 | 19 | -10 (-34.5%) ⚠️ |
| Grade 5 | 18 | 16 | -2 (-11.1%) |
| Grade 6 | 18 | 21 | +3 (+16.7%) |
| Grade 7 | 10 | 10 | 0 |

**Key Insights:**
- Fastest growing: ECD B1 (+70.4%), Grade 6 (+16.7%)
- Concern areas: ECD A (-33.3%), Grade 4 (-34.5%)
- ECD, Grades 1, 2, and 3 expected to continue growing

### 4. **Fee Structures (2021)** → `src/lib/seed-data-fees.ts`

#### **ECD Fees: $180 USD per term**
- Base tuition: $120
- Covid-19 levies: $25
- Online lessons: $36
- **Total: $180**

#### **Primary (Grades 1-7) Fees: $225 USD per term**
- Base tuition: $150
- Covid-19 levies: $25
- Online lessons: $36
- Top-up: $75 (approved at AGM March 17, 2021)
- **Total: $225**

#### **Boarding Fees: $210 USD per term**
- Old fee: $150
- Top-up: $60 (approved at meeting March 21, 2021)
- **New fee: $210** (effective April 17, 2021)

**Important Notes:**
- Online fees and Covid-19 levies to be removed from Term 2, 2021
- Adjusted fees for future terms: ECD $180, Primary $225 (without online/Covid add-ons)

### 5. **Financial Records** → `src/lib/seed-data-financial.ts`

#### **Revenue Sources:**
- School fees (main source)
- Collection challenges due to Covid-19, winter uniform purchases, fear of 3rd wave

#### **Expenditures (March-April 2021):**
- ✅ Textbooks and stationery purchased
- ✅ Staff salaries (increased 30-40% effective May 2021)
- ✅ Teacher welfare (tea at 10:00, lunch at 13:00)
- ✅ Covid-19 equipment (5 masks per student, sanitizers, thermometers, fumigation)
- 🔨 Construction: 1x3 classroom block + 1 staff house (at roofing stage)

#### **Planned Expenditures:**
1. More textbooks (ECD to Grade 7)
2. More toys, TV, laptops for ECD
3. Repair toilet/shower systems in boarding house
4. Repainting entire school building
5. Complete staff house and classroom block
6. Repair broken furniture, new chairs for infant classes
7. Garden tools and work suits for grounds men
8. Extra Covid-19 equipment (thermometer, suits)
9. Writing boards for classrooms
10. Repair two main gates (keep animals out)

#### **Income Generating Projects (Planned):**
- 🐝 Bee keeping
- 🐔 Chicken rearing

### 6. **Academic Calendar 2021** → `src/lib/seed-data-enrollment.ts`
- **Term 1:** March 22 - June 4, 2021 (11 weeks)
- **Term 2:** June 28 - September 10, 2021 (11 weeks)
- **Term 3:** October 4 - December 17, 2021 (11 weeks)

**Term 1 Events:**
- March 15: Schools reopening (post Covid-19)
- March 17: Annual General Meeting (budgets adopted, new head introduced)
- March 21: Boarding parents meeting (fee increase approved)
- April 21: DSI meeting in Kadoma
- May 12: Civvies Day
- May 17-29: Termly tests
- May 31 - June 3: Parent consultation
- June 4: Term 1 closing

### 7. **School Facilities & Development**
#### **Construction Projects (March-April 2021):**
- One 1x3 rooms classroom block (roofing stage)
- One staff house (roofing stage)

#### **Grounds Maintenance:**
- ✅ Grass cut short
- ✅ Bushes around perimeter cleared
- ✅ Shrubs neatly shaped
- ⏳ Basketball court grass needs further cutting
- ⚠️ Two main gates need repair (domestic animals entering)

#### **Boarding Facilities:**
- Clean food with specified timetable and diet
- Rooms and toilets cleaned daily
- Television set for entertainment
- Telephone facility for parent communication
- 4 assigned staff members + 2 kitchen staff

### 8. **Covid-19 Protocols**
- 5 masks per student
- Social distancing: max 20 kids per class
- Handwashing, sanitization, temperature checks at gate
- Regular classroom fumigation
- Covid-19 levies: $25 per learner per term

### 9. **Sports & Activities**
- Athletics practice started (learners divided into houses)
- Abandoned due to Covid-19 protocols
- Sports master to develop safe sporting activities

### 10. **Meetings Held (March-April 2021)**
- **March 17:** Annual General Meeting (2020 financial report + 2021 budget adopted)
- **March 21:** Boarding parents meeting (fee increase approved)
- **April 21:** DSI meeting in Kadoma (Head, SDC chair, Grade 7 teacher attended)
- Multiple staff meetings (schemes of work, expectations, displays, timings)
- Prefects meeting (roles, behaviors, duties)
- Boarding staff meeting (caring, holidays, food)

## 📊 Key Statistics Summary

| Metric | Value |
|--------|-------|
| **Total Students** | 286 (as of April 21, 2021) |
| **Total Staff** | 14 teachers + 6 boarding/kitchen staff |
| **ECD Students** | 92 (32% of total) |
| **Primary Students** | 194 (68% of total) |
| **Male Students** | 127 (44%) |
| **Female Students** | 149 (56%) |
| **Teachers with Degrees** | 3 (21%) |
| **Teachers with Diplomas** | 11 (79%) |
| **Construction Projects** | 2 (classroom block + staff house) |

## 🎯 Challenges Identified

1. **Financial:** Fee collection challenges due to Covid-19, need for income-generating projects
2. **Staffing:** Mr. Mutsvanemoto resigned (Grade 3), not yet replaced; Ms. Nyamaropa handling 33 learners alone
3. **Facilities:** Toilet/shower repairs needed, gates need fixing, furniture repairs needed
4. **Enrollment:** ECD A and Grade 4 experiencing decline
5. **Sports:** Limited activities due to Covid-19 protocols
6. **Boarding:** Some parents not updated on payments

## 📁 Files Created/Updated

1. ✅ `src/lib/seed-data-staff.ts` - Complete staff database with 14 teachers
2. ✅ `src/lib/seed-data-enrollment.ts` - Enrollment data, calendar, events
3. ✅ `src/lib/seed-data-financial.ts` - Revenue, expenditure, planned projects
4. ✅ `src/lib/seed-data-fees.ts` - Updated with real 2021 fees
5. ✅ `src/lib/school-config.ts` - Added leadership team information

## 🔄 Next Steps

1. **Integrate with Admin Dashboard:**
   - Connect staff data to UserManagement component
   - Display enrollment trends in FinanceManagement charts
   - Show financial records in admin overview
   
2. **Historical Data:**
   - Process more monthly reports (2019-2022) for trends
   - Build comprehensive financial history
   
3. **Current Data:**
   - Update with 2025 current enrollment
   - Update current staff roster
   - Update current fee structures

4. **Archive:**
   - Move processed monthly report to `docs/processed/financial/`

---

**Report Status:** ✅ COMPLETE - All extractable data has been captured and organized into seed data files ready for integration with the admin dashboard.
