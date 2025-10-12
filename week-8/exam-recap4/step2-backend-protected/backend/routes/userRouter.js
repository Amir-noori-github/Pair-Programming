const express = require("express");
const router = express.Router();

const { signupUser, loginUser, getMe } = require("../controllers/userControllers");
const requireAuth = require("../middleware/requireAuth");


router.post("/signup", signupUser);

router.post("/login", loginUser);

router.get("/me", requireAuth, getMe);

module.exports = router;