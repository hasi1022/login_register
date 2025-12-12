<p align="center">
  <img width="3168" height="1344" alt="" src="https://github.com/user-attachments/assets/60b64608-01d7-4ef9-81b4-5885a43aac82" />
f?text=Invoice+Management+System+Banner" alt="Invoice Management System Banner" width="100%" />
</p>


<h1 align="center">📌 Invoice Management System (PERN Stack)</h1>

<p align="center">
  <strong>A robust, production-ready solution for streamlining billing processes across modern web architectures.</strong>
</p>

<p align="center">
<img src="https://img.shields.io/badge/Angular-19-red?logo=angular&logoColor=white" />
<img src="https://img.shields.io/badge/Node.js-20-green?logo=node.js&logoColor=white" />
<img src="https://img.shields.io/badge/Express.js-4.18-lightgrey?logo=express" />
<img src="https://img.shields.io/badge/PostgreSQL-16-blue?logo=postgresql" />
<img src="https://img.shields.io/badge/Sequelize-ORM-orange?logo=sequelize" />
<img src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&logoColor=white" />
<br/>
<img src="https://img.shields.io/badge/Authentication-JWT-yellow?logo=jsonwebtokens" />
<img src="https://img.shields.io/badge/PDF-jsPDF-purple?logo=javascript" />
<img src="https://img.shields.io/badge/Status-Production%20Ready-brightgreen" />
<img src="https://img.shields.io/badge/License-MIT-black" />
</p>

<hr />

## 📖 Overview

This project is a full-stack **Invoice Management System** designed for scalability and performance. It leverages the power of Angular 19 for a reactive frontend and a robust Node.js/Express backend coupled with a relational PostgreSQL database. It handles the complete lifecycle of invoicing, from secure user authentication to generating professional PDFs.

### 🏗 Tech Stack Definition

Although often referred to as a "MEAN" variation, this project utilizes a relational database, making it a **PERN** (Postgres, Express, Angular, Node) stack application:

* **Frontend:** Angular 19 (with TypeScript)
* **Backend API:** Node.js + Express.js
* **Database:** PostgreSQL + Sequelize ORM
* **Security:** JSON Web Tokens (JWT)

---

## 📸 Screenshots

| Dashboard View | Invoice Creation |
| :---: | :---: |
| <img src="https://via.placeholder.com/600x400/e0e0e0/333333?text=Dashboard+Screenshot" alt="Dashboard" width="100%"> | <img src="https://via.placeholder.com/600x400/e0e0e0/333333?text=Create+Invoice+Form" alt="Invoice Form" width="100%"> |

| PDF Output Example | Mobile Responsive View |
| :---: | :---: |
| <img src="https://via.placeholder.com/600x400/e0e0e0/333333?text=PDF+Preview" alt="PDF Output" width="100%"> | <img src="https://via.placeholder.com/600x400/e0e0e0/333333?text=Mobile+View" alt="Mobile" width="100%"> |

---

## 💡 Key Features

### 🔐 Core & Security
* 👤 **Secure Authentication:** User Registration & Login using Bcrypt and JWT protected routes.
* 🛡️ **Robust Backend:** Express API with clean controllers and catch-all error handlers.
* 🗄️ **Relational Data:** Sequelize models with proper one-to-many associations (Users -> Invoices -> Items).

### 🧾 Invoice Management
* ✏️ **CRUD Operations:** Full Create, Read, Update, and Delete capabilities for invoices.
* 📦 **Dynamic Line Items:** Add multiple disparate items per single invoice.
* 🧮 **Auto-Calculations:** Automatic real-time computation of GST and Grand Totals.
* 📄 **PDF Generation:** One-click export of professional invoices using `jsPDF` + `autoTable`.

### 🚀 User Experience & Performance
* 📱 **Fully Responsive:** Angular UI adapted for desktop, tablet, and mobile.
* ⚡ **Optimized Search:** Server-side searching using RxJS Debounce for reduced API load.
* 📊 **Server-Side Pagination:** Efficient handling of large datasets.
* 🔽 **Smart Sorting:** Server-side sorting (ASC/DESC by Grand Total).

---

## 🗂 Project Structure

```bash
├── /backend           # Node/Express API
│   ├── /config        # DB connections & Env setup
│   ├── /controllers   # Route logic
│   ├── /middleware    # Auth checks (JWT)
│   ├── /models        # Sequelize Definitions
│   └── /routes        # API Endpoints
│
└── /frontend          # Angular 19 Application
    ├── /src/app/auth  # Login/Register components
    ├── /src/app/core  # Guards, Interceptors, Services
    └── /src/app/features/invoices # Dashboard & CRUD components
