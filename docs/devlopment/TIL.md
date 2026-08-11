# Today I Learned (TLD)

---

## 2026-07-13 — Backend Initialization

### Concepts

#### Express Application vs Router

- `express()` creates the main application.
- `express.Router()` creates modular route handlers.
- The application mounts routers using `app.use()`.

---

#### Middleware

Middleware executes before route handlers.

Every middleware must either:

- call `next()`, or
- send a response.

Otherwise the request hangs indefinitely.

---

#### express.json()

`express.json()` parses incoming JSON request bodies and stores the parsed object in `req.body`.

Without it:

```javascript
req.body
```

is undefined for JSON requests.

---

#### Request Lifecycle

```
Client
    ↓
Node.js
    ↓
Express
    ↓
Middleware
    ↓
Router
    ↓
Controller
    ↓
Response
```

---

#### Route Mounting

```javascript
app.use("/api/v1", healthRouter);
```

means every route inside `healthRouter` starts with `/api/v1`.

Therefore:

```javascript
router.get("/health")
```

becomes:

```
GET /api/v1/health
```

---

#### Environment Variables

- `.env` stores configuration.
- `dotenv` loads `.env` into `process.env`.
- Environment variables should never be hardcoded.

---

#### Node Modules

`package.json` stores project dependencies.

`npm install` recreates `node_modules`.

`node_modules` should never be committed to Git.

---

### Mistakes I Made

- Imported a default export using named imports.
- Mounted the router incorrectly.
- Forgot how `app.listen()` works.
- Tested `/` instead of `/api/v1/health`.

---

### Key Takeaways

- Think about architecture before syntax.
- Understand why code works.
- Test every feature before committing.


# Today I Learned (TLD)

---

## 2026-07-17 — Backend Initialization & MongoDB Connection

### Concepts

#### Express Application vs Router

- `express()` creates the main application.
- `express.Router()` creates modular route handlers.

#### Middleware

- Middleware runs before the route handler.
- It must either send a response or call `next()`.

#### express.json()

- Parses incoming JSON request bodies.
- Makes data available in `req.body`.

#### Environment Variables

- `dotenv` loads variables from `.env` into `process.env`.
- Sensitive information should never be hardcoded.

#### MongoDB vs Mongoose

- MongoDB stores the data.
- Mongoose is an ODM used to interact with MongoDB.

#### Async Startup

- Database connection is asynchronous.
- The server should start only after a successful database connection.

#### Startup Sequence

```text
Load .env
    ↓
Connect Database
    ↓
Start Express Server
```

#### process.exit()

- `process.exit(0)` → Successful termination.
- `process.exit(1)` → Program terminated due to an error.

---

### Bugs Solved

- Missing `dev` script in `package.json`.
- `Cannot GET /` because no root route existed.
- Missing `MONGODB_URI` in `.env`.
- Incorrect use of Markdown backticks inside `console.log()`.

---

### Key Takeaways

- Separate startup logic from application logic.
- Wait for critical services before accepting requests.
- Read error messages carefully before debugging.
- Keep configuration, routing, and startup responsibilities separate.


# Today I Learned (TLD)

---

## 2026-07-18 — User Creation Endpoint

### Concepts

#### Mongoose Schema
- A schema defines the structure and validation rules for documents stored in MongoDB.

#### Mongoose Model
- A model is created from a schema and is used to interact with a MongoDB collection.

#### MVC Request Flow
- A client request flows through Route → Controller → Model → Database → Response.

#### Express Router
- Routes map HTTP endpoints to controller functions.

#### Creating Documents
- `User.create()` creates and saves a new document in MongoDB.

#### Async Database Operations
- Database operations are asynchronous and should be awaited before sending a response.


---


# Today I Learned (TLD)

---

## 2026-07-19 — Request Validation with Zod

### Concepts

#### Zod Validation

- Learned why request validation should happen before the controller.
- Used Zod schemas to validate incoming request data.

#### Validation Middleware

- Built a reusable validation middleware using `safeParse()`.
- Learned how middleware uses `next()` to continue the request lifecycle.

#### Higher-Order Middleware

