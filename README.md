# MedX - Healthcare Hiring Marketplace

A full-stack Next.js application connecting hospitals with healthcare professionals. Built with Next.js 14 (App Router), MongoDB, TypeScript, and JWT authentication.

## 🚀 Features

- **Two User Roles:**
  - `medxAdmin` - Super admin with full access
  - `hospital` - Hospital accounts that can post jobs and manage applications

- **Hospital Dashboard:**
  - Register and login
  - Post job listings
  - View and manage candidate applications
  - Update application status (applied/shortlisted/rejected/hired)

- **Admin Dashboard:**
  - View and manage all hospitals
  - View all jobs and applications
  - Access global analytics

- **Public Features:**
  - Browse job listings (no login required)
  - Apply to jobs with resume upload (no login required)
  - View job details and hospital information

- **Security:**
  - JWT-based authentication
  - Password hashing with bcrypt
  - Role-based access control
  - Protected API routes and pages

## 📋 Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

## 🛠️ Setup Instructions

### 1. Clone and Install

```bash
cd medx
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=mongodb://localhost:27017/medx
JWT_SECRET=your-super-secret-jwt-key-change-this
PORT=3000
NODE_ENV=development
```

**Generate a secure JWT secret:**
```bash
openssl rand -base64 32
```

### 3. Start MongoDB

Make sure MongoDB is running locally, or use MongoDB Atlas and update `MONGODB_URI`.

**Local MongoDB:**
```bash
mongod
```

### 4. Seed Database

Create test accounts and sample data:

```bash
npm run seed
```

This creates:
- **Admin account:** `admin@medx.test` / `Admin123!`
- **Hospital account:** `hospital1@medx.test` / `Hospital123!`
- Sample hospital and 2 sample jobs

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🧪 Testing the Application

### Test as Admin

1. Go to [http://localhost:3000/login](http://localhost:3000/login)
2. Login with: `admin@medx.test` / `Admin123!`
3. You'll be redirected to `/dashboard/admin`
4. View all hospitals, jobs, and applications

### Test as Hospital

1. Go to [http://localhost:3000/login](http://localhost:3000/login)
2. Login with: `hospital1@medx.test` / `Hospital123!`
3. You'll be redirected to `/dashboard/hospital`
4. Create new jobs, view applications

### Test as Candidate (Public)

1. Go to [http://localhost:3000/jobs](http://localhost:3000/jobs)
2. Click on any job
3. Fill out the application form and upload resume
4. Submit application (no login required)

### Register a New Hospital

1. Go to [http://localhost:3000/join](http://localhost:3000/join)
2. Fill out registration form
3. Login with new credentials

## 📁 Project Structure

```
medx/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── api/          # API route handlers
│   │   ├── dashboard/    # Protected dashboard pages
│   │   └── ...
│   ├── components/       # Reusable React components
│   ├── lib/              # Utilities (auth, MongoDB, middleware)
│   ├── models/           # Mongoose schemas
│   └── types/            # TypeScript type definitions
├── scripts/
│   └── seed.ts           # Database seeding script
└── public/
    └── uploads/          # Resume file storage
```

## 🔐 Authentication Flow

1. User registers or logs in via `/api/auth/register` or `/api/auth/login`
2. Server validates credentials and generates JWT token
3. Token stored in httpOnly cookie
4. Protected routes/APIs verify token via middleware
5. User redirected based on role (admin → `/dashboard/admin`, hospital → `/dashboard/hospital`)

## 📦 API Endpoints

### Authentication
- `POST /api/auth/register` - Register hospital
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout

### Jobs
- `GET /api/jobs` - List jobs (public)
- `POST /api/jobs` - Create job (hospital only)
- `GET /api/jobs/[id]` - Get job details (public)
- `PUT /api/jobs/[id]` - Update job (hospital/admin)
- `DELETE /api/jobs/[id]` - Delete job (hospital/admin)

### Applications
- `POST /api/applications` - Apply to job (public)
- `GET /api/applications` - List applications (hospital/admin)
- `PUT /api/applications/[id]` - Update status (hospital/admin)

### Hospitals
- `GET /api/hospitals` - List hospitals (admin only)
- `GET /api/hospitals/[id]` - Get hospital (public)

### Upload
- `POST /api/upload` - Upload resume file

## 🎨 UI/UX Notes

The UI is based on the provided `html.html` template:
- Uses Tailwind CSS with custom color scheme
- Components converted from HTML template (e.g., `JobCard.tsx`)
- Responsive design with mobile-first approach
- Clean, professional healthcare marketplace aesthetic

## ☁️ Deployment Notes

### Vercel Deployment

1. **File Uploads:** Vercel has a read-only filesystem. For production, use:
   - **AWS S3** for file storage
   - **Cloudinary** for resume uploads
   - Update `/api/upload/route.ts` to use cloud storage

2. **Environment Variables:** Add all `.env.local` variables to Vercel dashboard

3. **MongoDB:** Use MongoDB Atlas for production database

4. **Build Command:**
```bash
npm run build
```

### Environment Variables for Production

```env
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/medx
JWT_SECRET=<secure-random-string>
NEXTAUTH_SECRET=<secure-random-string>
NEXTAUTH_URL=https://your-domain.com
NODE_ENV=production
```

## 🔮 Future Module Suggestions

1. **Candidate Accounts & Profiles**
   - Candidate registration and login
   - Profile management with CV builder
   - Track application history
   - Save favorite jobs

2. **Interview Scheduling**
   - Calendar integration
   - Email notifications
   - Video interview links
   - Automated reminders

3. **Featured/Paid Job Postings**
   - Payment integration (Stripe)
   - Featured job badges
   - Promoted listings on homepage
   - Analytics for job visibility

4. **Reporting & Analytics**
   - Application funnel metrics
   - Time-to-hire statistics
   - View/click analytics per job
   - Candidate source tracking

5. **Email Templates & Automation**
   - Application receipt emails
   - Status update notifications
   - Interview invitations
   - Bulk email campaigns

6. **Advanced Search & Filters**
   - Specialty/category filters
   - Salary range filters
   - Location-based search
   - Experience level matching

7. **Reviews & Ratings**
   - Hospital reviews by employees
   - Candidate ratings from employers
   - Verified employee badges

## 🐛 Known Limitations

- File uploads stored locally (not suitable for Vercel - use S3 for production)
- No email service integration (add SendGrid/Mailgun for notifications)
- No rate limiting on public endpoints (add rate limiter for production)
- No CORS configuration (add if needed for external API access)

## 📝 License

MIT

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📧 Support

For issues or questions, please create an issue in the repository.

---

**Built with ❤️ using Next.js, MongoDB, and TypeScript**