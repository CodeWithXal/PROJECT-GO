# Changelog

## v0.1.0

### Added

- Monorepo architecture
- React frontend
- Express backend
- Health check endpoint
- Environment variable support


---


### Added

- MongoDB Atlas connection
- Database startup sequence
- Async server initialization


---

## 2026-07-18

### Added

- User model using Mongoose.
- User creation controller.
- User routes.
- Create User API endpoint (`POST /api/v1/users`).

### Tested

- Verified user creation through Postman.
- Verified document creation in MongoDB Atlas.


---

## 2026-07-19

### Added

- Zod validation for user creation requests.
- Generic reusable validation middleware.
- Request validation before controller execution.
- Validated request data available through `req.validatedData`.

### Improved

- User creation endpoint now validates input before interacting with the database.
- Added handling for duplicate unique field errors.


## 2026-07-21

### Added

- bcrypt password hashing before user creation.
- Secure password storage using bcrypt hashes.

### Improved

- User passwords are no longer stored in plain text.


## 2026-07-22

### Added

- Authentication module.
- Signup endpoint.
- Login endpoint.
- Password verification using bcrypt.compare().

### Changed

- Moved authentication logic from user module into dedicated auth module.


## 2026-07-24

### Added

- JWT access token generation utility.
- Login validation schema.
- HttpOnly cookie-based authentication.
- Secure cookie configuration.


## 2026-07-25

### Added

- JWT verification utility.
- Authentication middleware for protected routes.
- Protected endpoint to retrieve the authenticated user's profile (`GET /api/v1/auth/me`).

### Improved

- Authentication requests now verify JWTs stored in HttpOnly cookies.
- Authenticated user information is attached to `req.user`.
- User profile responses exclude the password field.
- End-to-end authentication flow verified through Postman.


## 2026-07-26

### Added

- Initialized frontend foundation with React Router and project structure.


## 2026-07-27

### Added

- LoginForm React component
- Shared Axios client
- Authentication service layer
- Loading and error states
- Frontend integration with backend login API
- Navigation to dashboard after successful login

### Configured

- Axios credentials
- Backend CORS for frontend communication

### Verified

- Login flow
- HttpOnly cookie storage
- Session persistence after page refresh


## 2026-07-28

## [Unreleased]

### Added
- Frontend login page
- Login form with controlled inputs
- Authentication service layer
- Shared Axios instance
- Dashboard page with authenticated user fetching
- Loading and error state handling
- Dashboard navigation after successful login

### Changed
- API requests now use a centralized Axios client.
- Authentication flow now follows:
  Login Form → Auth Service → Axios → Backend.