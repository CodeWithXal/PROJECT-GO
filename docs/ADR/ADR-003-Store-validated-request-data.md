# ADR-003: Store Validated Request Data in req.validatedData

## Status

Accepted

## Context

Incoming request data is validated using Zod before reaching the controller.

After successful validation, controllers should use the validated data instead of the raw request body.

A decision was required on where to store the validated data for downstream middleware and controllers.

## Decision

Store validated request data in `req.validatedData`.

Example:

```javascript
req.validatedData = result.data;