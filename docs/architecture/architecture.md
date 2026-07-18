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
Controllers (Coming Soon)
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

## Future Architecture

- MVC Pattern
- Service Layer
- Authentication & Authorization
- Input Validation
- Error Handling Middleware
- Logging
- File Uploads
- Real-time Features (if required)