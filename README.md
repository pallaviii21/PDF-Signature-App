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


![PDF Signer](screenshots/signer.png)

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
## 🔐 Environment Variables

### `client/.env`
```env
VITE_SERVER_URL=https://signify-server-xxxxx.onrender.com














