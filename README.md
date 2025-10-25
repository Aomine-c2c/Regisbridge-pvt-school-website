# Regisbridge School Management System

A comprehensive school management platform built with React, TypeScript, and Node.js. Features student/parent/teacher portals, admin dashboard, authentication system, and real-time communication.

## 🌟 Features

### User Portals
- **Student Portal:** Assignments, grades, attendance, schedules
- **Parent Portal:** Student progress monitoring, fee payments, communication
- **Teacher Portal:** Grade management, attendance tracking, assignments
- **Admin Dashboard:** Complete school management interface

### Authentication & Authorization
- JWT-based authentication with refresh tokens
- Role-based access control (Student, Parent, Teacher, Admin)
- Protected routes with automatic redirection
- Session persistence and auto-logout
- Secure password hashing (bcrypt)

### Admin Interface ⭐ NEW
- **User Management:** Full CRUD operations for all users
- **Analytics Dashboard:** Real-time statistics and charts
- **Content Management:** News, events, announcements (stub)
- **Academic Management:** Classes, schedules, curriculum (stub)
- **Finance Management:** Fees, payments, invoices (stub)
- **Reports & Analytics:** Custom reports and insights (stub)
- **CSV Export:** Export data for external processing

### Communication
- Real-time chat widget
- Email notifications
- SMS alerts
- Contact forms and inquiries

### UI/UX
- Modern, responsive design (Tailwind CSS)
- Component library (shadcn/ui)
- Internationalization support
- Dark/light theme support
- Mobile-friendly interface

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd v54
   ```

2. **Install dependencies**
   ```bash
   # Frontend
   npm install

   # Backend
   cd server
   npm install
   cd ..
   ```

3. **Start development servers**
   ```bash
   # Option 1: Use batch script (Windows)
   start-servers.bat

   # Option 2: Start manually
   # Terminal 1 - Backend
   cd server
   npm start

   # Terminal 2 - Frontend
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:8080
   - Backend API: http://localhost:3002
   - Admin Dashboard: http://localhost:8080/admin

### Default Admin Credentials
```
Email: admin@regisbridge.edu
Password: Admin123!
```

**Note:** This admin user is automatically created when the server starts.

## 📁 Project Structure

```
v54/
├── src/                          # Frontend source code
│   ├── components/               # React components
│   │   ├── admin/               # Admin dashboard components
│   │   │   ├── shared/          # Reusable admin components
│   │   │   ├── Overview.tsx     # Analytics dashboard
│   │   │   ├── UserManagement.tsx # User CRUD interface
│   │   │   └── ...              # Other admin sections (stubs)
│   │   ├── ui/                  # shadcn/ui components
│   │   └── ...                  # Other app components
│   ├── pages/                    # Page components
│   │   ├── AdminDashboard.tsx   # Admin interface
│   │   ├── Portal.tsx           # User portals
│   │   └── ...
│   ├── contexts/                 # React contexts
│   │   ├── AuthContext.tsx      # Authentication state
│   │   └── AppContext.tsx       # Global app state
│   ├── services/                 # API clients
│   │   ├── adminService.ts      # Admin API calls
│   │   ├── authService.ts       # Auth API calls
│   │   └── ...
│   ├── types/                    # TypeScript type definitions
│   │   └── admin.ts             # Admin types
│   └── ...
├── server/                       # Backend source code
│   ├── index.js                 # Express server
│   └── package.json
├── public/                       # Static assets
├── ADMIN_TESTING.md             # Admin testing guide
├── ADMIN_API_DOCUMENTATION.md   # Admin API reference
└── ...
```

## 🔑 Authentication System

### Registration
```typescript
POST /api/auth/register
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe",
  "role": "student",
  "grade": "10",
  "studentId": "STU2025001"
}
```

### Login
```typescript
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}

// Response
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "student"
  }
}
```

See [AUTHENTICATION_TEST_RESULTS.md](AUTHENTICATION_TEST_RESULTS.md) for complete testing documentation.

## 👨‍💼 Admin Dashboard

### Access
Navigate to `/admin` - requires admin role.

### Features

#### 📊 Overview (Fully Functional)
- Dashboard statistics (users, students, revenue)
- Enrollment trends chart (LineChart)
- Revenue trends chart (BarChart)
- Recent activity feed
- Quick stats cards

#### 👥 User Management (Fully Functional)
- **List Users:** Sortable, searchable, paginated table
- **Create User:** Form with role-based fields
- **Edit User:** Update user information
- **Delete User:** Remove users (with confirmation)
- **Export CSV:** Download user data
- **Filters:** By role, status, search query

