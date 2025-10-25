# Vercel Deployment Guide for Regisbridge School

## Prerequisites

1. **Vercel Account**: Sign up at https://vercel.com
2. **Vercel CLI** (optional): `npm install -g vercel`
3. **Git Repository**: Push your code to GitHub, GitLab, or Bitbucket

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

#### Frontend Deployment

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com/dashboard
   - Click "Add New Project"

2. **Import Repository**
   - Connect your Git provider (GitHub/GitLab/Bitbucket)
   - Select the `v54` repository
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (leave as root)
   - **Build Command**: `npm run build` (or use default)
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Environment Variables**
   - Add the following environment variables:
   ```
   VITE_API_URL=https://your-backend-url.vercel.app/api
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your frontend will be live at: `https://your-project.vercel.app`

#### Backend Deployment

1. **Create New Project**
   - Click "Add New Project" again
   - Select the same repository

2. **Configure Backend Project**
   - **Framework Preset**: Other
   - **Root Directory**: `./server`
   - **Build Command**: Leave empty
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

3. **Environment Variables** (Important!)
   Add these in Vercel dashboard:
   ```
   NODE_ENV=production
   JWT_SECRET=your-super-secret-jwt-key-here-minimum-32-characters
   SENDGRID_API_KEY=your-sendgrid-api-key
   ALLOWED_ORIGINS=https://your-frontend.vercel.app
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

4. **Deploy Backend**
   - Click "Deploy"
   - Copy the backend URL (e.g., `https://your-backend.vercel.app`)

5. **Update Frontend Environment**
   - Go back to your frontend project settings
   - Update `VITE_API_URL` to your backend URL
   - Redeploy frontend

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy Frontend**
   ```bash
   # From project root
   vercel --prod
   ```

4. **Deploy Backend**
   ```bash
   cd server
   vercel --prod
   ```

## Important Configuration

### CORS Setup

After deploying, update the backend's `ALLOWED_ORIGINS` environment variable:
```
ALLOWED_ORIGINS=https://your-frontend.vercel.app,https://your-frontend-*.vercel.app
```

### Database Setup

⚠️ **Important**: The current backend uses in-memory storage. For production:

1. **Choose a Database**:
   - Vercel Postgres (recommended)
   - MongoDB Atlas
   - PlanetScale
   - Supabase

2. **Update Backend Code**:
   - Replace `Map()` storage with database queries
   - Add database connection in `server/index.js`

### Security Checklist

- [ ] Set strong `JWT_SECRET` (32+ characters)
- [ ] Configure `ALLOWED_ORIGINS` with your frontend URL
- [ ] Enable rate limiting
- [ ] Set up database (don't use in-memory storage)
- [ ] Configure SendGrid for emails
- [ ] Enable HTTPS (automatic on Vercel)
- [ ] Review and test all endpoints

## Post-Deployment

### Testing

1. **Test Login**:
   - Visit your deployed frontend
   - Try logging in with superuser:
     - Email: `superadmin@regisbridge.edu`
     - Password: `SuperAdmin123!`

2. **Test API**:
   ```bash
   curl https://your-backend.vercel.app/api/health
   ```

### Monitoring

- View logs in Vercel Dashboard
- Set up monitoring alerts
- Check performance metrics

## Troubleshooting

### Common Issues

1. **CORS Error**:
   - Verify `ALLOWED_ORIGINS` includes your frontend URL
   - Check backend deployment logs

2. **Build Failed**:
   - Check build logs in Vercel dashboard
   - Verify all dependencies are in `package.json`
   - Ensure Node.js version compatibility

3. **API Not Responding**:
   - Check backend deployment status
   - Verify environment variables are set
   - Review function logs

### Useful Commands

```bash
# View deployment logs
vercel logs <deployment-url>

# List all deployments
vercel list

# Remove deployment
vercel remove <deployment-name>
```

## URLs After Deployment

- **Frontend**: `https://your-project.vercel.app`
- **Backend**: `https://your-backend.vercel.app`
- **Admin Dashboard**: `https://your-project.vercel.app/admin`

## Automatic Deployments

Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every pull request

## Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for SSL certificate provisioning

## Support

- Vercel Docs: https://vercel.com/docs
- Vite Docs: https://vitejs.dev/
- Contact: support@vercel.com
