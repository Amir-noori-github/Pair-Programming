# Self-Assessment: Property Model (Frontend & Backend)

## Morning Session Overview

Today, I focused on building a full-stack property management application **without authentication**. The goal was to iteratively implement CRUD functionality for the `Property` model and validate it with API tests. I used the provided sample reference code for both API and testing as a guide, adapting it to fit my project structure.

---

## Step 1: Adding and Fetching Properties

### Backend
- Implemented a `Property` schema and controller functions for `createProperty` and `getProperties`.
- Validated required fields such as `title`, `type`, `price`, and `location`.
- Connected routes (`POST /api/properties` and `GET /api/properties`) to the controller.

### Frontend
- Built a form in `AddPropertyPage` to submit new property data.
- Used `fetch` to send POST requests and update the UI after successful creation.
- Displayed a list of properties on the `HomePage` by fetching from the backend.

This step gave me confidence in wiring up the frontend and backend together. I practiced handling form state and error messages effectively.

---

## Step 2: Reading and Deleting a Single Property

### Backend
- Added `getPropertyById` and `deleteProperty` endpoints.
- Implemented error handling for invalid IDs and non-existent properties.

### Frontend
- Created a `PropertyPage` to display details of a single property.
- Added a **Delete** button that triggers a DELETE request and navigates back to the homepage.
- Confirmed deletion with a `window.confirm` prompt to avoid accidental removals.

I learned the importance of defensive coding and checking for missing or invalid resources and giving clear error responses.

---

## Step 3: Updating a Property

### Backend
- Implemented `updateProperty` with `PUT /api/properties/:id`.
- Allowed partial updates while validating required fields.

### Frontend
- Built an `EditPropertyPage` with a pre-filled form populated from the existing property data.
- On submission, sent a PUT request to update the property and redirected back to the details page.

This step reinforced the value of reusing form components and managing controlled inputs. It also highlighted the need for consistent validation between frontend and backend.

---

## Step 4: Writing API Tests

### Backend Testing (Jest + Supertest)
- Wrote tests for all CRUD operations:
  - `POST /api/properties` → should create a property.
  - `GET /api/properties` → should return all properties.
  - `GET /api/properties/:id` → should return a single property.
  - `PUT /api/properties/:id` → should update a property.
  - `DELETE /api/properties/:id` → should delete a property.
- Covered both success and failure cases (e.g., invalid ID, missing fields).

Writing tests gave me confidence that my API works as expected and will remain stable as I add more features. It also helped me catch edge cases I might have missed manually.

---

## Key Learnings

- Iterative development (CRUD first, then testing) kept the process structured and manageable.
- Clear separation of concerns between **controllers, routes, and models** improved maintainability.
- Writing API tests early is invaluable — it ensures reliability and speeds up debugging.
- On the frontend, managing state and navigation around CRUD actions gave me practical experience in building a real-world workflow.

---

## Next Steps

- Add **authentication and authorization** to protect property routes.
- Implement **role-based access control** (e.g., only owners/admins can edit or delete).
- Improve **UI/UX** with better error handling, loading states, and form validation.
- Expand test coverage to include frontend integration tests.

---

This self-assessment shows that today I successfully built a **full CRUD property app** without authentication, validated it with API tests, and gained deeper confidence in connecting frontend and backend workflows.
