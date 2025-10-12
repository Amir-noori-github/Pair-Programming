const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app"); // Express app (already connects to DB)
const api = supertest(app);
const Property = require("../models/propertyModel");
const User = require("../models/userModel");

// Seed data
const properties = [
  {
    title: "Florida Condo",
    type: "Condo",
    description: "Condo on top of Florida area.",
    price: 4920,
    location: {
      address: "florida street 1",
      city: "Florida",
      state: "FL",
      zipCode: "00230",
    },
    squareFeet: 1000,
    yearBuilt: 2024,
  },
  {
    title: "New York Condo",
    type: "Condo",
    description: "Condo on top of New York area.",
    price: 156730,
    location: {
      address: "new york street 1",
      city: "New York",
      state: "NY",
      zipCode: "00230",
    },
    squareFeet: 1000,
    yearBuilt: 2024,
  },
];

let token = null;

// Create a user and get a token before all tests
beforeAll(async () => {
  await User.deleteMany({});
  const result = await api.post("/api/users/signup").send({
    name: "John Doe",
    username: "johndoe",
    password: "StrongPass123!",
    phone_number: "1234567890",
    gender: "Male",
    date_of_birth: "1990-01-01",
    role: "admin",
  });
  token = result.body.token;
});

describe("Protected Property Routes", () => {
  beforeEach(async () => {
    await Property.deleteMany({});
    await Promise.all([
      api
        .post("/api/properties")
        .set("Authorization", "Bearer " + token)
        .send(properties[0]),
      api
        .post("/api/properties")
        .set("Authorization", "Bearer " + token)
        .send(properties[1]),
    ]);
  });

  // ---------------- GET ----------------
  it("should return all properties as JSON when GET /api/properties is called", async () => {
    const response = await api
      .get("/api/properties")
      .set("Authorization", "Bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toHaveLength(properties.length);
  });

  it("should return 401 if no token is provided", async () => {
    await api.get("/api/properties").expect(401);
  });

  // ---------------- POST ----------------
  it("should create one property when POST /api/properties is called", async () => {
    const newProperty = {
      title: "Miami Condo",
      type: "Condo",
      description: "Condo on top of Miami area.",
      price: 13252,
      location: {
        address: "miami street 1",
        city: "Miami",
        state: "MI",
        zipCode: "00230",
      },
      squareFeet: 1000,
      yearBuilt: 2024,
    };

    const response = await api
      .post("/api/properties")
      .set("Authorization", "Bearer " + token)
      .send(newProperty)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    expect(response.body.title).toBe(newProperty.title);
  });

  // ---------------- GET by ID ----------------
  it("should return one property by ID", async () => {
    const property = await Property.findOne();
    const response = await api
      .get(`/api/properties/${property._id}`)
      .set("Authorization", "Bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body.title).toBe(property.title);
  });

  it("should return 404 for a non-existing property ID", async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    await api
      .get(`/api/properties/${nonExistentId}`)
      .set("Authorization", "Bearer " + token)
      .expect(404);
  });

  // ---------------- PUT ----------------
  it("should update one property by ID", async () => {
    const property = await Property.findOne();
    const updatedProperty = {
      description: "Updated description",
      type: "Contract",
    };

    const response = await api
      .put(`/api/properties/${property._id}`)
      .set("Authorization", "Bearer " + token)
      .send(updatedProperty)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body.description).toBe(updatedProperty.description);

    const updatedPropertyCheck = await Property.findById(property._id);
    expect(updatedPropertyCheck.type).toBe(updatedProperty.type);
  });

  it("should return 400 for invalid property ID when PUT /api/properties/:id", async () => {
    const invalidId = "12345";
    await api
      .put(`/api/properties/${invalidId}`)
      .set("Authorization", "Bearer " + token)
      .send({})
      .expect(400);
  });

  // ---------------- DELETE ----------------
  it("should delete one property by ID", async () => {
    const property = await Property.findOne();
    await api
      .delete(`/api/properties/${property._id}`)
      .set("Authorization", "Bearer " + token)
      .expect(204);

    const deletedPropertyCheck = await Property.findById(property._id);
    expect(deletedPropertyCheck).toBeNull();
  });

  it("should return 400 for invalid property ID when DELETE /api/properties/:id", async () => {
    const invalidId = "12345";
    await api
      .delete(`/api/properties/${invalidId}`)
      .set("Authorization", "Bearer " + token)
      .expect(400);
  });
});

// Close DB connection once after all tests
afterAll(async () => {
  await mongoose.connection.close();
});
