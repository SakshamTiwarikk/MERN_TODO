# 🔧 TaskFlow Backend – MERN Todo API

This is the **backend service** for the TaskFlow application, built using **Node.js, Express, MongoDB**, and **JWT authentication**.

It provides secure APIs for user authentication and task management.

---

## 🚀 Features

- User registration & login
- Password hashing using **bcrypt**
- JWT-based authentication
- Protected task routes
- User-specific task isolation
- RESTful API design

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- dotenv
- nodemon

---

## 📁 Folder Structure

backend/
├── config/
│ └── db.js
├── controllers/
├── middleware/
│ └── authMiddleware.js
├── models/
│ ├── User.js
│ └── Task.js
├── routes/
│ ├── authRoutes.js
│ └── taskRoutes.js
├── server.js
└── .env


---

## ⚙️ Setup Instructions

### 1️⃣ Install Dependencies

```bash
cd backend
npm install

2️⃣ Create .env File
Create a .env file in the backend folder:
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/mern_todo_app
JWT_SECRET=your_secure_random_secret

3️⃣ Start Backend Server

npm run dev
