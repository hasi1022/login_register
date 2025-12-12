<p align="center">

<img src="https://img.shields.io/badge/Angular-19-red?logo=angular&logoColor=white" />
<img src="https://img.shields.io/badge/Node.js-20-green?logo=node.js&logoColor=white" />
<img src="https://img.shields.io/badge/Express.js-4.18-lightgrey?logo=express" />
<img src="https://img.shields.io/badge/PostgreSQL-16-blue?logo=postgresql" />
<img src="https://img.shields.io/badge/Sequelize-ORM-orange?logo=sequelize" />
<img src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Authentication-JWT-yellow?logo=jsonwebtokens" />
<img src="https://img.shields.io/badge/PDF-jsPDF-purple?logo=javascript" />
<br/>
<img src="https://img.shields.io/badge/Status-Production%20Ready-brightgreen" />
<img src="https://img.shields.io/badge/License-MIT-black" />

</p>
## 📌 MEAN Stack Invoice Management System

A production-ready **Invoice Management System** built with:

- **Angular 19** (Frontend)
- **Node.js + Express.js** (Backend API)
- **PostgreSQL + Sequelize ORM** (Database)
- **JWT Authentication** for secure access

### 💡 Key Features
- ✔ User Registration & Login  
- ✔ JWT protected routes  
- ✔ Create / Update / Delete Invoices  
- ✔ Add multiple items per invoice  
- ✔ Automatic GST calculation  
- ✔ Grand Total calculation  
- ✔ PDF Export using jsPDF + autoTable  
- ✔ Server-side Pagination  
- ✔ Server-side Sorting (ASC/DESC by Grand Total)  
- ✔ Debounced Server-side Search (RxJS)  
- ✔ Fully Responsive Angular UI  

### 🧠 Backend Features
- Express API with clean controllers  
- Sequelize models with one-to-many associations  
- Catch-all error handlers  
- Soft & hard delete options  
- Optional Redis caching support  

### 🎨 Frontend Features
- Reusable services  
- Angular routing + lazy loading  
- Dashboard with pagination and search  
- Debounce + switchMap for search optimization  
- Print-ready PDF invoices  

### 🗂 Project Structure
- `/frontend` → Angular application  
- `/backend` → Node/Express API + Sequelize models  

### 🚀 Getting Started

#### Backend
```bash
cd backend
npm install
npm start
#### Backend
cd frontend
npm install
ng serve -o
