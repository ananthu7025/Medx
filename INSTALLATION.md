# 🛠️ MedX Installation Guide

## Prerequisites Check

Before starting, make sure you have:

- [ ] **Node.js 18+** installed
  ```bash
  node --version  # Should be v18.0.0 or higher
  ```

- [ ] **npm or yarn** installed
  ```bash
  npm --version   # Should be 8.0.0 or higher
  ```

- [ ] **MongoDB** installed and running
  ```bash
  # Check if MongoDB is running
  mongosh  # Should connect successfully
  # Or check MongoDB Compass
  ```

---

## Installation Steps

### 1️⃣ Install Dependencies

Open terminal in the `Medx` folder and run:

```bash
npm install
```

**Expected output:**
```
added 300+ packages in 30s
```

**If you see errors:** Make sure you're in the correct directory and have internet connection.

---

### 2️⃣ Verify Environment Variables

Check that `.env.local` exists and contains:

```env
MONGODB_URI=mongodb://localhost:27017/medx
JWT_SECRET=medx-super-secret-jwt-key-change-this-in-production
NEXTAUTH_SECRET=medx-nextauth-secret-change-this
NEXTAUTH_URL=http://localhost:3000
PORT=3000
NODE_ENV=development
```

**For production:** Generate secure secrets:
```bash
# Generate JWT secret
openssl rand -base64 32

# Add to .env.local
```

---

### 3️⃣ Start MongoDB

#### Windows:
```bash
# Option 1: MongoDB Compass (GUI)
# Just open MongoDB Compass app

# Option 2: Command line
mongod
```

#### Mac/Linux:
```bash
# Start MongoDB service
brew services start mongodb-community

# Or run directly
mongod --config /usr/local/etc/mongod.conf
```

**Verify MongoDB is running:**
```bash
mongosh
# Should connect to: mongodb://127.0.0.1:27017
```

---

### 4️⃣ Seed the Database

Create test accounts and sample data:

```bash
npm run seed
```

**Expected output:**
```
🌱 Starting seed...
Connecting to MongoDB: mongodb://localhost:27017/medx
✅ Connected to MongoDB
🗑️  Cleared existing data
✅ Created medxAdmin: admin@medx.test
✅ Created hospital user: hospital1@medx.test
✅ Created hospital: City General Hospital
✅ Created 2 sample jobs
🎉 Seed completed successfully!

=== Test Accounts ===
Admin:
  Email: admin@medx.test
  Password: Admin123!

Hospital:
  Email: hospital1@medx.test
  Password: Hospital123!
====================
```

**If seed fails:**
- Make sure MongoDB is running
- Check MONGODB_URI in .env.local
- Try deleting node_modules and running `npm install` again

---

### 5️⃣ Start Development Server

```bash
npm run dev
```

**Expected output:**
```
 ▲ Next.js 14.1.0
  - Local:        http://localhost:3000
  - Environments: .env.local

 ✓ Ready in 2.5s
```

**If port 3000 is in use:**
```bash
# Windows: Find and kill process
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux: Kill process
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

---

## 6️⃣ Verify Installation

### Open Browser and Test:

#### ✅ Homepage
- **URL:** http://localhost:3000
- **Expected:** See hero section, job categories, latest jobs

#### ✅ Jobs Page
- **URL:** http://localhost:3000/jobs
- **Expected:** See 2 sample jobs (Senior ICU Nurse, Physical Therapist)

#### ✅ Login Page
- **URL:** http://localhost:3000/login
- **Expected:** See login form with test accounts info

#### ✅ Admin Login
1. Go to http://localhost:3000/login
2. Enter: `admin@medx.test` / `Admin123!`
3. Should redirect to: http://localhost:3000/dashboard/admin
4. **Expected:** See admin dashboard with hospitals, jobs, applications

#### ✅ Hospital Login
1. Go to http://localhost:3000/login
2. Enter: `hospital1@medx.test` / `Hospital123!`
3. Should redirect to: http://localhost:3000/dashboard/hospital
4. **Expected:** See hospital dashboard with job form and applications

#### ✅ Register New Hospital
- **URL:** http://localhost:3000/join
- **Expected:** See registration form
- Fill out form → Submit → Should redirect to login

#### ✅ Apply to Job (Public)
1. Go to http://localhost:3000/jobs
2. Click any job
3. Click "Apply for this Position"
4. Fill out form + upload resume (PDF/DOC)
5. Submit
6. **Expected:** See success message

---

## 🔍 Verification Checklist

After installation, verify these work:

- [ ] Homepage loads at http://localhost:3000
- [ ] Can see 2 sample jobs on homepage
- [ ] Admin login works (admin@medx.test / Admin123!)
- [ ] Hospital login works (hospital1@medx.test / Hospital123!)
- [ ] Admin dashboard shows all data
- [ ] Hospital dashboard allows creating jobs
- [ ] Can apply to jobs as public user
- [ ] Resume uploads work
- [ ] Applications appear in hospital dashboard
- [ ] Can update application status (shortlist/reject)

---

## 🗄️ Database Verification

### Check MongoDB Data:

```bash
# Connect to MongoDB
mongosh

