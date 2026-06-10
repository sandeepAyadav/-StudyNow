# 📚 StudyNow - Advanced AI-Powered LMS Platform

StudyNow is a premium, production-grade Learning Management System (LMS) built using the MERN stack. The platform features secure role-based authentication, multimedia course management, real-time peer-to-peer technical discussion workspaces via WebSockets, and an intelligent GenAI Copilot Course Mentor integrated using the Google Gemini API.

---

## 🚀 Key Features

* **🛡️ Robust Authentication:** Role-based access control (Student/Teacher) secured via JWT tokens, HttpOnly cookies, and password hashing using Bcrypt. Includes full OTP-based Email verification for Forgot/Reset password flows.
* **💳 Secure Payment Gateway:** Seamless course enrollment with a complete checkout simulation powered by Razorpay API integration.
* **⚡ Real-Time Discussion Engine:** Peer-to-peer chat workspaces built with Socket.io on top of a native Node.js HTTP server layer to clear technical doubts instantly without page refreshes.
* **🤖 GenAI Copilot Mentor:** A floating smart assistant powered by the Google Gemini API (`gemini-1.5-flash`) that provides context-aware programming guidance and markdown-formatted code snippets.
* **🔢 Server-Side Pagination & Debouncing:** High-performance course catalog search optimized with a 400ms delay debounce mechanism on the frontend and Mongoose Regex queries with limit counters on the backend.
* **☁️ Multimedia Pipeline:** Secure cloud hosting for dynamic course thumbnails and video tracks using Multer and Cloudinary SDK handlers.

---

## 🛠️ Tech Stack

* **Frontend:** React.js, Redux Toolkit, Tailwind CSS, Vite, Axios, Socket.io-client
* **Backend:** Node.js, Express.js, Socket.io, Mongoose ORM, @google/generative-ai
* **Database:** MongoDB Atlas
* **Third-Party Services:** Cloudinary, Razorpay, Google AI Studio (Gemini Pro)

---

## 📂 Project Architecture

```text
StudyNow/
├── backend/
│   ├── config/             # Database connection profiles
│   ├── controllers/        # Core business logic (auth, course, review, AI)
│   ├── middleware/         # Token authorization guards
│   ├── model/              # MongoDB Schemas (User, Course, Message, Review)
│   ├── routes/             # Express endpoint paths maps
│   ├── sockets/            # Socket.io connection handshakes
│   └── index.js            # HTTP Server wrapper entry point
└── frontend/
    ├── src/
    │   ├── components/     # UI reusable components (Navbar, CourseChat, AiMentor)
    │   ├── pages/          # Core layout views (Home, Login, SingleCourse)
    │   ├── slice/          # Redux Toolkit global state managers
    │   └── App.jsx         # React Router switches