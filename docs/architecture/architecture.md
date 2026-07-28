# Architecture

## Overview

PROJECT GO follows a layered client-server architecture.

### Tech Stack

**Frontend**
- React
- Vite
- React Router
- Axios

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB Atlas

**ODM**
- Mongoose

---

# Repository Structure

```text
PROJECT-GO/
├── frontend/
├── backend/
└── docs/
```

---

# High-Level Architecture

```text
React Frontend
        │
        ▼
Authentication Service
        │
        ▼
Axios Client
        │
        ▼
Express Server
        │
        ▼
Middleware
        │
        ▼
Routes
        │
        ▼
Controllers
        │
        ▼
Mongoose
        │
        ▼
MongoDB Atlas
```

---

# Backend Architecture

```text
backend/
└── src/
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── utils/
    ├── app.js
    └── server.js
```

## Startup Sequence

```text
Load Environment Variables
        │
        ▼
Connect MongoDB
        │
        ▼
Create Express Application
        │
        ▼
Register Middleware
        │
        ▼
Register Routes
        │
        ▼
Start Server
```

The server starts only after a successful database connection.

---

# Request Lifecycle

```text
Client
    │
    ▼
Express Route
    │
    ▼
Validation Middleware (Zod)
    │
    ▼
Authentication Middleware (Protected Routes)
    │
    ▼
Controller
    │
    ▼
Mongoose Model
    │
    ▼
MongoDB Atlas
```

---

# Authentication Architecture

Authentication is implemented as an independent module.

Responsibilities:

- User Signup
- User Login
- Password Hashing
- Password Verification
- JWT Generation
- JWT Verification
- Cookie Authentication

---

## Signup Flow

```text
Client
    │
    ▼
POST /api/v1/auth/signup
    │
    ▼
Validation Middleware
    │
    ▼
Hash Password (bcrypt)
    │
    ▼
Create User
    │
    ▼
MongoDB Atlas
    │
    ▼
JSON Response
```

---

## Login Flow

```text
Client
    │
    ▼
POST /api/v1/auth/login
    │
    ▼
Validation Middleware
    │
    ▼
Find User
    │
    ▼
Compare Password (bcrypt)
    │
    ▼
Generate JWT
    │
    ▼
Set HttpOnly Cookie
    │
    ▼
JSON Response
```

---

## Protected Request Flow

```text
Client
    │
    ▼
HttpOnly Cookie
    │
    ▼
Authentication Middleware
    │
    ▼
JWT Verification
    │
    ▼
Attach User → req.user
    │
    ▼
Protected Controller
    │
    ▼
Database
    │
    ▼
JSON Response
```

---

# Frontend Architecture

```text
frontend/
└── src/
    ├── components/
    │   └── LoginForm.jsx
    ├── pages/
    │   ├── Home.jsx
    │   ├── Login.jsx
    │   ├── Signup.jsx
    │   └── Dashboard.jsx
    ├── services/
    │   └── auth.service.js
    ├── lib/
    │   └── axios.js
    └── App.jsx

```

## Pages

Route-level components.

Examples:

- Home
- Login
- Signup
- Dashboard

---

## Components

Reusable UI components.

Current:

- LoginForm

Future:

- SignupForm
- Navbar
- Footer
- Buttons
- Input Components

---

## Services

Responsible for backend communication.

Components never call Axios directly.

Current:

- auth.service.js

Future:

- user.service.js
- project.service.js
- task.service.js

---

## Lib

Shared utilities.

Current:

- axios.js

Responsibilities:

- Base API URL
- Default headers
- Cookie credentials (`withCredentials`)

---

# Frontend Login Flow

```text
LoginForm
        │
        ▼
auth.service.js
        │
        ▼
Axios Instance
        │
        ▼
POST /api/v1/auth/login
        │
        ▼
Backend
        │
        ▼
JWT Cookie
        │
        ▼
Navigate → Dashboard
```

---


# Frontend Authentication Flow

```text
Login Form
      │
      ▼
Auth Service
      │
      ▼
Shared Axios Client
      │
      ▼
Backend API
      │
      ▼
HttpOnly Cookie
      │
      ▼
Dashboard
      │
      ▼
GET /api/v1/auth/me
      │
      ▼
Authenticated User

```

---

# Design Principles

PROJECT GO currently follows:

- Separation of Concerns
- Layered Architecture
- MVC Pattern
- Reusable Components
- Service Layer
- Shared Axios Client
- Stateless Authentication (JWT)
- HttpOnly Cookie Authentication
- Single Responsibility Principle

---

# Future Architecture

Planned additions:

- Authorization (Roles & Permissions)
- Refresh Tokens
- Global Authentication Context
- Route Protection
- Centralized Error Handling
- File Uploads
- Project & Task Modules
- Real-time Features (if required)