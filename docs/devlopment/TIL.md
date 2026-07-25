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