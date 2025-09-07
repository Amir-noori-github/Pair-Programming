// app.js
const express = require("express");
const app = express();

const {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour
} = require("./tourHandlers");

app.use(express.json());

// Routes
app.get("/tours", getAllTours);
app.post("/tours", createTour);
app.get("/tours/:tourId", getTourById);
app.put("/tours/:tourId", updateTour);
app.delete("/tours/:tourId", deleteTour);

const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
