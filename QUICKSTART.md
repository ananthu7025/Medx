# 🚀 MedX Quick Start Guide

## Installation & Setup (5 minutes)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start MongoDB
Make sure MongoDB is running on your machine:
- **Windows:** Open MongoDB Compass or run `mongod` in terminal
- **Mac/Linux:** Run `mongod` in terminal

### Step 3: Seed the Database
```bash
npm run seed
```

### Step 4: Start Development Server
```bash
npm run dev
```

### Step 5: Open Browser
Go to [http://localhost:3000](http://localhost:3000)

---

## 🧪 Test Accounts

### Admin Access
- **URL:** http://localhost:3000/login
- **Email:** admin@medx.test
- **Password:** Admin123!
- **Access:** Full admin dashboard with all hospitals, jobs, applications

### Hospital Access
- **URL:** http://localhost:3000/login
- **Email:** hospital1@medx.test
- **Password:** Hospital123!
- **Access:** Hospital dashboard to post jobs and manage applications

### Candidate (No Login Required)
- **URL:** http://localhost:3000/jobs
- Browse jobs and apply directly (no account needed)

---

## 📂 Project Overview

### Key Features Implemented
✅ Hospital registration & authentication
✅ Admin & Hospital dashboards
✅ Job posting CRUD operations
✅ Public job browsing
✅ Resume upload for candidates
✅ Application management with status updates
✅ Role-based access control (JWT)
✅ Responsive UI based on html.html template

### Tech Stack
- **Frontend:** Next.js 14 (App Router), React, TypeScript, TailwindCSS
- **Backend:** Next.js API Routes, MongoDB, Mongoose
- **Auth:** JWT with httpOnly cookies, bcrypt
- **File Upload:** Local storage (public/uploads/)

---

## 🗂️ File Structure

```
medx/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Homepage
│   │   ├── join/page.tsx               # Hospital registration
│   │   ├── login/page.tsx              # Login page
│   │   ├── jobs/page.tsx               # Browse jobs
│   │   ├── jobs/[id]/page.tsx          # Job details + apply form
│   │   ├── dashboard/
│   │   │   ├── hospital/page.tsx       # Hospital dashboard
│   │   │   └── admin/page.tsx          # Admin dashboard
│   │   └── api/
│   │       ├── auth/                   # Authentication endpoints
│   │       ├── jobs/                   # Job CRUD endpoints
│   │       ├── applications/           # Application endpoints
│   │       ├── hospitals/              # Hospital endpoints
│   │       └── upload/                 # File upload endpoint
│   ├── components/
│   │   ├── Header.tsx                  # Navigation header
│   │   ├── Footer.tsx                  # Footer
│   │   └── JobCard.tsx                 # Job card component
│   ├── lib/
│   │   ├── mongodb.ts                  # DB connection
│   │   ├── auth.ts                     # JWT utilities
│   │   └── middleware.ts               # Auth middleware
│   ├── models/                         # Mongoose models
│   └── types/                          # TypeScript types
├── scripts/
│   └── seed.ts                         # Database seeder
└── public/
    └── uploads/                        # Resume storage
```

---

## 🎯 User Flows

### Hospital Flow
1. Register at `/join`
2. Login at `/login` → Redirected to `/dashboard/hospital`
3. Create job postings
4. View applications for their jobs
5. Update application status (shortlist/reject)

### Admin Flow
1. Login at `/login` with admin credentials
2. Redirected to `/dashboard/admin`
3. View all hospitals, jobs, and applications
4. Manage entire platform

### Candidate Flow
1. Browse jobs at `/jobs` (no login)
2. Click job → View details at `/jobs/[id]`
3. Fill application form + upload resume
4. Submit (stored in database)

---

## 🔧 Common Commands

```bash
# Development
npm run dev              # Start dev server

# Database
npm run seed             # Seed test data

# Production
npm run build            # Build for production
npm start                # Start production server

# Linting
npm run lint             # Run ESLint
```

---

## 🚨 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Make sure MongoDB is running (`mongod` command)

### Port Already in Use
```
Error: Port 3000 is already in use
```
**Solution:** Kill the process or use a different port:
```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Use different port
PORT=3001 npm run dev
```

### Upload Errors
If resume uploads fail, ensure `public/uploads/` directory exists:
```bash
mkdir -p public/uploads
```

---

## 📝 Next Steps

1. **Deploy to Vercel:**
   - Connect GitHub repo to Vercel
   - Add environment variables
   - **Important:** Replace local file uploads with S3

2. **Add Email Notifications:**
   - Install SendGrid or Mailgun
   - Send application receipts to candidates
   - Notify hospitals of new applications

3. **Enhance Security:**
   - Add rate limiting (express-rate-limit)
   - Add CORS configuration
   - Add input sanitization

4. **Future Features:**
   - Candidate accounts & profiles
   - Interview scheduling
   - Payment for featured jobs
   - Advanced search & filters

---

## 💡 Tips

- Use **Admin Dashboard** to verify all data is being stored correctly
- Check `public/uploads/` folder to see uploaded resumes
- MongoDB data persists between restarts (no need to re-seed)
- Original HTML template is in `public/html.html` for reference

---

**Need Help?** Check the full README.md for detailed documentation!

Happy coding! 🎉