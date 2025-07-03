# 🏥 WiseCare – MERN Appointment Booking App
A comprehensive full-stack appointment booking system built with MongoDB, Express, React, and Node.js. DocuCare enables patients to book appointments, doctors to manage schedules and earnings, and admins to oversee the entire platform.

## DEMO
[🎬 Watch the demo](https://github.com/amrashraf15/MERN-Health-Care-App/blob/main/demo%20(1)%20(1)%20(1).mp4?raw=true)





---


## 📋 Table of Contents

- [Overview](#-overview)  
- [Features](#-features)  
- [Technologies](#-technologies)
- [API Endpoints](#-api-endpoints)
- [Project Structure](#-project-structure)   
- [Contact](#-contact)  
- [Credits](#-credits)

---

## 📖 Overview

WiseCare is a full-stack web application designed for managing doctor appointments. It includes role-based authentication for patients, doctors, and administrators. Patients can book and manage appointments, doctors can review schedules and earnings, and admins can control doctor profiles and appointments.



---

## ✨ Features

- 🚀 **Express.js** backend with MongoDB via Mongoose
- 🎃 Authentication && Authorization with JWT
- 👌 Global state management with Zustand
- 🐞 Error handling both on the server and on the client
- ⚛ Built with modern React and React Router v7
- 🌊 Tailwind CSS for responsive and utility-first UI
- 🌼 DaisyUI used for elegant components and settings page
- 🎨 32 different switchable themes via DaisyUI
- 👩‍⚕️ Patient portal: login, book, and manage appointments
- 🧑‍⚕️ Doctor dashboard: view appointments, edit profile, track earnings
- 🛡 Admin dashboard: manage doctors and appointments
- 🔄 Fully connected RESTful APIs for frontend and backend communication
- 🔒 Secure, scalable, and extendable full-stack architecture



---

## 🛠 Technologies

- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js)
- ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express)
- ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb)
- ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose)
- ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
- ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react)
- ![React Router](https://img.shields.io/badge/React_Router-v7-CA4245?style=for-the-badge&logo=react-router)
- ![Zustand](https://img.shields.io/badge/Zustand-252525?style=for-the-badge&logo=zod)
- ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios)
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
- ![DaisyUI](https://img.shields.io/badge/DaisyUI-F6D860?style=for-the-badge)
- ![Lucide Icons](https://img.shields.io/badge/Lucide--React-000000?style=for-the-badge&logo=lucide)
- ![CORS](https://img.shields.io/badge/CORS-enabled-004d7a?style=for-the-badge)

---

## 📘 API Endpoints

### 🧑‍⚕️ Admin Routes

| Method | Endpoint                 | Protected | Description                              |
|--------|--------------------------|-----------|------------------------------------------|
| POST   | `/api/admin/login`       | ❌        | Login admin                              |
| POST   | `/api/admin/logout`      | ❌        | Logout admin                             |
| GET    | `/api/admin/check-admin` | ✅        | Verify admin session                     |
| POST   | `/api/admin/add-doctor`  | ✅        | Add a new doctor                         |
| GET    | `/api/admin/all-doctors` | ❌        | Get all registered doctors               |
| PUT    | `/api/admin/change-availability` | ✅ | Change doctor availability              |
| GET    | `/api/admin/all-appointments` | ✅   | Fetch all appointments                   |
| DELETE | `/api/admin/delete-appointment` | ✅ | Delete an appointment                    |
| GET    | `/api/admin/dashboard`   | ✅        | Get admin dashboard data                 |

---

### 👨‍⚕️ Doctor Routes

| Method | Endpoint                           | Protected | Description                           |
|--------|------------------------------------|-----------|---------------------------------------|
| POST   | `/api/doctor/login`                | ❌        | Login doctor                          |
| POST   | `/api/doctor/logout`               | ❌        | Logout doctor                         |
| GET    | `/api/doctor/check-auth`           | ✅        | Verify doctor session                 |
| GET    | `/api/doctor/doctor-appointments`  | ✅        | Get doctor's upcoming appointments    |
| PUT    | `/api/doctor/complete-appointment` | ✅        | Mark an appointment as completed      |
| GET    | `/api/doctor/doctor-info`          | ✅        | Get doctor profile data               |
| PUT    | `/api/doctor/update-doctor-info`   | ✅        | Update doctor profile info            |
| GET    | `/api/doctor/doctordashboard`      | ✅        | Get doctor dashboard stats            |

---

### 👤 Patient (Auth) Routes

| Method | Endpoint                          | Protected | Description                           |
|--------|-----------------------------------|-----------|---------------------------------------|
| POST   | `/api/auth/signup`                | ❌        | Register a new patient                |
| POST   | `/api/auth/login`                 | ❌        | Login patient                         |
| POST   | `/api/auth/logout`                | ❌        | Logout patient                        |
| GET    | `/api/auth/check-auth`            | ✅        | Verify patient session                |
| GET    | `/api/auth/get-profile`           | ✅        | Fetch patient profile                 |
| PUT    | `/api/auth/update-profile`        | ✅        | Update patient profile                |
| GET    | `/api/auth/appointments`          | ✅        | Get patient’s appointments            |
| POST   | `/api/auth/book-appointment`      | ✅        | Book a new appointment                |
| PUT    | `/api/auth/cancel-appointment`    | ✅        | Cancel an existing appointment        |
| GET    | `/api/auth/all-doctors`           | ❌        | Fetch list of available doctors       |

---

> 🔐 **Protected** routes require valid JWT tokens for authentication (Admin, Doctor, or Patient based).

---

## 🧭 Project Structure

```C++
├── admin/
│   ├── dist/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── constants/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── README.md
│   ├── tailwind.config.js
│   └── vite.config.js

├── backend/
│   ├── node_modules/
│   ├── src/
│   │   ├── controllers/
│   │   ├── lib/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   ├── uploads/
│   ├── .env
│   ├── package.json
│   └── package-lock.json

├── client/
│   ├── dist/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── constants/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   └── .gitignore

```

---
 ## 📬 Contact

- **Name**: Amr Ashraf  
- **Email**: [amrashraf1592@gmail.com](mailto:amrashraf1592@gmail.com)  
- **GitHub**: [amrashraf15](https://github.com/amrashraf15)  
- **Project Link**: [MERN-Health-Care-App]([https://github.com/amrashraf15/MERN-AUTH](https://github.com/amrashraf15/MERN-Health-Care-App))

---

## 🙏 Credits

This project was inspired by the work of amazing developers and content creators who share valuable resources for free.

🎨 **UI/UX Design & Assets**: The design and assets used in this project are based on the Figma file shared by **GreatStack** on YouTube.

🔗 **Figma Link**: [Doctor Appointment UI – GreatStack]
(https://www.figma.com/design/ZLkjwG5ehxNRrC4SUA2WG7/Prescripto---UI-Design?node-id=0-1&p=f&t=mhNrDkAVBZclDBET-0)

📺 **YouTube Channel**: [GreatStack](https://www.youtube.com/@GreatStack)

A big thanks to GreatStack for providing beautiful design assets and inspiration that shaped this project’s frontend experience.

---


