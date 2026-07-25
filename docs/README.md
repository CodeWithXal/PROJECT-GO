# PROJECT GO

PROJECT GO is a full-stack productivity and project management platform being built with production-quality software engineering practices.

This repository follows a monorepo architecture containing both the frontend and backend.

---

## Tech Stack

### Frontend
- React
- Vite
- JavaScript (TypeScript planned)

### Backend
- Node.js
- Express.js
- MongoDB

---

## Project Structure

PROJECT-GO/
├── frontend/
├── backend/
├── README.md
└── package.json

---

## Getting Started

### Clone the repository

```bash
git clone <repository-url>
```

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# PROJECT GO Documentation

## Architecture
- ARCHITECTURE.md

## API
- API.md

## Development
- TLD.md

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

## Current Progress

- ✅ Monorepo setup
- ✅ GitHub repository initialized
- ✅ Express backend configured
- ✅ MongoDB Atlas connected
- ✅ Health check endpoint implemented
- ✅ User Model
- ✅ User Creation API
- ✅ Zod Validation
- ✅ Validation Middleware
- ✅ Password Hashing (bcrypt)
- ✅ Password Verification (bcrypt.compare())
- ✅ JWT Authentication
- ✅ HttpOnly Cookie Authentication
- ✅ Protected Routes

---


## Current Features

- Express backend setup
- MongoDB Atlas connection
- Health check endpoint
- User model using Mongoose
- Create User API endpoint
- Zod request validation
- Reusable validation middleware
- Duplicate username/email detection
- bcrypt password hashing
- Secure password storage
- JWT Access Token Generation
- HttpOnly Cookie Authentication
- Secure Cookie Configuration
- JWT verification
- Authentication middleware
- Protected routes
- Current authenticated user endpoint


---

## API Table

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/v1/health | Health check |
| POST | /api/v1/users | Create a new user |
| POST | /api/v1/auth/signup | Register a new user |
| POST | /api/v1/auth/login | Authenticate user |
| GET | /api/v1/auth/me | Get authenticated user |


---

## License

MIT