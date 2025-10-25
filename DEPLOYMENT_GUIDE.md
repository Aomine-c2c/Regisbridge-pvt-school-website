# 🚀 Vercel Deployment Guide - Step by Step

## 📋 Pre-Deployment Checklist

### 1. Prerequisites
- [ ] GitHub account with your code pushed
- [ ] Vercel account (sign up at https://vercel.com)
- [ ] SendGrid account and API key (https://sendgrid.com)
- [ ] JWT secret generated (see below)

### 2. Generate JWT Secret
Run this command in PowerShell to generate a secure JWT secret:
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Save this value - you'll need it for the backend deployment.

### 3. Get SendGrid API Key
1. Go to https://app.sendgrid.com/settings/api_keys
2. Click "Create API Key"
3. Give it a name (e.g., "Regisbridge Production")
4. Select "Full Access" or "Mail Send" permission
5. Copy the API key (you won't see it again!)

---

## 🎯 Deployment Process

### STEP 1: Deploy Backend (Do This First!)

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com/new
   - Click "Add New Project"

2. **Import Your Repository**
   - Connect GitHub if not already connected
   - Select your `v54` repository
   - Click "Import"

3. **Configure Backend Settings**
   
   **Project Name:** `regisbridge-backend` (or your choice)
   
   **Root Directory:** 
   - Click "Edit" next to Root Directory
   - Select `server` folder ⚠️ **IMPORTANT!**
   
   **Build & Development Settings:**
   - Framework Preset: `Other`
   - Build Command: Leave empty
   - Output Directory: Leave empty
   - Install Command: `npm install` (should auto-detect)

4. **Add Environment Variables**
   
   Click "Environment Variables" and add these:
   
   | Name | Value |
   |------|-------|
   | `NODE_ENV` | `production` |
   | `JWT_SECRET` | Your generated secret from step 2 above |
   | `SENDGRID_API_KEY` | Your SendGrid API key |
   | `ALLOWED_ORIGINS` | `https://your-frontend-name.vercel.app` (update after frontend deploy) |
   | `RATE_LIMIT_WINDOW_MS` | `900000` |
   | `RATE_LIMIT_MAX_REQUESTS` | `100` |

   > **Note:** For `ALLOWED_ORIGINS`, use a placeholder for now. You'll update it after deploying the frontend.

5. **Deploy Backend**
   - Click "Deploy"
   - Wait for deployment (1-2 minutes)
   - **COPY THE BACKEND URL** (e.g., `https://regisbridge-backend.vercel.app`)

---

### STEP 2: Deploy Frontend

1. **Create New Project**
   - Go to https://vercel.com/new again
   - Click "Add New Project"
   - Import the **SAME repository**

2. **Configure Frontend Settings**
   
   **Project Name:** `regisbridge-frontend` (or your choice)
   
   **Root Directory:** 
   - Leave as `./` (root directory)
   
   **Build & Development Settings:**
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Add Environment Variables**
   
   | Name | Value |
   |------|-------|
   | `VITE_API_URL` | `https://your-backend-url.vercel.app/api` |
   
   Use the backend URL you copied in Step 1, and add `/api` at the end.

4. **Deploy Frontend**
   - Click "Deploy"
   - Wait for deployment (2-3 minutes)
   - **COPY THE FRONTEND URL** (e.g., `https://regisbridge-frontend.vercel.app`)

---

### STEP 3: Update Backend CORS

1. **Go to Backend Project Settings**
   - Open your backend project in Vercel dashboard
   - Go to "Settings" > "Environment Variables"

2. **Update ALLOWED_ORIGINS**
   - Find the `ALLOWED_ORIGINS` variable
   - Edit it to your actual frontend URL
   - Example: `https://regisbridge-frontend.vercel.app`

3. **Redeploy Backend**
   - Go to "Deployments" tab
   - Click the three dots on the latest deployment
   - Click "Redeploy"

---

## ✅ Verification

After deployment, test these:

1. **Frontend Access**
   - Visit your frontend URL
   - Check if the homepage loads correctly

2. **Backend Health**
   - Visit `https://your-backend-url.vercel.app/api/health`
   - Should see: `{"status":"ok","timestamp":"..."}`

3. **Authentication Flow**
   - Try registering a new user
   - Try logging in
   - Check if JWT tokens work

4. **Email Functionality**
   - Test contact form
   - Check if emails are sent via SendGrid

---

## 🔧 Post-Deployment Configuration

### Custom Domain (Optional)

**For Frontend:**
1. Go to your frontend project > Settings > Domains
2. Click "Add Domain"
3. Enter your domain (e.g., `www.regisbridge.com`)
4. Follow DNS configuration instructions

**For Backend:**
1. Go to your backend project > Settings > Domains
2. Add domain (e.g., `api.regisbridge.com`)
3. Update `VITE_API_URL` in frontend to use custom domain
4. Update `ALLOWED_ORIGINS` in backend

### Automatic Deployments

- ✅ Vercel automatically deploys when you push to your main branch
- Preview deployments are created for pull requests
- You can disable this in Settings > Git if needed

---

## 🐛 Troubleshooting

### Frontend shows "Network Error" or "Cannot connect to API"
- Check if `VITE_API_URL` is set correctly
- Verify backend is deployed and accessible
- Check browser console for CORS errors

### Backend returns CORS errors
- Verify `ALLOWED_ORIGINS` includes your frontend URL
- Make sure there are no typos in the URL
- Redeploy backend after updating environment variables

### Email not sending
- Verify `SENDGRID_API_KEY` is correct
- Check SendGrid dashboard for quota/errors
- Ensure API key has "Mail Send" permission

### Build fails
- Check build logs in Vercel
- Verify all dependencies are in `package.json`
- Test build locally: `npm run build`

---

## 📊 Monitoring

### View Logs
- Go to your project in Vercel
- Click "Deployments" > Select deployment > "View Function Logs"

### Analytics
- Enable Web Analytics in Project Settings
- View traffic and performance metrics

### Error Tracking
- Consider integrating Sentry or similar service
- Monitor Vercel logs for runtime errors

---

## 🔄 Updating Your Application

### Deploy Updates
1. Push code to GitHub
2. Vercel automatically builds and deploys
3. Check deployment status in dashboard

### Rollback
1. Go to "Deployments" tab
2. Find previous working deployment
3. Click three dots > "Promote to Production"

---

## 📞 Support

- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
- Community: https://github.com/vercel/vercel/discussions

---

## 🎉 You're Done!

Your Regisbridge School website is now live on Vercel!

**Important URLs to Save:**
- Frontend: `https://your-frontend-name.vercel.app`
- Backend: `https://your-backend-name.vercel.app`
- Admin Panel: `https://your-frontend-name.vercel.app/admin`

**Next Steps:**
1. Test all features thoroughly
2. Set up custom domain (optional)
3. Configure email notifications
4. Set up monitoring and analytics
5. Share with your team!
