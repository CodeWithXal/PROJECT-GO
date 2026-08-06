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

## Foundation

- ✅ Monorepo setup
- ✅ GitHub repository initialized
- ✅ Express backend configured
- ✅ MongoDB Atlas connected
- ✅ Health Check endpoint

## User Management

- ✅ User Model
- ✅ User Registration API
- ✅ Duplicate username/email detection

## Validation

- ✅ Zod Schemas
- ✅ Validation Middleware
- ✅ Request sanitization

## Authentication

- ✅ Password hashing (bcrypt)
- ✅ Password verification
- ✅ JWT Access Token generation
- ✅ HttpOnly Cookie Authentication
- ✅ Secure Cookie Configuration
- ✅ Login endpoint
- ✅ Logout endpoint
- ✅ Authentication middleware
- ✅ Protected Routes
- ✅ Current authenticated user endpoint

## Frontend Authentication

- ✅ Axios API client
- ✅ Global Axios Response Interceptor
- ✅ AuthContext
- ✅ Login Flow
- ✅ Logout Flow
- ✅ Protected Routes
- ✅ Authentication State Management
- ✅ Current User Synchronization
- ✅ Loading States
- ✅ Toast Notifications

---

# Current Features

## Backend

- Express REST API
- MongoDB Atlas Integration
- User Registration
- User Authentication
- JWT Authentication
- HttpOnly Cookie Sessions
- Authentication Middleware
- Protected API Routes
- Current User Endpoint
- Logout Endpoint
- Zod Validation
- bcrypt Password Hashing

## Frontend

- React + Vite
- Axios Service Layer
- Global Authentication Context
- Protected Routing
- Login Page
- Dashboard
- Logout Functionality
- Toast Notifications
- Loading Indicators

---

# API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/v1/health` | Health Check |
| POST | `/api/v1/users` | Create User |
| POST | `/api/v1/auth/signup` | Register User |
| POST | `/api/v1/auth/login` | Login User |
| POST | `/api/v1/auth/logout` | Logout User |
| GET | `/api/v1/auth/me` | Get Current Authenticated User |

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