- Learned how a function can return middleware, allowing the same validation logic to be reused with different schemas.

#### Validated Request Data

- Passed validated request data to controllers using `req.validatedData`.

#### MongoDB Duplicate Key Errors

- Learned that duplicate unique fields produce MongoDB error code `11000`.
- Understood the difference between validation errors and database constraint errors.



## 2026-07-20 — Password Hashing with bcrypt

### Concepts

#### Password Hashing

- Learned why passwords should never be stored in plain text.
- Used bcrypt to hash passwords before storing them.

#### bcrypt

- Learned the difference between `bcrypt.hash()` and `bcrypt.compare()`.
- Used a cost factor of 12 for password hashing.

#### Salt

- Learned that bcrypt automatically generates a unique salt for every password.
- Understood that identical passwords produce different hashes.

#### Controller Responsibility

- Learned that password hashing is business logic and belongs in the controller before creating the user.


## 2026-07-22 — Authentication Module

## What I learned

### Separation of Concerns

Authentication should be separated from user management.

Authentication handles:
- Signup
- Login
- Password hashing
- Password verification

User module will handle:
- User profile
- User-related operations

---

### Login Flow

Client

↓

Validate Request

↓

Find User by Email

↓

Compare Password using bcrypt.compare()

↓

Return success or "Invalid email or password"

---

### Generic Authentication Errors

Never reveal whether:
- the email exists
- or the password is incorrect.

Instead, always return:

"Invalid email or password"

This prevents user enumeration attacks.

---

### Debugging Lesson

Every request receives a new `req` object.

`req.validatedData` only exists if the request passes through the validation middleware.

Therefore, every endpoint that relies on validated data must use:

validate(schema)

before reaching the controller.



## 2026-07-24 — Authentication Module

## What I Learned

### Separation of Concerns

Authentication should be separated from user management.

Authentication handles:

- Signup
- Login
- Password hashing
- Password verification

User module will handle:

- User profile
- User-related operations

---

### Signup Flow

Client

↓

Validate Request

↓

Hash Password using `bcrypt.hash()`

↓

Store User in Database

↓

Return Success Response

---

### Login Flow

Client

↓

Validate Request

↓

Find User by Email

↓

Compare Password using `bcrypt.compare()`

↓

Generate JWT

↓

Store JWT in HttpOnly Cookie

↓

Return Success Response

---

### Generic Authentication Errors

Never reveal whether:

- the email exists
- or the password is incorrect.

Instead, always return:

"Invalid email or password"

This prevents user enumeration attacks.

---

### Password Hashing

Passwords should never be stored in plain text.

During Signup:

- Hash the password using `bcrypt.hash()`.
- Store only the hashed password.

During Login:

- Compare the entered password with the stored hash using `bcrypt.compare()`.

---

### JSON Web Tokens (JWT)

JWTs are used to authenticate users after login.

The payload should contain only the minimum required information.

For PROJECT GO:

- `userId`

JWTs are generated using:

```javascript
jwt.sign()
```

---

### HttpOnly Cookies

JWTs are stored inside HttpOnly cookies.

Cookie options:

- `httpOnly` → Prevents JavaScript access.
- `secure` → HTTPS only in production.
- `sameSite` → Helps prevent CSRF attacks.
- `maxAge` → Cookie lifetime.

---

### Debugging Lesson

Every request receives a new `req` object.

`req.validatedData` only exists if the request passes through the validation middleware.

Therefore, every endpoint that relies on validated data must use:

```javascript
validate(schema)
```

before reaching the controller.

---

### Engineering Decisions

- Authentication logic belongs inside `auth.controller.js`.
- Authentication routes belong inside `auth.routes.js`.
- Authentication validation belongs inside `auth.validation.js`.
- JWT generation should be isolated inside `utils/jwt.js`.




## 2026-07-25 — JWT Authentication & Protected Routes

## What I Learned

### JWT Verification

JWTs are verified using `jwt.verify()`.

- Returns the decoded payload if the token is valid.
- Throws an exception if the token is invalid or expired.
- The decoded payload is attached to `req.user`.

---

### Authentication Middleware

