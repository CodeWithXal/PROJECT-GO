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


## 2026-08-02

### Added

- Added an Axios response interceptor for centralized authentication and error handling.
- Implemented automatic redirection to the login page on `401 Unauthorized` responses.
- Created `AuthContext` to provide global authentication state across the application.
- Added `AuthProvider` to initialize and manage the authenticated user session.
- Created a reusable `useAuth` custom hook for simplified access to authentication state.
- Implemented `ProtectedRoute` to restrict access to authenticated routes.

### Changed

- Centralized authentication state management using React Context.
- Refactored the Dashboard to consume authentication state from `AuthContext` instead of making direct API requests.
- Moved authentication and route protection logic out of individual components, improving separation of concerns and reducing code duplication.

## 2026-08-04

### Added
- Backend logout endpoint (`POST /api/v1/auth/logout`) to securely invalidate HttpOnly cookies.

## 2026-08-06


## [Unreleased]

### Added

#### Backend
- Implemented `POST /api/v1/auth/logout` endpoint.
- Added secure logout using `res.clearCookie()`.
- Added authenticated `GET /api/v1/auth/me` endpoint.

#### Frontend
- Added centralized authentication management using `AuthContext`.
- Implemented global login and logout functions.
- Added authentication state management.
- Added protected route support.
- Added logout loading state (`isLoggingOut`).
- Added toast notifications for login and logout events.
- Added frontend handling for backend validation errors.
- Added automatic user fetching after successful login.


### Improved

- Authentication logic is now separated between:
  - UI components
  - `AuthContext`
  - Authentication services
  - Backend controllers
- Dashboard now consumes authentication state through `AuthContext`.
- Authentication errors are propagated from services through the context to the UI.

### Tested

- Login flow.
- Logout flow.
- Authentication persistence after page refresh.
- Protected routes.
- Invalid login credentials.
- Backend logout endpoint.

---


## 2026-08-11

### Added

#### Frontend Signup

- Added signup page.
- Added `SignupForm` component.
- Added controlled username, email, and password inputs.
- Added `signupService()` to the authentication service.
- Added centralized `signup()` function to `AuthContext`.
- Added signup loading state.
- Added redirect to the login page after successful signup.

### Improved

- Added user-friendly display of Zod validation errors returned by the backend.
- Validation errors are now displayed individually instead of only showing `"validation failed"`.
- Added backend error handling for signup failures.
- Added duplicate username error handling.
- Added duplicate email error handling.
- Added signup success and failure toast notifications.
- Added protection against rapid repeated signup submissions using a `useRef` submission guard.
- Signup button is disabled while a signup request is in progress.

### Tested

- Successful signup.
- Empty signup fields.
- Invalid username.
- Invalid email.
- Invalid password.
- Duplicate username.
- Duplicate email.
- Backend unavailable during signup.
- Rapid repeated signup button clicks.
- Successful redirect from signup to login.
- Signup validation error handling.
- Signup toast notifications.
- CORS preflight behavior.


---


## 2026-08-16

### Changed

- Replaced the `fetchUser()` function in `AuthContext` with `refreshUser()`.
- Centralized authenticated-user synchronization through `refreshUser()`.
- Updated authentication initialization to use `refreshUser()`.
- Updated the login flow to call `refreshUser()` after successful authentication.
- Exposed `refreshUser()` through `AuthContext` for reuse by other authentication-related components and flows.

### Improved

- Removed duplicated user-fetching responsibility from authentication flows.
- Authentication state synchronization is now handled through a single reusable function.
- Preserved existing async error propagation behavior.