#### 🎓 Student Management (Stub)
Ready for implementation:
- Enrollment forms
- Student list and profiles
- Academic records
- Attendance tracking

#### 📰 Content Management (Stub)
Ready for implementation:
- News articles
- Event management
- Announcements
- Gallery

#### 📚 Academic Management (Stub)
Ready for implementation:
- Class schedules
- Subject management
- Teacher assignments
- Curriculum planning

#### 💰 Finance Management (Stub)
Ready for implementation:
- Fee structures
- Payment tracking
- Invoice generation
- Financial reports

#### 📈 Reports & Analytics (Stub)
Ready for implementation:
- Custom report builder
- Advanced analytics
- Data visualization
- Export capabilities

### Testing Admin Interface

See [ADMIN_TESTING.md](ADMIN_TESTING.md) for complete testing checklist.

Quick test:
1. Login as admin (admin@regisbridge.edu / Admin123!)
2. Navigate to http://localhost:8080/admin
3. Test User Management tab (fully functional)
4. Explore Overview dashboard (analytics with mock data)

## 🔌 API Documentation

### Admin Endpoints

All admin endpoints require:
- Authorization header: `Bearer YOUR_JWT_TOKEN`
- User role: `admin`

#### Analytics
- `GET /api/admin/analytics/overview` - Dashboard statistics
- `GET /api/admin/analytics/enrollment` - Enrollment trends
- `GET /api/admin/analytics/revenue` - Revenue trends
- `GET /api/admin/activity-logs` - Recent activity

#### User Management
- `GET /api/admin/users` - List users (with filters, pagination)
- `GET /api/admin/users/:id` - Get user by ID
- `POST /api/admin/users` - Create user
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/export/users` - Export to CSV

See [ADMIN_API_DOCUMENTATION.md](ADMIN_API_DOCUMENTATION.md) for complete API reference.

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify token
- `POST /api/auth/refresh` - Refresh token
- `POST /api/auth/logout` - Logout user

### Other Endpoints
- `POST /api/email/send` - Send email
- `POST /api/contact` - Submit contact form
- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `POST /api/application/submit` - Submit application

## 🛠️ Technology Stack

### Frontend
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Charts:** Recharts
- **Routing:** React Router v6
- **State Management:** React Context API
- **HTTP Client:** Fetch API
- **Icons:** Lucide React

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcrypt
- **Validation:** Joi
- **CORS:** cors middleware
- **Rate Limiting:** express-rate-limit

### Development Tools
- **TypeScript:** Type safety
- **ESLint:** Code linting
- **PostCSS:** CSS processing
- **Vite:** Fast dev server and HMR

## 📝 Development Guide

### Adding New Admin Features

1. **Define Types** (`src/types/admin.ts`)
   ```typescript
   export interface NewFeature {
     id: string;
     name: string;
     // ...
   }
   ```

2. **Add Service Functions** (`src/services/adminService.ts`)
   ```typescript
   export const getNewFeatures = async (): Promise<NewFeature[]> => {
     return authenticatedFetch('/api/admin/new-features');
   };
   ```

3. **Create Component** (`src/components/admin/NewFeatureManagement.tsx`)
   ```typescript
   export default function NewFeatureManagement() {
     // Component logic
   }
   ```

4. **Add Backend Endpoint** (`server/index.js`)
   ```javascript
   app.get('/api/admin/new-features', verifyToken, requireAdmin, async (req, res) => {
     // Endpoint logic
   });
   ```

5. **Add to Dashboard** (`src/pages/AdminDashboard.tsx`)
   ```tsx
   <TabsContent value="new-feature">
     <NewFeatureManagement />
   </TabsContent>
   ```

### Database Integration

Current implementation uses in-memory storage (Map). For production:

1. **Choose Database:**
   - PostgreSQL (recommended for relational data)
   - MongoDB (for flexible schemas)

2. **Install ORM:**
   ```bash
   # Prisma (PostgreSQL)
   npm install @prisma/client
   npm install -D prisma

   # Mongoose (MongoDB)
   npm install mongoose
   ```

3. **Create Schema:**
   ```prisma
   // Prisma example
   model User {
     id        String   @id @default(uuid())
     email     String   @unique
     firstName String
     lastName  String
     role      String
     // ...
   }
   ```

4. **Replace Map with Database Calls:**
   ```javascript
   // Before
   const users = new Map();
   
   // After
   const users = await prisma.user.findMany();
   ```

See server/index.js comments for migration guidance.

## 🧪 Testing

### Frontend Testing
```bash
npm run test
```

### Backend Testing
```bash
cd server
npm test
```

### Manual Testing Checklists
- [ADMIN_TESTING.md](ADMIN_TESTING.md) - Admin interface testing
- [AUTHENTICATION_TEST_RESULTS.md](AUTHENTICATION_TEST_RESULTS.md) - Auth testing
- [TESTING_CHECKLIST.md](TESTING_CHECKLIST.md) - General testing

## 📦 Production Deployment

### Environment Variables

Create `.env` files:

**Frontend (.env):**
```env
VITE_API_URL=https://api.yourschool.edu
VITE_APP_NAME=Regisbridge School
```

**Backend (.env):**
```env
PORT=3002
NODE_ENV=production
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=30d
SENDGRID_API_KEY=your-sendgrid-key
DATABASE_URL=postgresql://user:pass@host:5432/db
```

### Build for Production

```bash
# Frontend
npm run build