The authentication middleware is responsible only for authentication.

It should:

- Read the JWT from the HttpOnly cookie.
- Verify the JWT.
- Attach the decoded payload to `req.user`.
- Return `401 Unauthorized` if authentication fails.
- Call `next()` when authentication succeeds.

It should **not** perform business logic or database queries.

---

### Protected Route Flow

Client

↓

HttpOnly Cookie

↓

Authentication Middleware

↓

Verify JWT

↓

Attach `req.user`

↓

Protected Controller

↓

Database

↓

Response

---

### Cookie Parser

Browsers send cookies inside the HTTP `Cookie` header.

`cookie-parser`:

- Parses the Cookie header.
- Makes cookies available through `req.cookies`.
- Eliminates manual cookie parsing.

---

### Current User Endpoint

The authenticated user's ID is available through:

```javascript
req.user.userId
```

The controller:

- Retrieves the user using `findById()`.
- Excludes the password using:

```javascript
.select("-password")
```

- Returns only the required user information.

---

### Error Handling

Authentication errors:

- Missing token → `401 Unauthorized`
- Invalid or expired JWT → `401 Unauthorized`

Application errors:

- User not found → `404 Not Found`
- Unexpected server errors → `500 Internal Server Error`

---

### Middleware Responsibilities

Validation Middleware

- Validates incoming request data.
- Stores validated data inside `req.validatedData`.

Authentication Middleware

- Authenticates the request.
- Stores the authenticated user's JWT payload inside `req.user`.

Controllers

- Handle business logic.
- Query the database only when required.

---

### Engineering Decisions

- Store JWTs in HttpOnly cookies instead of Local Storage.
- Keep JWT payload minimal by storing only `userId`.
- Authentication middleware should only verify identity.
- Controllers should fetch additional user information when needed.
- Never expose sensitive fields such as passwords in API responses.

---

### Debugging Lessons

- `jwt.verify()` throws exceptions instead of returning `false`.
- Exceptions immediately transfer execution to the `catch` block.
- Every protected route must pass through the authentication middleware before reaching the controller.
- Consistent API response structure (`success`, `message`, `data`) improves maintainability.


## 2026-07-27 — Frontend Authentication

### Service Layer

Frontend components should communicate with backend APIs through a service layer instead of calling Axios directly.

---

### Axios Instance

Creating a shared Axios instance centralizes the base URL, headers, and credentials configuration, making future changes easier.

---

### Loading State

Using `isLoading` prevents duplicate requests and provides feedback while asynchronous operations are running.

---

### Error State

Backend errors should be stored in component state and displayed in the UI instead of only logging them to the console.

---

### Authentication Flow

The complete login flow is:

Client Form

↓

Authentication Service

↓

Axios

↓

Backend

↓

JWT + HttpOnly Cookie

↓

Navigate to Dashboard

---

### Debugging

When debugging API requests, inspect each layer systematically:

React

↓

Network Request

↓

Backend Response

↓

Database

instead of assuming the frontend code is incorrect.



## 2026-07-28 - Frontend Authentication Flow

---

### Overview

Today I implemented the frontend authentication flow for PROJECT GO. I learned how to structure API communication using a service layer and a shared Axios instance, how to fetch authenticated user data on page load, and how to manage loading and error states in React.

---

### Layered Authentication Architecture

Authentication follows a layered architecture where each layer has a single responsibility.

```text
Login Form
    │
    ▼
Authentication Service
    │
    ▼
Shared Axios Instance
    │
    ▼
Backend API
    │
    ▼
Database
```

#### Responsibilities

- **React Components** handle user interaction and rendering.
- **Authentication Service** contains authentication-related business logic.
- **Axios Instance** centralizes API configuration.
- **Backend API** validates requests and returns responses.

This separation makes the application easier to maintain, test, and scale.

---

### Shared Axios Instance

Instead of importing Axios directly in every component, I created a shared Axios instance.

#### Benefits

- Configure the API base URL once.
- Automatically send HttpOnly cookies using `withCredentials`.
- Reuse common request headers.
- Prepare the application for Axios interceptors in the future.

---

### Data Fetching with useEffect

