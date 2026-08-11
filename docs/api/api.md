Here is the complete, updated `api.md` file in one single block so you can easily copy and paste it.

```markdown
# PROJECT GO API Documentation

---

# Base URL

Development

```text
http://localhost:5000

```

Base API Route

```text
/api/v1

```

---

# Endpoints

---

# Health Check

## GET `/api/v1/health`

### Description

Checks whether the backend server is running.

### Success Response

**Status:** `200 OK`

```json
{
  "message": "server is running"
}

```

---

# Authentication

## POST `/api/v1/auth/signup`

### Description

Creates a new user account.

### Request Body

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

### Process

- Validate request using Zod
- Hash password using bcrypt
- Create user
- Store user in MongoDB

### Success Response

**Status:** `201 Created`

```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "username": "string",
    "email": "string"
  }
}
```

### Error Responses

**400 Bad Request**

Validation failed.

Example:

```json
{
  "success": false,
  "message": "validation failed",
  "error": [
    {
      "path": ["email"],
      "message": "Invalid email format"
    },
    {
      "path": ["password"],
      "message": "Password must be at least 8 characters"
    }
  ]
}
```

The `error` array contains the individual Zod validation errors.

The frontend extracts and displays these validation messages to the user.

**500 Internal Server Error**

Backend or database error.

Example:

```json
{
  "success": false,
  "message": "Username already exists",
  "error": "Username already exists"
}
```

or:

```json
{
  "success": false,
  "message": "Email already exists",
  "error": "Email already exists"
}
```

### Frontend Signup Flow

The frontend signup flow follows the authentication service architecture:

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
Backend
    │
    ▼
Success
    │
    ▼
Navigate to /login
```

### Duplicate Submission Protection

The SignupForm prevents multiple signup requests from being submitted while a signup request is already in progress.

The submit button is disabled while the request is being processed, and a `useRef` flag prevents rapid repeated submissions.

### Frontend Error Handling

Validation errors returned in the `error` array are extracted and displayed individually.

Other backend errors use the `message` field from the response.

Both errors are displayed to the user and shown through toast notifications.


---

## POST `/api/v1/auth/login`

### Description

Authenticates an existing user.

### Request Body

```json
{
  "email": "string",
  "password": "string"
}

```

### Process

* Validate request
* Find user by email
* Compare password using bcrypt
* Generate JWT
* Set HttpOnly cookie
* Return authenticated user

### Success Response

**Status:** `200 OK`

```json
{
  "success": true,
  "message": "Login successful"
}

```

### Error Responses

**400 Bad Request**

Validation failed.

**401 Unauthorized**

```json
{
  "success": false,
  "message": "Invalid email or password"
}

```



Also update the Login endpoint.

```md
### Login Flow

1. Validate request body.
2. Verify email.
3. Verify password.
4. Generate JWT.
5. Store JWT in HttpOnly cookie.
6. Return success response.

Frontend immediately calls:

GET /api/v1/auth/me

to synchronize authenticated user data.



---

## GET `/api/v1/auth/me`

### Description

Returns the currently authenticated user.

### Authentication

Requires a valid HttpOnly JWT cookie.

### Process

* Read JWT cookie
* Verify JWT
* Attach decoded user to `req.user`
* Fetch user from MongoDB
* Return user without password

### Success Response

**Status:** `200 OK`

```json
{
  "success": true,
  "message": "User found",
  "data": {
    "_id": "...",
    "username": "...",
    "email": "..."
  }
}

```

### Error Responses

**401 Unauthorized**

Authentication required.

**404 Not Found**

```json
{
  "success": false,
  "message": "User not found"
}

```

---

## POST `/api/v1/auth/logout`

### Description

Logs out the currently authenticated user by destroying their HttpOnly cookie.

### Authentication

Does not require authentication (Idempotent).

### Process

* Overwrite existing `token` cookie with an expired date (`Max-Age=0`).
* Return success message.

### Success Response

**Status:** `200 OK`

```json
{
  "success": true,
  "message": "Logged out successfully"
}

```

---

# Authentication Configuration

Authentication uses:

* JWT (JSON Web Token)
* HttpOnly Cookies
* Cookie-based session persistence

Clients should send requests with credentials enabled.

---

### Frontend Usage

Used by the Dashboard page to retrieve the currently authenticated user using the HttpOnly authentication cookie.

# Current API Summary

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/v1/health` | Health check |
| POST | `/api/v1/auth/signup` | Register a new user |
| POST | `/api/v1/auth/login` | Authenticate user |
| GET | `/api/v1/auth/me` | Get current authenticated user |
| POST | `/api/v1/auth/logout` | Logout user by destroying HttpOnly cookie |

---

# Planned Endpoints

## Users

* PATCH `/api/v1/users/profile`
* DELETE `/api/v1/users`

## Projects

* CRUD operations

## Tasks

* CRUD operations

## Collaboration

* Team management
* Project sharing

```

```