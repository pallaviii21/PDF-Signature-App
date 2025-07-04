# ✍️ SIGNify - Document Signature App

SIGNify is a secure and elegant PDF document signing app built using the **MERN stack (MongoDB, Express, React, Node.js)**. Users can register, upload documents, drag-and-drop signatures, preview signed PDFs, and download them.

---

## 🔗 Live URLs

- **Frontend (Vercel)**: [https://pdf-signature-app-pi.vercel.app/](https://pdf-signature-app-pi.vercel.app)
- **Backend (Render)**: [https://signify-server-1clw.onrender.com](https://signify-server-xxxx.onrender.com)

---

## ⚙️ Tech Stack

| Layer       | Technology                        |
|-------------|------------------------------------|
| Frontend    | React, Tailwind CSS, Vite         |
| Backend     | Node.js, Express                  |
| Database    | MongoDB (Mongoose ORM)            |
| PDF Tools   | pdf-lib, pdfjs-dist               |
| Auth        | JWT, bcrypt, Nodemailer           |
| Deployment  | Vercel (Frontend), Render (Backend) |

---

## ✨ Features

✅ Register & Login  
✅ Email verification  
✅ Forgot & reset password via email  
✅ Upload PDF documents  
✅ Type signatures with custom fonts & colors  
✅ Drag-and-drop signature onto PDF  
✅ Preview and download signed PDF  
✅ View and delete uploaded documents  
✅ Mobile-friendly responsive design  
✅ Protected routes using JWT

---

## 🖼️ Screenshots
![image](https://github.com/user-attachments/assets/b92ba13d-bbf4-4b71-b603-9382b62feb13)
![image](https://github.com/user-attachments/assets/9189a8a7-5b60-410a-9c89-579234074516)
![image](https://github.com/user-attachments/assets/beb05ec7-21f6-49aa-a124-7d098237c1ea)
![image](https://github.com/user-attachments/assets/13034a8c-f79d-4ede-899a-00cddd12e142)

---

## 📁 Folder Structure
├── client

│ ├── public

│ ├── src

│ │ ├── components

│ │ ├── pages

│ │ ├── App.jsx

│ │ ├── main.jsx

│ │ └── ...

├── server
│ ├── controllers
│ ├── models
│ ├── routes
│ ├── uploads
│ └── index.js

---
🚀 Getting Started Locally
🔧 Prerequisites
Node.js & npm

MongoDB

(Optional) Vite globally installed

1. Clone the Repository
bash
  git clone https://github.com/yourusername/signify-pdf-signer.git
  cd signify-pdf-signer
2. Setup Backend
bash
  cd server
  npm install
  touch .env  # Add environment variables here
  npm run dev  # Runs on http://localhost:5000
3. Setup Frontend
bash
  Copy code
  cd client
  npm install
  touch .env  # Add VITE_SERVER_URL
  npm run dev  # Runs on http://localhost:5173


### 🧪 Testing Checklist
✅ Register a new account (check email for verification)

✅ Upload a PDF

✅ Type and drag your signature

✅ Preview and download the signed PDF

✅ Delete any uploaded document

### 📦 Deployment Guide
## 🔹 Frontend (Vercel)
  Push /client folder to GitHub

  Connect to Vercel and import project

  Set VITE_SERVER_URL in Vercel Environment Variables

## 🔹 Backend (Render)
  Push /server folder to GitHub

  Create a new Web Service on Render

  Add Environment Variables (PORT, MONGO_URI, JWT_SECRET, etc.)

  Manually create an uploads folder in the root directory

---
## 📧 Contact
Reach out at: pallaviiik11.11@gmail.com

---
## 🔐 Environment Variables

### `client/.env`
```env
VITE_SERVER_URL=https://signify-server-xxxxx.onrender.com
server/.env
env
Copy code
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
VITE_CLIENT_URL=https://pdf-signature-app-pi.vercel.app
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password_or_app_key



















