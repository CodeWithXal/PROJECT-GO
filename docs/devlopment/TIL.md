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