# 🔧 Troubleshooting Guide

## Common Deployment Errors

### 1. Frontend Shows 404 NOT_FOUND Error

**Symptom**: White page with "404: NOT_FOUND" error

**Cause**: Frontend can't connect to backend API

**Solutions**:
1. **Check if backend is deployed**
   - Backend must be deployed BEFORE frontend
   - Verify backend URL is accessible

2. **Set VITE_API_URL in Vercel**
   - Go to Vercel Dashboard → Your Frontend Project
   - Settings → Environment Variables
   - Add: `VITE_API_URL` = `https://your-backend-url.vercel.app`
   - Redeploy frontend

3. **Verify environment variable**
   ```bash
   # In frontend/.env (for local testing)
   VITE_API_URL=https://your-backend.vercel.app
   ```

---

### 2. CORS Error

**Symptom**: Console error: "blocked by CORS policy"

**Cause**: Backend not allowing frontend origin

**Solution**:
1. Update backend environment variable:
   ```
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ```
2. Redeploy backend
3. Check `backend/index.js` has correct CORS config

---

### 3. MongoDB Connection Error

**Symptom**: Backend logs show "MongoServerError" or "Authentication failed"

**Cause**: Invalid MongoDB connection string or credentials

**Solutions**:
1. **Check MongoDB Atlas setup**
   - Database Access: User created with password
   - Network Access: IP whitelist (0.0.0.0/0 for Vercel)
   
2. **Verify connection string format**
   ```
   mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>
   ```
   
3. **Common mistakes**
   - Password contains special characters (URL encode them)
   - Wrong database name
   - IP address not whitelisted

---

### 4. Authentication Not Working

**Symptom**: Login successful but immediately logged out / cookies not saving

**Cause**: Cookie settings incompatible with production

**Solution**: Already fixed in code! Check:
1. `backend/jwt/token.js` has production cookie settings
2. `NODE_ENV=production` set in backend Vercel

---

### 5. Build Failed on Vercel

#### Frontend Build Errors

**Symptom**: "Build failed" during frontend deployment

**Solutions**:
1. **Check vercel.json exists in frontend folder**
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "dist",
     "framework": "vite"
   }
   ```

2. **Verify package.json scripts**
   ```json
   {
     "scripts": {
       "build": "vite build"
     }
   }
   ```

3. **Install dependencies locally first**
   ```bash
   cd frontend
   npm install
   npm run build  # Test locally
   ```

#### Backend Build Errors

**Symptom**: "Build failed" during backend deployment

**Solutions**:
1. **Check vercel.json in backend folder**
2. **Verify Node version compatibility**
3. **Test locally**:
   ```bash
   cd backend
   npm install
   npm start
   ```

---

### 6. Routes Not Working (404 on Refresh)

**Symptom**: Page works on initial load but shows 404 when refreshing or accessing directly

**Cause**: SPA routing not configured

**Solution**: Already fixed! Check `frontend/vercel.json` has rewrites:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

### 7. Environment Variables Not Loading

**Symptom**: `undefined` when accessing `import.meta.env.VITE_API_URL`

**Solutions**:
1. **Variable must start with `VITE_`**
   - ✅ Correct: `VITE_API_URL`
   - ❌ Wrong: `API_URL`

2. **Set in Vercel Dashboard**
   - Settings → Environment Variables
   - Add variable
   - **Redeploy** (important!)

3. **For local development**
   - Create `frontend/.env` file
   - Restart dev server

---

### 8. "Module not found" Errors

**Symptom**: Import errors during build

**Solutions**:
1. **Clear node_modules and reinstall**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Check import paths**
   - Use relative paths: `'../config'` not `'config'`
   - Case-sensitive on Linux/Vercel

---

### 9. Backend Timeout

**Symptom**: Request takes too long, times out

**Causes & Solutions**:
1. **MongoDB Atlas sleeping** (free tier)
   - First request after inactivity is slow
   - Subsequent requests are faster
   
2. **Cold start** (serverless)
   - First request wakes up function
   - Normal behavior on free tier

3. **Large database queries**
   - Add pagination
   - Optimize queries

---

### 10. JWT Token Issues

**Symptom**: "Unauthorized" errors, can't access protected routes

**Solutions**:
1. **Check JWT_SECRET_KEY**
   - Must be same value in backend env
   - Minimum 32 characters recommended

2. **Cookie settings**
   - `secure: true` in production (HTTPS)
   - `sameSite: "none"` for cross-origin
   - Already configured in code!

---

## 🔍 Debugging Steps

### Check Frontend Deployment
1. Open browser console (F12)
2. Go to Network tab
3. Try to login/signup
4. Check the API request:
   - URL should be your backend URL (not localhost)
   - Status code should be 200 (not 404 or 500)

### Check Backend Deployment
1. Visit: `https://your-backend.vercel.app`
2. Should see: Backend response (not 404)
3. Check logs in Vercel Dashboard

### Check Environment Variables
1. Vercel Dashboard → Project → Settings → Environment Variables
2. Verify all required variables are set
3. **Must redeploy after adding/changing variables**

### Check MongoDB Connection
1. MongoDB Atlas → Database Access
2. Verify user exists with correct password
3. Network Access → IP Whitelist includes `0.0.0.0/0`

---

## 📞 Still Having Issues?

### Quick Checklist:
- [ ] Backend deployed first?
- [ ] MongoDB Atlas configured?
- [ ] All environment variables set in Vercel?
- [ ] Frontend redeployed after setting VITE_API_URL?
- [ ] Backend FRONTEND_URL points to actual frontend URL?
- [ ] MongoDB IP whitelist includes 0.0.0.0/0?

### Verify Your Setup:

**Frontend Environment (Vercel)**
```
VITE_API_URL=https://your-backend.vercel.app
```

**Backend Environment (Vercel)**
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/todolist
JWT_SECRET_KEY=your-secret-key-minimum-32-chars
FRONTEND_URL=https://your-frontend.vercel.app
NODE_ENV=production
```

**MongoDB Atlas**
- Database user created
- IP Whitelist: 0.0.0.0/0
- Connection string copied correctly

---

## 🎯 Expected Behavior

✅ **Frontend**: Loads with cosmic theme, shows login/signup pages
✅ **Backend**: API endpoints respond (test at /user/login)
✅ **Auth**: Login successful, redirects to home page
✅ **Todos**: Can create, update, complete, delete todos
✅ **Logout**: Clears session, redirects to login

---

Made with ❤️ - Happy deploying! 🚀
