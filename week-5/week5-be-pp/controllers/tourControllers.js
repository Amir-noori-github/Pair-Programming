const Tour = require("../models/tourModel");
const mongoose = require ("mongoose");

// GET /tours
const getAllTours = async(req, res) => {
  try {
    const tours = await Tour.find({}).sort({createdAt: -1})
    res.status(200).json(tours);
    
  } catch (error) {
    res.status(500).json({message: "Failed to retrives tours"});
    
  }
};

// POST /tours
const createTour = async (req, res) => {
  try {
    const newTour = await Tour.create({...req.body});
    res.status(201).json(newTour);
  }
   catch (error) {
   res.status(400).json({message: "Failed to create tour"});
   }

};
 
// GET /tours/:tourId
const getTourById = async (req, res) => {
  const {tourId} = req.params;
  if (!mongoose.Types.ObjectId.isValid(tourId)) {
    return res.ststus(400).json({message: "Invalid tour ID"});
  }
  try {
    const tour = await Tour.findById(tourId);
    if (tour) {
      res.status(200).json(tour);
    } else {
      res.status(404).json({message: "Tour not found"});
    }
    } catch (error) {
      res.status(500).json({message:"Failde to retrieve tour"});
    }
};

// PUT /tours/:tourId
const updateTour = async (req, res) => {
  const {tourId} = req.params;
  if (!mongoose.Types.ObjectId.isValid(tourId)) {
    return res.status(400).json({message: "Invalid tour ID"});
  }
  try {
    const updateTour = await Tour.findOneAndUpdate(
      {_id: tourId},
      {...req.body},
      {new: true}
    );
    if (updateTour) {
      res.status(200).json(updateTour);
    } else {
      res.status(400).json({message:"Tour not found"})
    }
  } catch (error) {
  res.status(500).json({message:"Failed to update tour"});
  }
};

// DELETE /tours/:tourId
const deleteTour = async (req, res) => {
  const {tourId} = req.params;
  if (!mongoose.Types.ObjectId.isValid(tourId)) {
    return res.ststus(400).json({message: "Invalid tour ID"});
  }
  try {
    const deleteTour = await Tour.findOneAndDelete({_id: tourId});
    if (deleteTour) {
      res.status(200).json({message:"Tour deleted successfully"});
    } else {
      res.ststus(404).json({message:"Tour not found"});
   }
  } catch (error) {
    res.status(500).json({message:"Failed to delete the tour"});
  }
};

module.exports = {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
};
