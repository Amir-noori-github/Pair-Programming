const User = require("../models/userModel");
const mongoose = require ("mongoose");

// GET /tours
const getAllUsers = async(req, res) => {
  try {
    const users = await User.find({}).sort({createdAt: -1})
    res.status(200).json(users);
    
  } catch (error) {
    res.status(500).json({message: "Failed to retrives users"});
    
  }
};

// POST /tours
const createUser = async (req, res) => {
  try {
    const newUser = await User.create({...req.body});
    res.status(201).json(newUser);
  }
   catch (error) {
   res.status(400).json({message: "Failed to create user"});
   }

};
 
// GET /tours/:tourId
const getUserbyId = async (req, res) => {
  const {userId} = req.params;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({message: "Invalid user ID"});
  }
  try {
    const user = await User.findById(userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({message: "User not found"});
    }
    } catch (error) {
      res.status(500).json({message:"Failde to retrieve user"});
    }
};

// PUT /tours/:tourId
const updateUser = async (req, res) => {
  const {userId} = req.params;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({message: "Invalid user ID"});
  }
  try {
    const updateUser = await User.findOneAndUpdate(
      {_id: userId},
      {...req.body},
      {new: true}
    );
    if (updateUser) {
      res.status(200).json(updateUser);
    } else {
      res.status(400).json({message:"User not found"})
    }
  } catch (error) {
  res.status(500).json({message:"Failed to update user"});
  }
};

// DELETE /tours/:tourId
const deleteUser = async (req, res) => {
  const {userId} = req.params;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({message: "Invalid user ID"});
  }
  try {
    const deleteUser = await User.findOneAndDelete({_id: userId});
    if (deleteUser) {
      res.status(200).json({message:"User deleted successfully"});
    } else {
      res.status(404).json({message:"User not found"});
   }
  } catch (error) {
    res.status(500).json({message:"Failed to delete the user"});
  }
};

module.exports = {
  getAllUsers,
  getUserbyId,
  createUser,
  updateUser,
  deleteUser,
};
