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

## Future Endpoints

### Authentication

- POST /auth/register
- POST /auth/login
- POST /auth/logout

### User

- GET /users/profile
- PATCH /users/profile

### Projects

- CRUD endpoints (Coming Soon)