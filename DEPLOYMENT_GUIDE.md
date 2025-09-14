# 🚀 Deployment Guide

This guide will walk you through deploying your full-stack portfolio to Netlify (frontend) and Vercel (backend).

## 📋 Prerequisites

Before starting, ensure you have:
- ✅ GitHub account
- ✅ Netlify account
- ✅ Vercel account
- ✅ MongoDB Atlas account (for production database)

## 🗄️ Step 1: Set up MongoDB Atlas

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Sign up for a free account

2. **Create a Cluster**
   - Create a new cluster (free tier is sufficient)
   - Choose a cloud provider and region
   - Wait for cluster creation

3. **Set up Database Access**
   - Go to "Database Access" in the sidebar
   - Add a new database user
   - Choose "Password" authentication
   - Save username and password (you'll need these)

4. **Configure Network Access**
   - Go to "Network Access" in the sidebar
   - Add IP Address: `0.0.0.0/0` (allows access from anywhere)
   - **Note**: For production, restrict to specific IPs

5. **Get Connection String**
   - Go to "Clusters" and click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

## ⚡ Step 2: Deploy Backend to Vercel

### 2.1 Prepare Repository

1. **Push to GitHub**
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### 2.2 Deploy to Vercel

1. **Connect to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Project**
   - **Framework Preset**: Other
   - **Root Directory**: `backend`
   - **Build Command**: Leave empty or `npm run build`
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

3. **Add Environment Variables**
   Click "Environment Variables" and add:

   ```bash
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/rashed_sir_db
   JWT_SECRET=your-super-secure-jwt-secret-make-it-long-and-complex
   JWT_EXPIRES_IN=7d
   NODE_ENV=production
   FRONTEND_URL=https://your-netlify-domain.netlify.app
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=SecurePassword123!
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Note your Vercel URL (e.g., `https://your-app.vercel.app`)

### 2.3 Verify Backend Deployment

Visit `https://your-backend-url.vercel.app/api/health` to check if API is running.

## 🌐 Step 3: Deploy Frontend to Netlify

### 3.1 Deploy to Netlify

1. **Connect to Netlify**
   - Go to [Netlify Dashboard](https://app.netlify.com/)
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Configure Build Settings**
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`

3. **Add Environment Variables**
   Go to "Site settings" > "Environment variables" and add:

   ```bash
   VITE_API_URL=https://your-backend-url.vercel.app/api
   VITE_APP_NAME=Academic Portfolio
   VITE_APP_DESCRIPTION=Academic Portfolio Website
   VITE_NODE_ENV=production
   ```

4. **Update Netlify Configuration**
   The `netlify.toml` file is already configured, but update the redirect URL:

   ```toml
   [[redirects]]
     from = "/api/*"
     to = "https://your-actual-backend-url.vercel.app/api/:splat"
     status = 200
   ```

5. **Deploy**
   - Click "Deploy site"
   - Wait for deployment to complete
   - Note your Netlify URL (e.g., `https://your-site.netlify.app`)

### 3.2 Update CORS Settings

Update your backend environment variables in Vercel:
```bash
FRONTEND_URL=https://your-actual-netlify-domain.netlify.app
```

## 🔄 Step 4: Initialize Database

After both deployments are complete, you need to initialize your database with admin credentials and default data.

### Option 1: Automatic Initialization (Recommended)

1. **Initialize via API endpoint**
   - Visit: `https://your-backend-url.vercel.app/api/init/init`
   - Use POST method (or use a tool like Postman)
   - This will create admin user and default personal information

2. **Check Status**
   - Visit: `https://your-backend-url.vercel.app/api/init/status`
   - Verify initialization was successful

### Option 2: Manual Script Execution

Run the initialization script with your production database:
```bash
cd backend
MONGODB_URI=your-production-uri npm run init
```

### Option 3: Local Migration (Advanced)

If you want to migrate existing data from JSON files:
```bash
cd backend
MONGODB_URI=your-production-uri npm run migrate
```

### 🔐 Default Credentials

After initialization, you can login with:
- **Email**: From `ADMIN_EMAIL` environment variable (or admin@example.com)
- **Password**: From `ADMIN_PASSWORD` environment variable (or SecurePassword123!)

**⚠️ Important**: Change the default password immediately after first login!

## ✅ Step 5: Verify Deployment

1. **Test Frontend**
   - Visit your Netlify URL
   - Check all pages load correctly
   - Test navigation

2. **Test Backend API**
   - Visit `https://your-backend-url.vercel.app/api/health`
   - Should return API status

3. **Test Admin Panel**
   - Go to `https://your-netlify-url.netlify.app/admin`
   - Login with admin credentials
   - Test CRUD operations

## 🔧 Step 6: Custom Domain (Optional)

### For Netlify (Frontend)
1. Go to "Domain settings" in Netlify
2. Add custom domain
3. Follow DNS configuration instructions

### For Vercel (Backend)
1. Go to "Domains" in Vercel project settings
2. Add custom domain
3. Update DNS records

## 🛠️ Troubleshooting

### Common Issues

**1. CORS Errors**
- Ensure `FRONTEND_URL` in Vercel matches your Netlify domain
- Check browser console for specific CORS errors

**2. Database Connection Issues**
- Verify MongoDB Atlas connection string
- Check database user permissions
- Ensure network access is configured

**3. Environment Variables**
- Double-check all environment variables
- Restart deployments after updating env vars

**4. Build Failures**
- Check build logs in Netlify/Vercel
- Ensure all dependencies are in package.json
- Verify Node.js version compatibility

### Debug Commands

**Check Backend Logs:**
```bash
# In Vercel dashboard, go to Functions > View Function Logs
```

**Check Frontend Build:**
```bash
cd frontend
npm run build
npm run preview
```

**Test API Locally:**
```bash
cd backend
npm run dev
# Test endpoints with curl or Postman
```

## 📚 Additional Resources

- [Netlify Documentation](https://docs.netlify.com/)
- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)

## 🔄 Continuous Deployment

Both Netlify and Vercel are configured for automatic deployments:
- **Push to main branch** → Triggers automatic deployment
- **Pull Request** → Creates preview deployment
- **Environment variables** → Can be updated without redeployment

## 🎉 Success!

Your full-stack portfolio is now live! 

- **Frontend**: https://your-site.netlify.app
- **Backend API**: https://your-backend.vercel.app
- **Admin Panel**: https://your-site.netlify.app/admin

Remember to:
- ✅ Update the URLs in your README
- ✅ Test all functionality in production
- ✅ Set up monitoring and analytics
- ✅ Configure custom domains if needed
