const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
} = require('../controllers/tourControllers');

// GET /tours
router.get('/', getAllTours);

router.use(auth);
// POST /tours
router.post('/', createTour);

// GET /tours/:carId
router.get('/:tourId', getTourById);

// PUT /tours/:carId
router.put('/:tourId', updateTour);

// DELETE /tours/:carId
router.delete('/:tourId', deleteTour);

module.exports = router;
