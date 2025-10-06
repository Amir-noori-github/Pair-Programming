const Property = require("../models/propertyModel");
const mongoose = require("mongoose");

// GET /properties
const getAllProperties = async (req, res) => {
  res.send("getAllProperties");
};

// POST /properties
const createProperty = async (req, res) => {
  res.send("createProperty");
};

// GET /properties/:propertyId
const getPropertyById = async (req, res) => {
  res.send("getPropertyById");
};

// PUT /properties/:propertyId
const updateProperty = async (req, res) => {
  res.send("updateProperty");
};

// DELETE /properties/:propertyId
const deleteProperty = async (req, res) => {
  res.send("deleteProperty");
};

module.exports = {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
};
