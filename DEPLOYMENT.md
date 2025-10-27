# 🚀 Deployment Guide - To-Do List App

This guide will help you deploy your To-Do List application to Vercel.

## 📋 Prerequisites

- GitHub account with your repository pushed
- Vercel account (sign up at https://vercel.com)
- MongoDB Atlas account for production database

---

## 🌐 Deployment Steps

### **Step 1: Set Up MongoDB Atlas (Production Database)**

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user with username and password
4. Whitelist all IPs (0.0.0.0/0) for Vercel connections
5. Get your connection string (e.g., `mongodb+srv://<username>:<password>@cluster.mongodb.net/todolist`)

---

### **Step 2: Deploy Backend to Vercel**

#### Via Vercel Dashboard:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New Project"**
3. Import your GitHub repository: `riteshydv05/ToDo-List`
4. **Root Directory**: Set to `backend`
5. **Framework Preset**: Other
6. **Build Command**: (leave empty)
7. **Output Directory**: (leave empty)
8. **Install Command**: `npm install`

#### Environment Variables (Important!):
Add these in Vercel project settings:

```
MONGO_DB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/todolist
JWT_SECRET_KEY=your-super-secret-jwt-key-change-this-in-production
PORT=4001
NODE_ENV=production
```

9. Click **Deploy**
10. Once deployed, copy your backend URL (e.g., `https://your-backend.vercel.app`)

---

### **Step 3: Deploy Frontend to Vercel**

#### Via Vercel Dashboard:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New Project"**
3. Import the same GitHub repository: `riteshydv05/ToDo-List`
4. **Root Directory**: Set to `frontend`
5. **Framework Preset**: Vite
6. **Build Command**: `npm run build`
7. **Output Directory**: `dist`
8. **Install Command**: `npm install`

#### Environment Variables:
Add this in Vercel project settings:

```
VITE_API_URL=https://your-backend.vercel.app
```

(Replace with your actual backend URL from Step 2)

9. Click **Deploy**
10. Your frontend will be live at `https://your-app.vercel.app`

---

### **Step 4: Update CORS in Backend**

After deployment, you need to update CORS settings to allow your frontend domain.

The backend code should be updated to allow your Vercel frontend URL in CORS settings.

---

## 🔧 Alternative: Deploy via Vercel CLI

### Install Vercel CLI:
```bash
npm install -g vercel
```

### Deploy Backend:
```bash
cd backend
vercel --prod
```

### Deploy Frontend:
```bash
cd frontend
vercel --prod
```

---

## ✅ Post-Deployment Checklist

- [ ] Backend is accessible at your Vercel URL
- [ ] Frontend is accessible at your Vercel URL
- [ ] MongoDB Atlas is connected and accessible
- [ ] CORS is properly configured
- [ ] Environment variables are set correctly
- [ ] Test user registration and login
- [ ] Test creating, updating, and deleting todos
- [ ] Cookies are working across domains (check SameSite settings)

---

## 🐛 Common Issues & Solutions

### Issue: CORS Errors
**Solution**: Make sure your backend CORS configuration includes your frontend Vercel domain.

### Issue: Cookies Not Working
**Solution**: 
- Set `sameSite: 'none'` in cookie options
- Set `secure: true` in production
- Ensure HTTPS is used

### Issue: MongoDB Connection Failed
**Solution**: 
- Check MongoDB Atlas IP whitelist (should include 0.0.0.0/0)
- Verify connection string in environment variables
- Check username/password in connection string

### Issue: API Requests Failing
**Solution**: 
- Verify `VITE_API_URL` environment variable in frontend
- Check Network tab in browser DevTools
- Ensure backend URL is correct

---

## 📝 Environment Variables Summary

### Backend (.env):
```
MONGO_DB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/todolist
JWT_SECRET_KEY=your-super-secret-jwt-key
PORT=4001
NODE_ENV=production
```

### Frontend (.env):
```
VITE_API_URL=https://your-backend.vercel.app
```

---

## 🎉 Success!

Once deployed, your app will be live at:
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-backend.vercel.app`

Share your app with the world! 🌍✨

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
