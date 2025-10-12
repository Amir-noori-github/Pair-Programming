# Self‑Assessment

## Step 1: Add User Authentication

### What I Implemented
- Built **signup** and **login** endpoints using `bcrypt` for password hashing and `JWT` for token generation.
- Updated the `User` model to store hashed passwords securely.
- Returned a signed token on successful signup/login for use in subsequent requests.

### Challenges Faced
- Ensuring **password validation** happened before hashing (bcrypt hashes are always long).
- Handling duplicate usernames gracefully and returning meaningful error messages.
- Managing environment variables for `JWT_SECRET` securely.

### How I Resolved Them
- Added **controller‑side validation** to check raw password length before hashing.
- Used Mongoose’s `unique` constraint and explicit checks to prevent duplicate usernames.
- Configured `.env` and `dotenv` to manage secrets without hardcoding.

### What I Learned
- The importance of validating **raw input** before transformations like hashing.
- How JWTs can be used to maintain stateless authentication.
- Best practices for error handling and secure credential storage.

---

## Step 2: Protect Routes

### What I Implemented
- Created an **auth middleware** (`protect`) that:
  - Extracts the token from the `Authorization` header.
  - Verifies the token using `jwt.verify`.
  - Attaches the authenticated user to `req.user`.
- Applied the middleware to sensitive routes (e.g., `/api/properties`, `/api/tours`).

### Challenges Faced
- Handling cases where the token was missing, expired, or invalid.
- Ensuring that protected routes returned **401 Unauthorized** consistently.
- Coordinating between frontend and backend so the token was always sent in requests.

### How I Resolved Them
- Standardized error responses for missing/invalid tokens.
- Updated frontend fetch calls to include `Authorization: Bearer <token>`.
- Wrote utility functions to store and retrieve the token from `localStorage`.

### What I Learned
- Middleware is a powerful way to enforce **cross‑cutting concerns** like authentication.
- Consistency in error codes (`401` vs `403`) is critical for predictable client behavior.
- Protecting routes requires coordination between **backend logic** and **frontend requests**.

---

## Step 3: Write API Tests

### What I Implemented
- Used **Jest** and **Supertest** to write integration tests for:
  - `POST /api/users/signup` (valid and invalid cases).
  - `POST /api/users/login` (valid and invalid cases).
  - Protected routes like `GET /api/properties`, `POST /api/properties`, etc.
- Added setup/teardown hooks (`beforeEach`, `afterAll`) to reset the database between tests.

### Challenges Faced
- Tests initially failed because of mismatched schema fields (`email` vs `username`).
- Password validation tests failed until raw password checks were added.
- Property route tests returned `401` until token handling was fixed.

### How I Resolved Them
- Updated test data to match the actual schema (`username`, `name`, `role`).
- Fixed the controller to validate raw passwords before hashing.
- Ensured tests signed up a user, retrieved a token, and passed it in the `Authorization` header.

### What I Learned
- Tests are invaluable for catching **schema mismatches** and **auth flow issues** early.
- Writing both **happy path** and **error path** tests ensures robustness.
- Automated tests give confidence when refactoring authentication and route protection logic.

---

## Overall Reflection
This process taught me how authentication, route protection, and testing are tightly connected. Each step reinforced the importance of validating assumptions, handling errors gracefully, and ensuring consistency between backend and frontend. I now feel more confident building secure, testable APIs.
