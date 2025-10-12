# Self‑Grading Report

## Step 1: Add User Authentication

**Grade: 5**

### Justification
- Implemented secure signup and login with `bcrypt` password hashing and `JWT` token generation.
- Validated raw passwords before hashing to prevent weak credentials.
- Returned tokens correctly for use in subsequent requests.

### What Was Done Well
- Clear separation of concerns between model, controller, and middleware.
- Secure handling of secrets using environment variables.
- Error handling for duplicate usernames and invalid credentials.

### What Could Be Improved
- Add more comprehensive validation (e.g., password complexity rules, email/username format).
- Implement refresh tokens or session expiration handling for better security.
- Provide more descriptive error messages for different failure cases.

---

## Step 2: Protect Routes

**Grade: 4**

### Justification
- Added an authentication middleware (`protect`) to verify JWTs and attach the user to requests.
- Applied middleware to sensitive routes like `/api/properties`.
- Ensured unauthorized requests return `401 Unauthorized`.

### What Was Done Well
- Middleware is reusable and applied consistently across routes.
- Frontend updated to include `Authorization: Bearer <token>` headers.
- Error responses standardized for missing or invalid tokens.

### What Could Be Improved
- Add role‑based access control (e.g., admin vs. user permissions).
- Improve error messages to distinguish between expired and invalid tokens.
- Write more integration tests specifically for protected routes.

---

## Step 3: Write API Tests

**Grade: 4**

### Justification
- Wrote integration tests with **Jest** and **Supertest** for signup, login, and protected routes.
- Covered both success and failure cases (valid credentials, invalid password, missing token).
- Used `beforeEach` and `afterAll` hooks to reset the database and close connections.

### What Was Done Well
- Tests are structured, readable, and aligned with the schema (`username`, `name`, etc.).
- Both happy path and error path scenarios are tested.
- Automated tests caught schema mismatches and missing validations early.

### What Could Be Improved
- Add more edge case tests (e.g., duplicate usernames, expired tokens).
- Include performance tests for high request volumes.
- Mock external dependencies (if any) for faster test runs.

---

## Overall Reflection

**Overall Grade: 5**

- The project demonstrates a solid understanding of **authentication**, **route protection**, and **API testing**.
- The main strengths are secure password handling, consistent middleware, and comprehensive test coverage.
- Improvements could focus on **advanced security features** (refresh tokens, role‑based access) and **broader test coverage** for edge cases.
