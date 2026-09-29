# 🔐 Auth App — Register / Login / Protected Home

Full-stack JWT authentication: **Node.js + Express + MongoDB** backend, **React (Vite) + React Router** frontend.

---

## Folder structure

```
auth-app/
├── backend/
│   ├── config/db.js               # MongoDB connection
│   ├── controllers/authController.js
│   ├── middleware/authMiddleware.js
│   ├── models/User.js
│   ├── routes/authRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
└── frontend/
    ├── public/index.html
    ├── index.html                 # Vite entry (root)
    ├── src/
    │   ├── components/ProtectedRoute.jsx
    │   ├── pages/{Register,Login,Home}.jsx
    │   ├── services/api.js
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── .env
    ├── vite.config.js
    └── package.json
```

---

## 1. Prerequisites

- Node.js 18+ (`node -v`)
- MongoDB — either local or free Atlas cloud

---

## 2. Set up MongoDB

**Option A — Local MongoDB**

1. Install MongoDB Community Server: https://www.mongodb.com/try/download/community
2. Start it:
   - macOS: `brew services start mongodb-community`
   - Ubuntu: `sudo systemctl start mongod`
   - Windows: it runs as the "MongoDB" service automatically
3. Your URI is: `mongodb://127.0.0.1:27017/authapp` (the DB is created automatically)

**Option B — MongoDB Atlas (cloud, free)**

1. Create an account at https://cloud.mongodb.com → build a free **M0** cluster.
2. **Database Access** → Add user (username + password).
3. **Network Access** → Add IP → `0.0.0.0/0` (allow from anywhere, for dev).
4. **Connect → Drivers** → copy the URI and put it in `backend/.env`:
   ```
   MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/authapp
   ```

---

## 3. Run the backend

```bash
cd auth-app/backend
npm install
npm run dev        # or: npm start
```

`backend/.env`:
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/authapp
JWT_SECRET=change_this_to_a_long_random_secret
```
> ⚠️ Change `JWT_SECRET` to a long random string before deploying.

You should see `✅ MongoDB connected` and `🚀 Server running on port 5000`.

---

## 4. Run the frontend

Open a **second terminal**:

```bash
cd auth-app/frontend
npm install
npm run dev
```

Open http://localhost:5173

`frontend/.env`:
```
VITE_API_URL=http://localhost:5000/api
```

---

## 5. API reference

| Method | Endpoint             | Auth | Body                        |
|--------|----------------------|------|-----------------------------|
| POST   | `/api/auth/register` | No   | `{ name, email, password }` |
| POST   | `/api/auth/login`    | No   | `{ email, password }`       |
| GET    | `/api/auth/me`       | Yes  | —  (`Authorization: Bearer <token>`) |

Quick test:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"secret123"}'
```

---

## 6. How auth works

1. **Register/Login** → backend validates, hashes the password with `bcrypt` (10 salt rounds), and returns a **JWT** valid for 1 day.
2. The token is stored in **LocalStorage** (`services/api.js`) and attached to every request via an axios interceptor.
3. `/home` is wrapped in `<ProtectedRoute>` — no token means an instant redirect to `/login`.
4. `Home.jsx` also calls `GET /api/auth/me`; if the token is expired or tampered with, the server rejects it and the user is logged out.
5. **Logout** clears LocalStorage and redirects to `/login`.

## 7. Validations

| Field    | Rule                        | Checked on |
|----------|-----------------------------|------------|
| Name     | Required                    | Client + Server |
| Email    | Required, valid format, unique | Client + Server |
| Password | Required, min 6 characters  | Client + Server |

Login errors return a generic *"Invalid email or password"* so attackers can't discover which emails exist.
