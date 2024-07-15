const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller.js");
const authMiddleware = require("../middleware/authMiddleware");

// Register User: POST /api/users/register
// 	Input: name, email, password, role
// 	Output: User object

router.post("/register", controller.registerUser);

// Login User: POST /api/users/login
// 	Input: email, password
// 	Output: JWT token

router.post("/login", controller.loginUser);

// Get user profile
router.get("/:id", authMiddleware, controller.getUserProfile);

// Update user profile
router.put("/:id", authMiddleware, controller.updateUserProfile);

// Delete user
router.delete("/:id", authMiddleware, controller.deleteUser);

module.exports = router;
