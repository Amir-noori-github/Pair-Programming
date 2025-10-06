const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Job = require("../models/jobModel");
const User = require("../models/userModel");

let token = null;

// Seed job data
const jobs = [
  {
    title: "Frontend Developer",
    type: "Full-time",
    description: "Build React apps",
    company: {
      name: "TechCorp",
      contactEmail: "hr@techcorp.com",
      contactPhone: "1234567890"
    }
  },
  {
    title: "Backend Engineer",
    type: "Contract",
    description: "Build APIs",
    company: {
      name: "DevSolutions",
      contactEmail: "jobs@devsolutions.com",
      contactPhone: "0987654321"
    }
  }
];

// Create user and get token before all tests
beforeAll(async () => {
  await User.deleteMany({});
  const result = await api.post("/api/users/signup").send({
    name: "John Doe",
    email: "john@example.com",
    password: "R3g5T7#gh",
    phone_number: "1234567890",
    gender: "Male",
    date_of_birth: "1990-01-01",
    membership_status: "Inactive"
  });
  token = result.body.token;
});

describe("Protected Job Routes", () => {
  beforeEach(async () => {
    await Job.deleteMany({});
    const user = await User.findOne({ email: "john@example.com" });

    await Promise.all([
      api.post("/api/jobs").set("Authorization", "Bearer " + token).send({ ...jobs[0], user_id: user._id }),
      api.post("/api/jobs").set("Authorization", "Bearer " + token).send({ ...jobs[1], user_id: user._id })
    ]);
  });

  // ---------------- GET ----------------
  it("should return all jobs as JSON when GET /api/jobs is called", async () => {
    const response = await api
      .get("/api/jobs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toHaveLength(jobs.length);
  });

  // ---------------- POST ----------------
  it("should create one job when POST /api/jobs is called", async () => {
    const user = await User.findOne({ email: "john@example.com" });
    const newJob = {
      title: "Full Stack Developer",
      type: "Full-time",
      description: "Work across frontend and backend",
      company: {
        name: "CodeWorks",
        contactEmail: "apply@codeworks.com",
        contactPhone: "1122334455"
      },
      user_id: user._id
    };

    const response = await api
      .post("/api/jobs")
      .set("Authorization", "Bearer " + token)
      .send(newJob)
      .expect(201);

    expect(response.body.title).toBe(newJob.title);
  });

  // ---------------- GET by ID ----------------
  it("should return one job by ID", async () => {
    const job = await Job.findOne();
    const response = await api
      .get(`/api/jobs/${job._id}`)
      .set("Authorization", "Bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body.title).toBe(job.title);
  });

  // ---------------- PUT ----------------
  it("should update one job by ID", async () => {
    const job = await Job.findOne();
    const user = await User.findOne({ email: "john@example.com" });
    const updatedJob = {
      description: "Updated job description",
      type: "Part-time",
      user_id: user._id
    };

    const response = await api
      .put(`/api/jobs/${job._id}`)
      .set("Authorization", "Bearer " + token)
      .send(updatedJob)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body.description).toBe(updatedJob.description);

    const updatedJobCheck = await Job.findById(job._id);
    expect(updatedJobCheck.type).toBe(updatedJob.type);
  });

  // ---------------- DELETE ----------------
  it("should delete one job by ID", async () => {
    const job = await Job.findOne();
    await api
      .delete(`/api/jobs/${job._id}`)
      .set("Authorization", "Bearer " + token)
      .expect(204);

    const jobCheck = await Job.findById(job._id);
    expect(jobCheck).toBeNull();
  });
});

// Close DB connection once after all tests
afterAll(async () => {
  await mongoose.connection.close();
});
