# PROJECT GO

PROJECT GO is a production-grade full-stack productivity and project management platform built to follow real-world software engineering practices.

The primary goal of this project is not only to build a scalable application but also to learn software architecture, clean code, backend engineering, frontend engineering, testing, documentation, deployment, and DevOps using industry-standard workflows.

---

# Tech Stack

## Frontend

- React
- Vite
- JavaScript
- React Router
- Axios
- React Hot Toast

> TypeScript migration is planned.

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcrypt
- Zod Validation

---

# Project Structure

```
PROJECT-GO/
│
├── frontend/
│
├── backend/
│
├── docs/
│
├── README.md
│
└── package.json
```

---

# Getting Started

## Clone Repository

```bash
git clone <repository-url>
```

---

## Backend

```bash
cd backend

npm install

npm run dev
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# Documentation

## Architecture

- ARCHITECTURE.md

## API

- API.md

## Development

- TIL.md (Today I Learned)

## Deployment

- DEPLOYMENT-LOG.md
- ENVIRONMENTS.md

## Planning

- ROADMAP.md
- CHANGELOG.md
- KNOWN-ISSUES.md

## Architecture Decision Records

- ADR/

---

# Current Progress

### Foundation

- ✅ Monorepo setup
- ✅ GitHub repository initialized
- ✅ Express backend configured
- ✅ MongoDB Atlas connected
- ✅ Health check endpoint implemented
- ✅ User Model
- ✅ User Creation API

### Validation & Security

- ✅ Zod request validation
- ✅ Reusable validation middleware
- ✅ Validation error responses
- ✅ Duplicate username/email handling
- ✅ Password hashing with bcrypt
- ✅ Password verification with bcrypt.compare()
- ✅ JWT access token generation
- ✅ JWT authentication middleware
- ✅ HttpOnly cookie authentication
- ✅ Secure cookie configuration

### Authentication

- ✅ Signup endpoint
- ✅ Login endpoint
- ✅ Logout endpoint
- ✅ Current authenticated user endpoint
- ✅ Protected routes
- ✅ React AuthContext
- ✅ Global authentication state
- ✅ Login flow
- ✅ Signup flow
- ✅ Logout flow
- ✅ Authentication persistence across page refreshes
- ✅ Loading states
- ✅ Authentication error handling
- ✅ Toast notifications
- ✅ Duplicate form submission protection
---

# Current Features

### Backend

- Express backend
- MongoDB Atlas
- Health check endpoint
- User model using Mongoose
- User creation API
- Signup API
- Login API
- Logout API
- Current authenticated user API
- Zod request validation
- Reusable validation middleware
- Structured validation error responses
- Duplicate username/email detection
- bcrypt password hashing
- Secure password storage
- JWT access token generation
- JWT verification
- Authentication middleware
- HttpOnly cookie authentication
- Secure cookie configuration
- Protected routes

### Frontend

- React + Vite frontend
- Axios API client
- Authentication Context
- Global authentication state
- Login form
- Signup form
- Logout functionality
- Protected route handling
- Authentication persistence
- Loading states
- Form submission states
- Toast notifications
- Validation error display
- Authentication error handling
- Duplicate submission protection

---

# API Table

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/v1/health | Health check |
| POST | /api/v1/users | Create a new user |
| POST | /api/v1/auth/signup | Register a new user |
| POST | /api/v1/auth/login | Authenticate a user |
| POST | /api/v1/auth/logout | Log out the current user |
| GET | /api/v1/auth/me | Get the currently authenticated user |

---

# Development Workflow

Every major feature follows the same engineering pipeline:

```
Learn
    ↓
Plan
    ↓
Design
    ↓
Database
    ↓
API
    ↓
Backend
    ↓
Testing
    ↓
Frontend
    ↓
Integration
    ↓
Refactor
    ↓
Documentation
    ↓
Git Commit
    ↓
Review
```

---

# Upcoming Milestones

- User Profile Module
- Project CRUD
- Task Management
- Team Workspaces
- Notifications
- File Uploads
- Real-time Collaboration
- Deployment
- CI/CD Pipeline

---

# License

MIT