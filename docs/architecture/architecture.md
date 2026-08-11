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

# Frontend Authentication Flow

```text
Application Starts
        │
        ▼
AuthProvider
        │
        ▼
GET /api/v1/auth/me
        │
        ▼
Auth Service
        │
        ▼
Shared Axios Client
        │
        ▼
Axios Response Interceptor
        │
        ▼
Backend API
        │
        ▼
Authenticated User
        │
        ▼
AuthContext
        │
        ▼
useAuth()
        │
        ▼
ProtectedRoute
        │
        ▼
Protected Pages (Dashboard)
```

---

## Authentication Architecture

Authentication state is managed globally using React Context.

Responsibilities:

- Initialize the authenticated user on application startup.
- Store the authenticated user in a centralized context.
- Expose authentication state through the `useAuth` custom hook.
- Prevent duplicate authentication requests across pages.
- Provide authentication state to protected routes and components.

---

## Axios Response Interceptor

All API requests pass through a centralized Axios response interceptor.

Responsibilities:

- Pass successful responses back to the calling service.
- Detect `401 Unauthorized` responses.
- Redirect unauthenticated users to the login page.
- Propagate errors using `Promise.reject()`.

### Session Expiration Flow

```text
Protected Page
      │
      ▼
API Request
      │
      ▼
401 Unauthorized
      │
      ▼
Axios Response Interceptor
      │
      ▼
Redirect to /login
```

---

## Protected Route Flow

```text
User Visits Protected Route
          │
          ▼
ProtectedRoute
          │
          ▼
isLoading?
     │
 ┌───┴────┐
 │        │
Yes       No
 │         │
 ▼         ▼
Loading  isAuthenticated?
              │
         ┌────┴────┐
         │         │
        Yes       No
         │         │
         ▼         ▼
 Render Page   Redirect to /login
```


---

## Authentication State Flow

Authentication state is managed globally using React Context.

Login sequence:

LoginForm
    ↓
AuthContext.login()
    ↓
loginService()
    ↓
POST /auth/login
    ↓
JWT Cookie Created
    ↓
fetchUser()
    ↓
GET /auth/me
    ↓
setUser()
    ↓
React re-renders

---


## Logout flow


Dashboard
    ↓
AuthContext.logout()
    ↓
POST /auth/logout
    ↓
Cookie Cleared
    ↓
setUser(null)
    ↓
ProtectedRoute
    ↓
Redirect to Login

---


# Signup Architecture

Signup follows the same layered architecture as the login flow.

```text
SignupForm
    │
    ▼
AuthContext.signup()
    │
    ▼
signupService()
    │
    ▼
POST /api/v1/auth/signup
    │
    ▼
Validation Middleware
    │
    ▼
Signup Controller
    │
    ▼
bcrypt Password Hashing
    │
    ▼
MongoDB
    │
    ▼
JSON Response

```


## Signup Validation Error Flow

SignupForm
    │
    ▼
AuthContext.signup()
    │
    ▼
signupService()
    │
    ▼
Backend
    │
    ▼
Zod Validation
    │
    ├── Valid ───────────────► Signup Controller
    │
    └── Invalid
            │
            ▼
        400 Response
            │
            ▼
        SignupForm
            │
            ▼
    Extract validation issues
            │
            ▼
    Display individual messages


---

# Design Principles

PROJECT GO currently follows:

- Separation of Concerns
- Layered Architecture
- MVC Pattern
- React Context for Global State
- Custom Hooks
- Protected Routing
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
- Refresh Token Support
- Automatic Token Refresh
- Global Error Handling
- File Uploads
- Project & Task Modules
- Real-time Features (if required)