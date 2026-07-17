# ADR-002: Connect Database Before Starting Server

## Status

Accepted

## Context

PROJECT GO depends on MongoDB for authentication and data persistence.

## Decision

The backend must establish a database connection before accepting HTTP requests.

## Consequences

Pros

- Prevents requests when the database is unavailable.
- Predictable startup behavior.
- Easier debugging.

Cons

- Application will not start if the database is offline.