# PROJECT GO API Documentation

---

## Base URL

Development

```
http://localhost:5000
```

Base API Route

```
/api/v1
```

---

# Endpoints

## Health Check

### GET

```
/api/v1/health
```

### Description

Checks whether the backend server is running.

### Success Response

Status Code

```
200 OK
```

Response

```json
{
  "message": "server is running"
}
```

---

## Create User

**Endpoint**

```http
POST /api/v1/users
```

### Request Body

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

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

### Error Response

**Status:** `500 Internal Server Error`

```json
{
  "success": false,
  "message": "Something went wrong"
}
```


## POST /api/v1/auth/signup

Registers a new user.

### Request Body

- username
- email
- password

### Process

- Validate request
- Hash password using bcrypt
- Store user

### Response

201 Created


## POST /api/v1/auth/login

Authenticates an existing user.

### Request Body

- email
- password

### Process

- Validate request
- Find user by email
- Compare password using bcrypt
- Return success (JWT generation planned)

### Responses

200 OK

401 Unauthorized

Invalid email or password


## Future Endpoints

### Authentication

- POST /auth/register
- POST /auth/logout

### User

- GET /users/profile
- PATCH /users/profile

### Projects

- CRUD endpoints (Coming Soon)