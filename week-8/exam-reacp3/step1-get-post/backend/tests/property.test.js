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
      zipCode: "00100"
    }
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
      zipCode: "02100"
    }
  }
];

describe("Property Controller", () => {
  beforeEach(async () => {
    await Property.deleteMany({});
    await Property.insertMany(properties);
  });

  afterAll(() => {
    mongoose.connection.close();
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
        zipCode: "01510"
      }
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
});
