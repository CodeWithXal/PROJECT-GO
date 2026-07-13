# ADR-001: Use a Monorepo

## Status

Accepted

## Context

PROJECT GO contains a frontend and backend that are tightly coupled.

## Decision

Use a monorepo containing:

- frontend/
- backend/
- docs/

## Consequences

Pros

- Easier development
- Easier versioning
- Simpler onboarding

Cons

- Larger repository
- Requires good organization