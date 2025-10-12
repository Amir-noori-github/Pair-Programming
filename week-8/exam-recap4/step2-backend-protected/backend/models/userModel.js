// models/userModel.js
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: false,
    },
    profilePicture: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
    date_of_birth: {
      type: Date,
      required: false,
    },
    role: {
      type: String,
      default: "user",
    },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String },
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("User", userSchema);
