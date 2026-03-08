# 🗳️ Online Voting System

An **Online Voting Management System** built using **Node.js, Express.js, MongoDB Atlas, and EJS**.
This project allows voters to securely cast their votes and enables admins to manage candidates and monitor election results.

---

## 🚀 Features

* 👤 **Voter Login with OTP Verification**
* 🗳️ **Secure Voting System**
* 📊 **Live Election Results**
* 👨‍💼 **Admin Panel**
* ➕ Add / Delete Candidates
* 🔐 One Voter = One Vote rule
* 📱 Responsive UI
* ☁️ Cloud Database using **MongoDB Atlas**

---

## 🛠️ Technologies Used

* **Frontend**

  * HTML
  * CSS
  * EJS Templates

* **Backend**

  * Node.js
  * Express.js

* **Database**

  * MongoDB Atlas
  * Mongoose

* **Hosting**

  * Vercel

---

## 📂 Project Structure

```
project-folder
│
├── models
│   ├── Candidate.js
│   └── Voter.js
│
├── routes
│   ├── auth.js
│   ├── admin.js
│   └── voter.js
│
├── views
│
├── public
│
├── app.js
├── db.js
├── .env
└── package.json
```

---

## ⚙️ Installation

Clone the repository

```
git clone https://github.com/your-username/voting-system.git
```

Go to project directory

```
cd voting-system
```

Install dependencies

```
npm install
```

Create `.env` file

```
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key
PORT=3000
```

Run the server

```
node app.js
```

Open in browser

```
http://localhost:3000
```

---

## 🌐 Live Demo

```
https://your-project.vercel.app
```

---

## 📌 Future Improvements

* SMS OTP Integration
* Better Security & Authentication
* Election Analytics Dashboard
* Mobile App Integration

---

## 👨‍💻 Author

**Sintu Kumar**

* Web Developer
* Skills: HTML, CSS, JavaScript, Node.js, MongoDB

---

## 📜 License

This project is created for **educational and learning purposes**.