Data that should be loaded when a page first renders belongs inside `useEffect`.

Flow:

```text
Component Mount
      │
      ▼
useEffect
      │
      ▼
Async Function
      │
      ▼
API Request
      │
      ▼
Update State
```

Since `useEffect` cannot be asynchronous, an async function is created inside it and called immediately.

---

### Loading and Error States

Asynchronous requests should manage three different UI states:

- Loading
- Success
- Error

Using `try`, `catch`, and `finally` ensures that loading is always stopped regardless of whether the request succeeds or fails.

---

### Early Return Pattern

Instead of writing large conditional JSX, I learned to return early for different UI states.

```text
Loading?
    │
    ▼
Return Loading UI

Error?
    │
    ▼
Return Error UI

Otherwise
    │
    ▼
Return Dashboard
```

This makes React components easier to read and maintain.

---

### API Response Structure

The backend returns responses in the following format:

```json
{
  "success": true,
  "message": "...",
  "data": {
    ...
  }
}
```

The authentication service returns `response.data`.

Components only store the data they actually need.

Example:

```javascript
setUser(response.data);
```

instead of storing the entire API response object.

---

### Key Takeaways

- Separate UI from API communication.
- Keep authentication logic inside services.
- Use a shared Axios instance for all API requests.
- Manage loading and error states explicitly.
- Fetch data on component mount using `useEffect`.
- Use early returns to simplify React components.
- Store only the data required by the component.

---

## 2026-08-02

# Authentication Architecture

### Axios Response Interceptors

- Learned how Axios response interceptors process every API response globally.
- Used a centralized interceptor to detect `401 Unauthorized` responses.
- Learned why authentication errors should be handled in one place instead of every component (DRY Principle).
- Understood that successful responses should be returned unchanged while errors should be propagated using `Promise.reject(error)`.

### React Context

- Learned how `createContext()` creates a shared state container for the application.
- Implemented `AuthProvider` to fetch the authenticated user once during application startup.
- Learned that React Context acts as a single source of truth for authentication state.
- Eliminated duplicate `/auth/me` API requests across multiple components.

### Custom Hooks

- Created a reusable `useAuth` custom hook.
- Learned how custom hooks simplify access to React Context by hiding `useContext()` implementation details.
- Improved component readability by consuming authentication state through a single hook.

### Protected Routes

- Implemented a reusable `ProtectedRoute` component.
- Learned how route protection should belong to the routing layer rather than individual pages.
- Understood why `ProtectedRoute` wraps the `element` prop instead of wrapping `<Route>` components.
- Learned how the `children` prop allows wrapper components to render protected pages.

### Dashboard Refactoring

- Refactored `Dashboard` to consume authentication state from `AuthContext`.
- Removed direct authentication API requests from the page.
- Separated authentication logic from UI rendering.

### Key Engineering Concepts

