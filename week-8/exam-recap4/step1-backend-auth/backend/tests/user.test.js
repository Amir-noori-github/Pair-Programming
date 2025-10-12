// const mongoose = require("mongoose");
// const supertest = require("supertest");
// const app = require("../app"); // app.js already connects to DB
// const api = supertest(app);
// const User = require("../models/userModel");

// // --- Test Data (plain text passwords, not pre-hashed) ---
// const users = [
//     {
//         name: "Alice Johnson",
//         username: "alicej",
//         password: "StrongPass123!",   // plain text
//         phone_number: "+14155552671",
//         gender: "female",
//         date_of_birth: "1990-04-15T00:00:00.000Z",
//         role: "admin",
//         address: {
//             street: "123 Maple Street",
//             city: "Springfield",
//             state: "Illinois",
//             zipCode: "62704"
//         }
//     },
//     {
//         name: "Bob Martinez",
//         username: "bobmart",
//         password: "AnotherPass456!",  // plain text
//         phone_number: "+14155552672",
//         gender: "male",
//         date_of_birth: "1985-09-30T00:00:00.000Z",
//         role: "user",
//         address: {
//             street: "456 Oak Avenue",
//             city: "Austin",
//             state: "Texas",
//             zipCode: "73301"
//         }
//     }
// ];

// const user = {
//     name: "Charlie Kim",
//     username: "charliek",
//     password: "SecretPass789!",      // plain text
//     phone_number: "+14155552673",
//     gender: "non-binary",
//     date_of_birth: "1995-12-10T00:00:00.000Z",
//     role: "moderator",
//     address: {
//         street: "789 Pine Lane",
//         city: "Seattle",
//         state: "Washington",
//         zipCode: "98101"
//     }
// };

// // --- Test Setup ---
// beforeEach(async () => {
//     await User.deleteMany({});
// });

// // --- Test Suites ---
// describe("User Routes", () => {
//     describe("POST /api/users/signup", () => {
//         it("✅ should signup a new user with valid credentials", async () => {
//             const result = await api.post("/api/users/signup").send(users[0]);

//             expect(result.status).toBe(201);
//             expect(result.body).toHaveProperty("token");

//             // Extra check: user is actually saved in DB
//             const savedUser = await User.findOne({ username: users[0].username });
//             expect(savedUser).not.toBeNull();
//         });

//         it("❌ should return an error with invalid password", async () => {
//             // clone user[1] but override password with too-short value
//             const userData = { ...users[1], password: "short" };

//             const result = await api.post("/api/users/signup").send(userData);

//             expect(result.status).toBe(400);
//             expect(result.body).toHaveProperty("error");
//         });
//     });

//     describe("POST /api/users/login", () => {
//         it("✅ should login a user with valid credentials", async () => {
//             // First signup
//             await api.post("/api/users/signup").send(users[0]);

//             // Then login
//             const result = await api.post("/api/users/login").send({
//                 username: users[0].username,
//                 password: users[0].password
//             });

//             expect(result.status).toBe(200);
//             expect(result.body).toHaveProperty("token");
//         });

//         it("❌ should return an error with wrong password", async () => {
//             // First signup
//             await api.post("/api/users/signup").send(users[0]);

//             // Try login with wrong password
//             const result = await api.post("/api/users/login").send({
//                 username: users[0].username,
//                 password: "wrongpassword",
//             });

//             expect(result.status).toBe(400);
//             expect(result.body).toHaveProperty("error");
//         });
//     });
// });

// // --- Cleanup ---
// afterAll(async () => {
//     await mongoose.connection.close();
// });

const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app"); // app.js already connects to DB
const api = supertest(app);
const User = require("../models/userModel");

// Clean the users collection before each test
beforeEach(async () => {
  await User.deleteMany({});
});

describe("User Routes", () => {
  describe("POST /api/users/signup", () => {
    it("✅ should signup a new user with valid credentials", async () => {
      const userData = {
        name: "Alice Johnson",
        username: "alicej",
        password: "StrongPass123!",
        phone_number: "09-123-47890",
        gender: "female",
        date_of_birth: "1990-04-15",
        role: "admin",
        address: {
          street: "123 Maple Street",
          city: "Springfield",
          state: "Illinois",
          zipCode: "62704",
        },
      };

      const result = await api.post("/api/users/signup").send(userData);

      expect(result.status).toBe(201);
      expect(result.body).toHaveProperty("token");

      // Extra check: user is actually saved in DB
      const savedUser = await User.findOne({ username: userData.username });
      expect(savedUser).not.toBeNull();
    });

    it("❌ should return an error with invalid password", async () => {
      const userData = {
        name: "Bob Martinez",
        username: "bobmart",
        password: "short", // too short, should fail validation
        phone_number: "1234567890",
        gender: "male",
        date_of_birth: "1985-09-30",
        role: "user",
        address: {
          street: "456 Oak Avenue",
          city: "Austin",
          state: "Texas",
          zipCode: "73301",
        },
      };

      const result = await api.post("/api/users/signup").send(userData);

      expect(result.status).toBe(400);
      expect(result.body).toHaveProperty("error");
    });
  });

  describe("POST /api/users/login", () => {
    it("✅ should login a user with valid credentials", async () => {
      // First signup
      await api.post("/api/users/signup").send({
        name: "Charlie Kim",
        username: "charliek",
        password: "SecretPass789!",
        phone_number: "09-123-47890",
        gender: "non-binary",
        date_of_birth: "1995-12-10",
        role: "moderator",
        address: {
          street: "789 Pine Lane",
          city: "Seattle",
          state: "Washington",
          zipCode: "98101",
        },
      });

      // Then login
      const result = await api.post("/api/users/login").send({
        username: "charliek",
        password: "SecretPass789!",
      });

      expect(result.status).toBe(200);
      expect(result.body).toHaveProperty("token");
    });

    it("❌ should return an error with wrong password", async () => {
      // First signup
      await api.post("/api/users/signup").send({
        name: "David Lee",
        username: "davidl",
        password: "CorrectPass123!",
        phone_number: "09-555-12345",
        gender: "male",
        date_of_birth: "1992-07-20",
        role: "user",
      });

      // Try login with wrong password
      const result = await api.post("/api/users/login").send({
        username: "davidl",
        password: "wrongpassword",
      });

      expect(result.status).toBe(400);
      expect(result.body).toHaveProperty("error");
    });
  });
});

// Close DB connection after all tests
afterAll(async () => {
  await mongoose.connection.close();
});
