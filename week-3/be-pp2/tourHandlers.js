// tourHandlers.js
const Tour = require("./tourLib");

const getAllTours = (req, res) => {
  res.json(Tour.getAll());
};

const createTour = (req, res) => {
  const { name, info, image, price } = req.body;
  const newTour = Tour.addOne(name, info, image, price);

  if (newTour) {
    res.status(201).json(newTour);
  } else {
    res.status(400).json({ message: "Invalid tour data" });
  }
};

const getTourById = (req, res) => {
  const tour = Tour.findById(req.params.tourId);
  if (tour) {
    res.json(tour);
  } else {
    res.status(404).json({ message: "Tour not found" });
  }
};

const updateTour = (req, res) => {
  const updated = Tour.updateOneById(req.params.tourId, req.body);
  if (updated) {
    res.json(updated);
  } else {
    res.status(404).json({ message: "Tour not found" });
  }
};

const deleteTour = (req, res) => {
  const deleted = Tour.deleteOneById(req.params.tourId);
  if (deleted) {
    res.json({ message: "Tour deleted successfully" });
  } else {
    res.status(404).json({ message: "Tour not found" });
  }
};

module.exports = {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour
};
