# ADR-006: Use HttpOnly Cookies for JWT-Based Authentication

## Status

Accepted

---

## Context

PROJECT GO requires a secure mechanism to maintain an authenticated user session after a successful login.

Several approaches were considered for storing JSON Web Tokens (JWTs):

- Local Storage
- Session Storage
- HttpOnly Cookies

The authentication mechanism should minimize common web security risks while remaining scalable and easy to integrate with protected routes.

---

## Decision

JWT access tokens will be stored in HttpOnly cookies.

The cookies will be configured with the following options:

- `httpOnly: true`
- `secure: process.env.NODE_ENV === "production"`
- `sameSite: "lax"`
- `maxAge` matching the JWT expiration time

JWTs will contain only the minimum required information:

- `userId`

JWT generation will be handled by a dedicated utility (`utils/jwt.js`) to separate authentication logic from controller logic.

---

## Rationale

This approach was chosen because:

- HttpOnly cookies prevent client-side JavaScript from accessing authentication tokens, reducing the impact of XSS attacks.
- `secure` ensures cookies are transmitted only over HTTPS in production.
- `sameSite: "lax"` provides protection against many CSRF attacks while maintaining a good user experience.
- Keeping JWT generation in a dedicated utility follows the Single Responsibility Principle and improves maintainability.

---

## Consequences

### Advantages

- Improved security through HttpOnly cookies.
- Cleaner controller implementation.
- Centralized JWT generation and configuration.
- Easier future maintenance and configuration changes.
- Authentication system is ready for protected routes and authorization middleware.

### Trade-offs

- Cookie-based authentication requires additional middleware to verify JWTs on protected routes.
- Cross-origin deployments may require additional CORS and cookie configuration.

---

## Future Considerations

The next authentication milestone will include:

- JWT verification middleware
- Protected API routes
- Logout endpoint
- Refresh token strategy (if required)