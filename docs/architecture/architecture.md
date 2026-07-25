# Architecture

## Overview

PROJECT GO follows a client-server architecture.

- **Frontend:** React (Vite)
- **Backend:** Node.js + Express
- **Database:** MongoDB Atlas
- **ODM:** Mongoose

---

## Repository Structure

PROJECT-GO/

- frontend/
- backend/
- docs/

## Current Architecture

```text
Client
   │
   ▼
React Frontend
   │
   │ HTTP Request
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
Services (Coming Soon)
   │
   ▼
Mongoose
   │
   ▼
MongoDB Atlas
```

---

## Backend Folder Structure

```text
backend/
└── src/
    ├── config/
    │   └── database.js
    ├── routes/
    │   └── health.routes.js
    ├── app.js
    └── server.js
```

---

## Startup Sequence

```text
Load Environment Variables
        │
        ▼
Connect MongoDB
        │
        ▼
Create Express Server
        │
        ▼
Accept Requests
```

The server only starts after a successful database connection.

---


## User Creation Flow

Client
↓
POST /api/v1/users
↓
user.routes.js
↓
createUser Controller
↓
User Model (Mongoose)
↓
MongoDB Atlas
↓
JSON Response


## Request Lifecycle

Client
    │
    ▼
Express Route
    │
    ▼
Validation Middleware (Zod)
    │
    ▼
Controller
    │
    ▼
Mongoose Model
    │
    ▼
MongoDB


### Password Hashing

After successful request validation, the controller hashes the user's password using bcrypt before creating the database document.

Request Flow

Client
    │
    ▼
Validation Middleware
    │
    ▼
Controller
    ├── Hash Password (bcrypt)
    ├── Create User
    ▼
MongoDB




## Authentication Module

Authentication is implemented as a dedicated module.

Responsibilities:

- User registration (Signup)
- User authentication (Login)
- Password hashing (bcrypt)
- Password verification (bcrypt.compare)
- JWT generation (Planned)

### Authentication Request Flow

Client
    │
    ▼
Route
    │
    ▼
Validation Middleware (Zod)
    │
    ▼
Auth Controller
    │
    ├── Signup
    │      ├── Hash Password
    │      └── Create User
    │
    └── Login
           ├── Find User
           ├── Compare Password
           └── (Future) Generate JWT



## Authentication Flow

## Authentication Flow

Client
    │
    ▼
Login Request
    │
    ▼
Validation Middleware
    │
    ▼
Authentication Controller
    │
    ▼
bcrypt Password Verification
    │
    ▼
JWT Generation
    │
    ▼
HttpOnly Cookie


## Protected Request Flow

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
req.user
    │
    ▼
Protected Controller
    │
    ▼
Database



## Future Architecture


- Authorization
- Input Validation
- Error Handling Middleware
- Logging
- File Uploads
- Real-time Features (if required)