- Separation of Concerns
- Single Responsibility Principle (SRP)
- DRY (Don't Repeat Yourself)
- Centralized State Management
- Global Authentication Architecture
- Route Protection using React Router
- Reusable Components with `children`



### 2026-08-04 — Cookie Invalidation & Idempotency

**Cookie Mechanics**
- The server cannot delete a file from the user's browser.
- To "delete" a cookie, the server sends a new `Set-Cookie` header with the exact same name, but with an expiration date in the past.
- The `res.clearCookie()` options (path, domain, secure, sameSite) MUST exactly match the options used to create the cookie, otherwise the browser will ignore the command.

**Express Mechanics**
- `res.clearCookie()` is synchronous. It does not return a Promise. It simply attaches a header to the response object in Node's memory. The header is only sent when `res.json()` or `res.send()` is called.

**Idempotent API Design**
- The logout route does not verify the token first. 
- Calling logout 10 times in a row should return 200 OK every time. The goal is simply "ensure the user has no active token."



### 2026-08-06


## Authentication Flow

### Error Propagation

- Async functions naturally propagate errors.
- If `fetchUser()` throws an error:
  - `login()` also throws.
  - The calling component (`LoginForm`) can handle it.
- This avoids unnecessary try/catch blocks in every function.

---

### Separation of Responsibilities

Backend responsibilities:
- Validate requests.
- Authenticate users.
- Return structured responses.

Frontend responsibilities:
- Display errors.
- Show loading states.
- Show toast notifications.
- Navigate users.

---

### Authentication Flow

Successful login flow:

1. User submits credentials.
2. Frontend calls `login()`.
3. Backend validates credentials.
4. JWT cookie is created.
5. Frontend requests `/auth/me`.
6. User information is stored inside `AuthContext`.
7. UI updates automatically.

---

### Logout Flow

1. User clicks Logout.
2. Frontend calls logout endpoint.
3. Backend clears authentication cookie.
4. Frontend clears authenticated user.
5. User is redirected to Login page.

---

### Validation vs Authentication

Validation errors:
- Invalid request format.
- Missing fields.
- Invalid email format.
- Weak password.

Authentication errors:
- Wrong email.
- Wrong password.

These are different responsibilities and should return different responses.

---

### React Context

React Context should manage authentication state instead of individual pages.

Components consume authentication through:

- user
- isAuthenticated
- isLoading
- login()
- logout()


---


## 2026-08-11 - Signup Flow

### Controlled Forms

- Implemented a controlled signup form using React state.
- Form state stores:
  - username
  - email
  - password
- `handleChange()` updates the correct field using the input's `name`.

---

### Signup Architecture

- Signup follows the same separation of responsibilities as login.

Frontend flow:

1. User enters signup credentials.
2. `SignupForm` calls `signup()`.
3. `AuthContext` calls `signupService()`.
4. Authentication service sends the API request.
5. Backend validates the request.
6. Backend creates the user.
7. Success response is returned.
8. User is redirected to Login page.

---

### Validation Error Handling

- Backend validation is performed using Zod.
- Validation errors contain individual error messages.
- Frontend extracts and displays these messages instead of only displaying `"validation failed"`.
- Validation errors are different from authentication errors.

Validation errors:

- Missing fields.
- Invalid email format.
- Username format violations.
- Weak password.
- Password length violations.

Backend/database errors:

- Duplicate username.
- Duplicate email.
- Database errors.
- Server errors.

---

### Error Propagation

- Errors can propagate through async functions.
- `signupService()` can throw an error.
- `signup()` does not need to consume the error.
- The error reaches `SignupForm`, where it can be displayed to the user.
- This avoids unnecessary try/catch blocks at every layer.

---

### Duplicate Submission Prevention

- Added a submission guard using `useRef()`.
- `isSigningUp` controls the button's UI state.
- `isSubmitting.current` prevents repeated submissions while a signup request is already running.

Difference:

- `useState()` → UI state that causes re-renders.
- `useRef()` → mutable value that persists between renders without causing a re-render.

---

### Form Submission

- Learned why `event.preventDefault()` is required when manually handling form submission with React.
- It prevents the browser's default form submission behavior and allows React to control the request.

---

### CORS Preflight

- Observed an `OPTIONS` request returning `204` before the actual signup request.
- Learned that this is a CORS preflight request generated by the browser.
- The preflight request does not create a second user or represent a duplicate signup request.

Flow:

1. `OPTIONS /auth/signup` → CORS preflight.
2. `POST /auth/signup` → actual signup request.

---

### Database Constraints

- Learned that frontend/backend validation and database constraints solve different problems.
- Zod validates the structure and format of incoming data.
- MongoDB unique indexes enforce uniqueness.
- Duplicate username/email errors can still occur after validation succeeds.
- Database constraints are therefore still required to maintain data integrity.

---

### Testing

Tested:

- Successful signup.
- Empty fields.
- Invalid email.
- Invalid password.
- Duplicate username.
- Duplicate email.
- Backend unavailable.
- Rapid repeated submissions.
- Successful navigation to Login page.

---

### Key Concepts Learned

- Controlled React forms.
- `event.preventDefault()`.
- Authentication service separation.
- Error propagation.
- Validation error handling.
- Database constraints.
- `useState()` vs `useRef()`.
- Duplicate submission prevention.
- CORS preflight requests.
- Testing success and failure paths.


---