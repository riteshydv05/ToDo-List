# 🎯 Quick Deployment Steps

## 📋 Prerequisites Checklist
- [ ] Push all code to GitHub
- [ ] Create MongoDB Atlas account and cluster
- [ ] Create Vercel account

---

## 🚀 Step-by-Step Deployment

### **1. Deploy Backend First** ⚙️

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**

2. **Click "Add New" → "Project"**

3. **Import your GitHub repo**: `riteshydv05/ToDo-List`

4. **Configure Backend:**
   - **Root Directory**: `backend`
   - **Framework Preset**: Other
   - **Build Command**: (leave empty)
   - **Install Command**: `npm install`

5. **Add Environment Variables:**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todolist
   JWT_SECRET_KEY=your-secret-key-min-32-chars
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ```
   
6. **Deploy** and copy the backend URL (e.g., `https://your-backend.vercel.app`)

---

### **2. Deploy Frontend** 🎨

1. **Click "Add New" → "Project"** (in Vercel)

2. **Import same repo**: `riteshydv05/ToDo-List`

3. **Configure Frontend:**
   - **Root Directory**: `frontend`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Add Environment Variable:**
   ```
   VITE_API_URL=https://your-backend.vercel.app
   ```
   (Use the backend URL from Step 1)

5. **Deploy**

6. **Go back to Backend project** and update `FRONTEND_URL` environment variable with your actual frontend URL

---

### **3. MongoDB Atlas Setup** 🗄️

1. **Create cluster** at [MongoDB Atlas](https://cloud.mongodb.com)

2. **Database Access**: Create user with password

3. **Network Access**: Add IP `0.0.0.0/0` (allow all)

4. **Get connection string**: 
   ```
   mongodb+srv://<username>:<password>@cluster.mongodb.net/todolist
   ```

5. **Update backend env variable** `MONGODB_URI` on Vercel

---

## ✅ Final Checklist

- [ ] Backend deployed and running
- [ ] Frontend deployed and running  
- [ ] MongoDB connected
- [ ] CORS configured with frontend URL
- [ ] Environment variables set correctly
- [ ] Test login/signup functionality
- [ ] Test creating/updating/deleting todos
- [ ] Check browser console for errors

---

## 🔗 Your Live URLs

- **Frontend**: https://your-app.vercel.app
- **Backend**: https://your-backend.vercel.app

---

## 🐛 Troubleshooting

**CORS Error?**
→ Make sure `FRONTEND_URL` in backend matches your frontend Vercel URL

**Can't login?**
→ Check browser DevTools → Application → Cookies

**MongoDB Error?**
→ Verify connection string and IP whitelist (0.0.0.0/0)

**Build Failed?**
→ Check Vercel build logs for missing dependencies

---

## 📚 Need Help?

See full guide: [DEPLOYMENT.md](./DEPLOYMENT.md)
