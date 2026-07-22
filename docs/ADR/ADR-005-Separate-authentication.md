# ADR-004: Separate Authentication from User Management

## Status

Accepted

## Context

Authentication responsibilities (signup, login, password verification) were initially implemented inside the user module. As the project grows, authentication and user profile management should be separated to improve maintainability and scalability.

## Decision

A dedicated authentication module will be used.

Authentication-related functionality:
- Signup
- Login
- Password hashing
- Password verification
- JWT generation (future)

User module responsibilities:
- User profile
- Profile updates
- User-specific operations

## Consequences

### Advantages
- Clear separation of concerns.
- Easier to maintain and scale.
- Authentication logic is centralized.

### Alternatives Considered
- Keep authentication inside the user module (Rejected)