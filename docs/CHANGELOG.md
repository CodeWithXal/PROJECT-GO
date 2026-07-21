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

## Added

- Zod validation for user creation requests.
- Generic reusable validation middleware.
- Request validation before controller execution.
- Validated request data available through `req.validatedData`.

## Improved

- User creation endpoint now validates input before interacting with the database.
- Added handling for duplicate unique field errors.


## Added

- bcrypt password hashing before user creation.
- Secure password storage using bcrypt hashes.

## Improved

- User passwords are no longer stored in plain text.