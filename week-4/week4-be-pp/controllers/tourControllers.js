// tourControllers.js

const Tour = require("../models/tourmModel.js");

const getAllTours = (req, res) => {
    res.json(Tour.getAll());
};

const createTour = (req, res) => {
    const { name, info, image, price } = req.body;
    const newTour = Tour.addOne(name, info, image, price);
    if (newTour) {
        res.status(201).json(newTour);
    } else {
        res.status(500).json({ message: "Fail to create tour" });
    }
};

const getTourById = (req, res) => {
    const tourId = req.params.tourId;
    const tour = Tour.findById(tourId);
    if (tour) {
        res.json(tour);
    } else {
        res.status(404).json({ message: "Tour not found" });
    }
};

const updateTour = (req, res) => {
    const tourId = req.params.tourId;
    const updatedData = req.body;
    const updatedTour = Tour.updateOneById(tourId, updatedData);
    if (updatedTour) {
        res.json(updatedTour);
    } else {
        res.status(404).json({ message: "Tour not found" });
    }
};

const deleteTour = (req, res) => {
    const tourId = req.params.tourId;
    const isDeleted = Tour.deleteOneById(tourId);
    if (isDeleted) {
        res.status(204).send();
    } else {
        res.status(404).json({ message: "Tour not found" });
    }
};

module.exports = {
    getAllTours,
    getTourById,
    createTour,
    updateTour,
    deleteTour,
};
