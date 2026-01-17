# Deployment Documentation

This directory contains deployment guides and configuration for different hosting platforms.

## 🚀 Deployment Options

| Platform | Type | Best For | Status |
|----------|------|----------|--------|
| **Vercel** | Frontend + Serverless | Quick deployment, global CDN | ✅ Recommended |
| **Netlify** | Frontend + Functions | Easy setup, good for static sites | ✅ Good Alternative |
| **Railway** | Full Stack | Database + backend + frontend | 🔄 Planned |
| **AWS** | Enterprise | Scalable, production-ready | 🔄 Planned |
| **Heroku** | Backend Focus | API deployment | 🔄 Legacy |

## ⚡ Quick Deploy (Vercel - Recommended)

### Prerequisites
- GitHub account
- Vercel account (free)
- SendGrid API key (for email features)

### Steps (5 minutes)

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Connect your GitHub repository

2. **Configure Build Settings**
   ```
   Framework: Vite
   Root Directory: ./
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

3. **Add Environment Variables**
   ```bash
   # Authentication
   JWT_SECRET=your-production-jwt-secret-min-32-chars
   JWT_EXPIRES_IN=7d
   JWT_REFRESH_EXPIRES_IN=30d

   # Email (SendGrid)
   SENDGRID_API_KEY=SG.your-production-sendgrid-key
   EMAIL_FROM=noreply@regisbridge.ac.zw
   EMAIL_TO=school@regisbridge.ac.zw

   # Frontend
   VITE_API_URL=https://your-app.vercel.app/api
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build completion
   - Get your production URL

## 🔧 Environment Configuration

### Production Environment Variables
```bash
# Security (REQUIRED - Change these!)
JWT_SECRET=your-unique-production-secret-minimum-32-characters
SENDGRID_API_KEY=SG.your-production-sendgrid-api-key

# URLs
VITE_API_URL=https://your-domain.com/api
CORS_ORIGINS=https://your-domain.com

# Email
EMAIL_FROM=noreply@regisbridge.ac.zw
EMAIL_TO=contact@regisbridge.ac.zw

# Database (Future - Phase 5)
DATABASE_URL=postgresql://user:pass@host:5432/db
```

### Environment File Setup
```bash
# Create production .env file
cp .env.example .env.production

# Edit with production values
nano .env.production
```

## 📦 Build Process

### Frontend Build
```bash
# Install dependencies
npm ci

# Build for production
npm run build

# Preview build locally
npm run preview
```

### Backend Build (Vercel Serverless)
- Automatic with Vercel functions
- No manual build required
- Serverless function deployment

## 🌐 Domain Configuration

### Custom Domain (Vercel)
1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed
4. Wait for SSL certificate provisioning

### DNS Configuration
```
Type: CNAME
Name: www (or @ for root)
Value: cname.vercel-dns.com
```

## 🔒 Security Checklist

### Pre-Deployment
- [ ] Change JWT_SECRET to strong random value
- [ ] Verify SendGrid API key is production key
- [ ] Update CORS_ORIGINS to production domain
- [ ] Remove debug logging
- [ ] Enable production error handling

### Post-Deployment
- [ ] Test authentication flows
- [ ] Verify email sending
- [ ] Check admin dashboard access
- [ ] Test contact forms
- [ ] Monitor error logs

## 📊 Monitoring & Analytics

### Vercel Analytics
- Built-in performance monitoring
- Real user monitoring (RUM)
- Error tracking
- Function execution logs

### External Monitoring (Recommended)
```bash
# Add to production (future)
# Sentry for error tracking
# LogRocket for session replay
# Google Analytics for usage stats
```

## 🔄 Deployment Workflow

### Development → Production
1. **Develop locally** with `npm run dev`
2. **Test thoroughly** using testing guides
3. **Commit changes** to GitHub
4. **Automatic deployment** via Vercel
5. **Verify production** functionality
6. **Monitor errors** and performance

### Rollback Process
1. Go to Vercel dashboard
2. View deployment history
3. Click "Rollback" on previous deployment
4. Verify rollback success

## 🚨 Troubleshooting

### Build Failures
**Issue:** `npm run build` fails
**Solution:**
- Check for TypeScript errors
- Verify all dependencies installed
- Check environment variables
- Review build logs in Vercel

### Runtime Errors
**Issue:** Application crashes in production
**Solution:**
- Check Vercel function logs
- Verify environment variables
- Test API endpoints
- Check CORS configuration

### Authentication Issues
**Issue:** Login fails in production
**Solution:**
- Verify JWT_SECRET is set
- Check token expiration settings
- Test with production API URL
- Clear browser localStorage

## 📈 Performance Optimization

### Vercel Optimizations
- Automatic image optimization
- Global CDN distribution
- Edge function deployment
- Automatic scaling

### Code Optimizations
```typescript
// Enable production optimizations
if (import.meta.env.PROD) {
  // Disable development features
  // Enable production logging
  // Optimize bundle size
}
```

## 💰 Cost Estimation

### Vercel (Free Tier)
- **Frontend:** Free (100GB bandwidth/month)
- **Serverless Functions:** Free (100GB-hours/month)
- **Database:** Additional cost (future)

### SendGrid (Email)
- **Free Tier:** 100 emails/day
- **Paid Plans:** From $19.95/month (50k emails)

### Total Estimated Cost: **$0-20/month**

## 🔄 CI/CD Pipeline

### GitHub Integration
- Automatic deployments on push to main
- Preview deployments for pull requests
- Branch protection rules

### Deployment Script (Future)
```bash
# deploy.sh
#!/bin/bash
npm run build
npm run test  # Future: add tests
# Deploy to Vercel via CLI
```

## 📚 Deployment Guides

### Complete Setup Guides
- **`vercel-deployment.md`** - Step-by-step Vercel deployment
- **`netlify-deployment.md`** - Netlify alternative deployment
- **`production-checklist.md`** - Pre-deployment verification

### Configuration Files
- **`vercel.json`** - Vercel configuration
- **`.vercelignore`** - Files to exclude from deployment

## 🎯 Success Criteria

### Deployment Success
- [ ] Application loads without errors
- [ ] Authentication works correctly
- [ ] Admin dashboard accessible
- [ ] Email functionality operational
- [ ] Contact forms working
- [ ] Mobile responsive
- [ ] Fast loading times (<3s)

### Production Readiness
- [ ] SSL certificate active
- [ ] Custom domain configured
- [ ] Environment variables secure
- [ ] Error monitoring active
- [ ] Backup strategy in place

## 🆘 Support

### Deployment Issues
- Check Vercel deployment logs
- Review environment variables
- Test locally with production config
- Check network/firewall settings

### Performance Issues
- Use Vercel analytics
- Check bundle size
- Optimize images
- Implement caching strategies

### Security Concerns
- Regularly rotate JWT secrets
- Monitor for suspicious activity
- Keep dependencies updated
- Use HTTPS only

---

*Deployment Documentation - Updated: November 4, 2025*  
*Recommended: Vercel deployment (5-minute setup)*  
*Cost: Free tier available, production-ready*