# Switch to medx database
use medx

# Check collections
show collections
# Should see: users, hospitals, jobs, applications

# Count documents
db.users.countDocuments()      # Should be 2
db.hospitals.countDocuments()  # Should be 1
db.jobs.countDocuments()       # Should be 2

# View admin user
db.users.findOne({role: 'medxAdmin'})

# View hospital
db.hospitals.findOne()

# View jobs
db.jobs.find().pretty()

# Exit
exit
```

---

## 📁 File Structure Verification

Make sure these directories exist:

```
Medx/
├── src/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── models/
│   └── types/
├── public/
│   └── uploads/
├── scripts/
├── node_modules/     ← Should exist after npm install
├── package.json
├── .env.local
└── README.md
```

---

## 🐛 Common Issues & Solutions

### Issue 1: "Cannot find module '@/types'"
**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Issue 2: "ECONNREFUSED 127.0.0.1:27017"
**Solution:** MongoDB is not running. Start MongoDB:
```bash
mongod
```

### Issue 3: "Port 3000 already in use"
**Solution:** Kill the process or use different port:
```bash
PORT=3001 npm run dev
```

### Issue 4: Seed script fails
**Solution:**
1. Make sure MongoDB is running
2. Check .env.local has correct MONGODB_URI
3. Try manually connecting: `mongosh mongodb://localhost:27017/medx`

### Issue 5: Resume upload fails
**Solution:** Ensure uploads directory exists:
```bash
mkdir -p public/uploads
```

### Issue 6: TypeScript errors
**Solution:** Make sure all dependencies are installed:
```bash
npm install --save-dev @types/node @types/react @types/react-dom typescript
```

### Issue 7: Tailwind CSS not working
**Solution:** Restart dev server:
```bash
# Stop server (Ctrl+C)
npm run dev
```

---

## 🚀 Production Deployment

### Vercel Deployment:

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Connect to Vercel:**
   - Go to vercel.com
   - Import your GitHub repository
   - Add environment variables from .env.local
   - Deploy

3. **Important:** Replace file uploads with S3:
   - File uploads won't work on Vercel (read-only filesystem)
   - Use AWS S3, Cloudinary, or UploadThing
   - Update `src/app/api/upload/route.ts`

4. **Use MongoDB Atlas:**
   - Create cluster at mongodb.com/cloud/atlas
   - Get connection string
   - Update MONGODB_URI in Vercel environment variables

---

## 📊 Performance Check

After installation, check performance:

```bash
# Build for production
npm run build

# Check build output
# Should see:
✓ Compiled successfully
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization

# Start production server
npm start
```

---

## 🎓 Next Steps

1. **Test all features** using the verification checklist above
2. **Read QUICKSTART.md** for detailed usage guide
3. **Check README.md** for API documentation
4. **Review PROJECT_SUMMARY.md** for architecture overview

---

## 📞 Get Help

If you encounter issues:

1. Check the troubleshooting section above
2. Review error messages in terminal
3. Check browser console (F12) for frontend errors
4. Verify MongoDB connection
5. Ensure all dependencies are installed

---

## ✅ Installation Complete!

If all checks pass, your MedX platform is ready! 🎉

**Start using:**
```bash
npm run dev
```

Then visit: http://localhost:3000

**Test accounts:**
- Admin: admin@medx.test / Admin123!
- Hospital: hospital1@medx.test / Hospital123!

---

*Last updated: 2024*
*Installation time: ~5 minutes*