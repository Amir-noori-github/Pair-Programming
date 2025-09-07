// feedbackHandlers.js

const Feedback = require("./feedbackLib");

const getAllFeedbacks = (req, res) => {
  res.json(Feedback.getAll());
};

const createFeedback = (req, res) => {
  const { sender, message, rating } = req.body;
  const newFeedback = Feedback.addOne(sender, message, rating);

  if (newFeedback) {
    res.status(201).json(newFeedback);
  } else {
    res.status(400).json({ message: "Invalid feedback data" });
  }
};

const getFeedbackById = (req, res) => {
  const feedback = Feedback.findById(req.params.feedbackId);
  if (feedback) {
    res.json(feedback);
  } else {
    res.status(404).json({ message: "Feedback not found" });
  }
};

const updateFeedback = (req, res) => {
  const updated = Feedback.updateOneById(req.params.feedbackId, req.body);
  if (updated) {
    res.json(updated);
  } else {
    res.status(404).json({ message: "Feedback not found" });
  }
};

const deleteFeedback = (req, res) => {
  const deleted = Feedback.deleteOneById(req.params.feedbackId);
  if (deleted) {
    res.json({ message: "Feedback deleted successfully" });
  } else {
    res.status(404).json({ message: "Feedback not found" });
  }
};

module.exports = {
  getAllFeedbacks,
  getFeedbackById,
  createFeedback,
  updateFeedback,
  deleteFeedback
};
