const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app"); // Your Express app
const api = supertest(app);
const Property = require("../models/propertyModel");

const properties = [
  {
    title: "Modern Apartment",
    type: "Apartment",
    description: "Bright 2-bedroom apartment in Helsinki.",
    price: 1200,
    squareFeet: 850,
    yearBuilt: 2015,
    location: {
      address: "123 Main St",
      city: "Helsinki",
      state: "Uusimaa",
      zipCode: "00100",
    },
  },
  {
    title: "Cozy House",
    type: "House",
    description: "Family-friendly house with a garden.",
    price: 2500,
    squareFeet: 1600,
    yearBuilt: 2008,
    location: {
      address: "456 Oak Lane",
      city: "Espoo",
      state: "Uusimaa",
      zipCode: "02100",
    },
  },
];

describe("Property Controller", () => {
  beforeEach(async () => {
    await Property.deleteMany({});
    await Property.insertMany(properties);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  // Test GET /api/properties
  it("should return all properties as JSON when GET /api/properties is called", async () => {
    const response = await api
      .get("/api/properties")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toHaveLength(properties.length);
  });

  // Test POST /api/properties
  it("should create a new property when POST /api/properties is called", async () => {
    const newProperty = {
      title: "Luxury Condo",
      type: "Condo",
      description: "High-rise condo with sea view.",
      price: 3200,
      squareFeet: 1100,
      yearBuilt: 2020,
      location: {
        address: "789 Ocean Blvd",
        city: "Vantaa",
        state: "Uusimaa",
        zipCode: "01510",
      },
    };

    await api
      .post("/api/properties")
      .send(newProperty)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const propertiesAfterPost = await Property.find({});
    expect(propertiesAfterPost).toHaveLength(properties.length + 1);
    const propertyTitles = propertiesAfterPost.map((p) => p.title);
    expect(propertyTitles).toContain(newProperty.title);
  });

  // Test GET /api/properties/:id
  it("should return one property by ID when GET /api/properties/:id is called", async () => {
    const property = await Property.findOne();
    await api
      .get(`/api/properties/${property._id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("should return 404 for a non-existing property ID", async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    await api.get(`/api/properties/${nonExistentId}`).expect(404);
  });

  // Test PUT /api/properties/:id
  it("should update one property with partial data when PUT /api/properties/:id is called", async () => {
    const property = await Property.findOne();
    const updatedProperty = {
      description: "Updated description",
      price: 2700,
    };

    await api
      .put(`/api/properties/${property._id}`)
      .send(updatedProperty)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const updatedCheck = await Property.findById(property._id);
    expect(updatedCheck.description).toBe(updatedProperty.description);
    expect(updatedCheck.price).toBe(updatedProperty.price);
  });

  it("should return 400 for invalid property ID when PUT /api/properties/:id", async () => {
    const invalidId = "12345";
    await api.put(`/api/properties/${invalidId}`).send({}).expect(400);
  });

  // Test DELETE /api/properties/:id
  it("should delete one property by ID when DELETE /api/properties/:id is called", async () => {
    const property = await Property.findOne();
    await api.delete(`/api/properties/${property._id}`).expect(204);

    const deletedCheck = await Property.findById(property._id);
    expect(deletedCheck).toBeNull();
  });

  it("should return 400 for invalid property ID when DELETE /api/properties/:id", async () => {
    const invalidId = "12345";
    await api.delete(`/api/properties/${invalidId}`).expect(400);
  });
});
