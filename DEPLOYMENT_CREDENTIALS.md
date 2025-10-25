# 🔐 Deployment Credentials & Configuration

> **⚠️ IMPORTANT:** Keep this file secure and DO NOT commit it to Git!
> This file is already in .gitignore

---

## 🔑 Generated JWT Secret

**JWT_SECRET:**
```
3ffe1eb7768a30af9d5692a10a5d769f132aeec94137dd56daf32e04d71aefa9
```

---

## 📧 SendGrid Configuration

**SENDGRID_API_KEY:**
```
[Paste your SendGrid API key here]
```

**Get your SendGrid API key:**
1. Go to: https://app.sendgrid.com/settings/api_keys
2. Click "Create API Key"
3. Name: "Regisbridge Production"
4. Permission: Full Access or Mail Send
5. Copy the key and paste above

---

## 🌐 Deployment URLs

### Backend URL:
```
[Will be filled after backend deployment]
Example: https://regisbridge-backend.vercel.app
```

### Frontend URL:
```
[Will be filled after frontend deployment]
Example: https://regisbridge-frontend.vercel.app
```

---

## 📋 Environment Variables for Vercel

### Backend Environment Variables:
Copy these to Vercel Dashboard when deploying backend:

```env
NODE_ENV=production
JWT_SECRET=3ffe1eb7768a30af9d5692a10a5d769f132aeec94137dd56daf32e04d71aefa9
SENDGRID_API_KEY=[Your SendGrid API key]
ALLOWED_ORIGINS=[Your frontend URL after deployment]
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend Environment Variables:
Copy these to Vercel Dashboard when deploying frontend:

```env
VITE_API_URL=[Your backend URL]/api
```

---

## ✅ Deployment Checklist

- [x] Git repository initialized
- [x] JWT secret generated
- [ ] SendGrid API key obtained
- [ ] Code pushed to GitHub
- [ ] Backend deployed to Vercel
- [ ] Frontend deployed to Vercel
- [ ] Backend CORS updated with frontend URL
- [ ] All features tested

---

## 🚀 Quick Deployment Steps

1. **Get SendGrid API Key** (if you haven't already)
2. **Push to GitHub** (see below)
3. **Deploy Backend** → Copy URL
4. **Deploy Frontend** → Use backend URL
5. **Update Backend CORS** → Add frontend URL

---

## 💾 Push to GitHub

```powershell
# If you haven't created a GitHub repo yet:
# 1. Go to https://github.com/new
# 2. Create a new repository named "regisbridge-school"
# 3. Copy the repository URL

# Then run:
git remote add origin https://github.com/YOUR_USERNAME/regisbridge-school.git
git branch -M main
git push -u origin main
```

---

## 📞 Support

- Vercel Dashboard: https://vercel.com/dashboard
- SendGrid Dashboard: https://app.sendgrid.com
- Deployment Guide: See DEPLOYMENT_GUIDE.md

---

**Last Updated:** October 25, 2025
