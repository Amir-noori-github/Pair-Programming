require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");

const connectDB = require("./config/db");
const propertyRouter = require("./routes/propertyRouter");
const userRouter = require("./routes/userRouter");
const { unknownEndpoint, errorHandler } = require("./middleware/customMiddleware");

// Middlewares
app.use(cors());
app.use(express.json());

// Connect to database
connectDB();

// Routes
app.use("/api/properties", propertyRouter);
app.use("/api/users", userRouter);

// Error handling
app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;