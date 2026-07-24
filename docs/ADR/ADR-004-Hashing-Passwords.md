# ADR-004: Hash Passwords Before Database Storage

## Status

Accepted

## Context

User passwords should never be stored in plain text because a database compromise would expose user credentials.

## Decision

Passwords will be hashed using bcrypt in the controller before creating a user.

## Consequences

### Advantages

- Passwords are never stored in plain text.
- Improves application security.
- Follows industry best practices.

### Alternatives Considered

- Store plain text passwords (Rejected)
- Hash passwords in the model (Rejected)