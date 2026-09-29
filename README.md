# 🔐 AuthFlow

A full-stack JWT authentication app built with React, Vite, Node.js, Express, MongoDB, and JWT.

Features include:
- User registration
- User login
- JWT-based authentication
- Protected routes
- Profile fetch on authenticated access
- Logout flow
- Frontend deployed on Vercel
- Backend deployed on Render

---

## 🌐 Live URLs

### Frontend
https://authflow-xi.vercel.app

### Backend API
https://authflow-eqbq.onrender.com/api

### Login page
https://authflow-xi.vercel.app/login

---

## 📁 Project Structure

```text
auth-app/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── authController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── authRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   ├── vercel.json
│   ├── vite.config.js
│   └── index.html
├── .gitignore
├── README.md
└── package-lock.json
```

---

## ⚙️ Local Setup

### 1) Install backend dependencies

```bash
cd backend
npm install
```

### 2) Install frontend dependencies

```bash
cd frontend
npm install
```

### 3) Configure environment variables

Create a backend `.env` file with:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Create a frontend `.env` file with:

```env
VITE_API_URL=http://localhost:5000/api
```

You may also use the included example file:

```bash
cp frontend/.env.example frontend/.env
```

---

## ▶️ Run the App Locally

### Start backend

```bash
cd backend
npm run dev
```

### Start frontend

```bash
cd frontend
npm run dev
```

The frontend will usually run on:
- http://localhost:5173

The backend API will run on:
- http://localhost:5000

---

## 🔐 Deployment Notes

- Frontend is configured for Vercel routing via `frontend/vercel.json`.
- Backend CORS is configured to allow local and deployed frontend origins.
- The default frontend API URL is set to the production Render backend URL.

---

## 🧪 Production Build

```bash
cd frontend
npm run build
```

---

## 📝 Git

This project is versioned with Git and pushed to GitHub.

Repository:
https://github.com/sk8790601-maker/authflow