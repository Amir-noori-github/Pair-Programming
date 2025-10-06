const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app"); // Express app
const api = supertest(app);
const Job = require("../models/jobModel");

// Seed data for tests
const jobs = [
  {
    title: "Frontend Developer",
    type: "Full-time",
    description: "Build and maintain React applications.",
    company: {
      name: "TechCorp",
      contactEmail: "hr@techcorp.com",
      contactPhone: "1234567890"
    }
  },
  {
    title: "Backend Engineer",
    type: "Contract",
    description: "Develop APIs using Node.js and MongoDB.",
    company: {
      name: "DevSolutions",
      contactEmail: "jobs@devsolutions.com",
      contactPhone: "0987654321"
    }
  }
];

// Reset the jobs collection before each test
beforeEach(async () => {
  await Job.deleteMany({});
  await Job.insertMany(jobs);
});

// ---------------- GET ----------------
describe("GET /api/jobs", () => {
  it("should return all jobs as JSON", async () => {
    const response = await api
      .get("/api/jobs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toHaveLength(jobs.length);
    expect(response.body[0].title).toBe(jobs[0].title);
  });
});

describe("GET /api/jobs/:id", () => {
  it("should return one job by ID", async () => {
    const job = await Job.findOne();
    const response = await api
      .get(`/api/jobs/${job._id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body.title).toBe(job.title);
  });

  it("should return 404 for a non-existing job ID", async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    await api.get(`/api/jobs/${nonExistentId}`).expect(404);
  });
});

// ---------------- POST ----------------
describe("POST /api/jobs", () => {
  it("should create a new job", async () => {
    const newJob = {
      title: "Full Stack Developer",
      type: "Full-time",
      description: "Work across frontend and backend.",
      company: {
        name: "CodeWorks",
        contactEmail: "apply@codeworks.com",
        contactPhone: "1122334455"
      }
    };

    const response = await api
      .post("/api/jobs")
      .send(newJob)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    expect(response.body.title).toBe(newJob.title);

    const jobsAfterPost = await Job.find({});
    expect(jobsAfterPost).toHaveLength(jobs.length + 1);
  });
});

// ---------------- PUT ----------------
describe("PUT /api/jobs/:id", () => {
  it("should update a job with partial data", async () => {
    const job = await Job.findOne();
    const updatedJob = { description: "Updated job description", type: "Part-time" };

    const response = await api
      .put(`/api/jobs/${job._id}`)
      .send(updatedJob)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body.description).toBe(updatedJob.description);

    const updatedJobCheck = await Job.findById(job._id);
    expect(updatedJobCheck.type).toBe(updatedJob.type);
  });

  it("should return 400 for invalid job ID", async () => {
    const invalidId = "12345";
    await api.put(`/api/jobs/${invalidId}`).send({}).expect(400);
  });
});

// ---------------- DELETE ----------------
describe("DELETE /api/jobs/:id", () => {
  it("should delete a job by ID", async () => {
    const job = await Job.findOne();
    await api.delete(`/api/jobs/${job._id}`).expect(204);

    const deletedJobCheck = await Job.findById(job._id);
    expect(deletedJobCheck).toBeNull();
  });

  it("should return 400 for invalid job ID", async () => {
    const invalidId = "12345";
    await api.delete(`/api/jobs/${invalidId}`).expect(400);
  });
});

// Close DB connection once after all tests
afterAll(async () => {
  await mongoose.connection.close();
});
