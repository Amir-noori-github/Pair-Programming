const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userControllers');


// GET /users
router.get('/', getAllUsers);

router.use(auth);
// POST /users
router.post('/', createUser);

// GET /users/:carId
router.get('/:userId', getUserById);

// PUT /users/:carId
router.put('/:userId', updateUser);

// DELETE /users/:carId
router.delete('/:userId', deleteUser);

module.exports = router;