# Backend (no build needed, Node.js)
cd server
npm install --production
```

### Deployment Options

1. **Frontend (Static Hosting)**
   - Vercel
   - Netlify
   - AWS S3 + CloudFront
   - Azure Static Web Apps

2. **Backend (Server Hosting)**
   - Heroku
   - AWS EC2/ECS
   - Azure App Service
   - DigitalOcean

3. **Database**
   - AWS RDS (PostgreSQL)
   - MongoDB Atlas
   - Azure Database

### Security Checklist
- [ ] Use environment variables for secrets
- [ ] Enable HTTPS (SSL/TLS)
- [ ] Set secure JWT secret (32+ characters)
- [ ] Configure CORS for production domain only
- [ ] Adjust rate limiting for production traffic
- [ ] Enable database connection pooling
- [ ] Implement database backups
- [ ] Add error monitoring (Sentry)
- [ ] Enable access logs
- [ ] Implement audit logging for admin actions

## 📖 Documentation

- [Getting Started Guide](GETTING_STARTED.md) - Setup and basics
- [Admin Testing Guide](ADMIN_TESTING.md) - Admin interface testing
- [Admin API Reference](ADMIN_API_DOCUMENTATION.md) - Complete API docs
- [Authentication Guide](AUTHENTICATION_TEST_RESULTS.md) - Auth testing
- [Implementation Guide](IMPLEMENTATION_GUIDE.md) - Development patterns
- [Phase 3 Summary](PHASE_3_SUMMARY.md) - Authentication implementation
- [Quick Reference](QUICK_REFERENCE.md) - Common tasks

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/NewFeature`)
3. Commit changes (`git commit -m 'Add NewFeature'`)
4. Push to branch (`git push origin feature/NewFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues or questions:
1. Check documentation in markdown files
2. Review browser console for errors
3. Check server logs for backend errors
4. Refer to testing guides for common scenarios

## 🎯 Roadmap

### Completed ✅
- ✅ Authentication system (JWT, role-based)
- ✅ Admin dashboard structure (8 sections)
- ✅ User management (full CRUD)
- ✅ Analytics dashboard (with mock data)
- ✅ Admin API endpoints (15+ functional)
- ✅ CSV export functionality
- ✅ Responsive UI components
- ✅ Protected routes

### In Progress ⏳
- ⏳ Database integration
- ⏳ Student management (full implementation)
- ⏳ Content management system
- ⏳ Academic management features
- ⏳ Finance management system
- ⏳ Advanced reports and analytics

### Planned 📋
- 📋 File upload system (photos, documents)
- 📋 Email notification system
- 📋 SMS integration
- 📋 Real-time notifications
- 📋 Mobile app (React Native)
- 📋 Parent mobile app
- 📋 Teacher mobile app
- 📋 Advanced analytics dashboard
- 📋 AI-powered insights
- 📋 Automated report generation

## 🌟 Current Status

**Admin Interface:** 40% Complete
- ✅ Foundation (types, services, routing)
- ✅ User Management (fully functional)
- ✅ Analytics Dashboard (mock data)
- ⏳ 5 sections with stubs (ready for implementation)

**Production Readiness:** Development Stage
- ✅ Authentication working
- ✅ Basic admin features functional
- ❌ Needs database integration
- ❌ Needs full feature implementation
- ❌ Needs production deployment setup

---

Built with ❤️ for Regisbridge School
