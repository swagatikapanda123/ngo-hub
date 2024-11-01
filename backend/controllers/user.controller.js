// const User = require("../models/user");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const config = require("../config/config.js");

// // Register a new user
// exports.registerUser = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;

//     // Validate role
//     if (!["NGO", "Volunteer", "Admin"].includes(role)) {
//       return res.status(400).json({ message: "Invalid role" });
//     }

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new user
//     const newUser = new User({ name, email, password: hashedPassword, role });
//     await newUser.save();

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// // Login user
// exports.loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     // Check if password is correct
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // Create JWT token
//     const token = jwt.sign(
//       { userId: user._id, role: user.role },
//       config.JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     res.status(200).json({ token, userId: user._id, role: user.role });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// // Get user profile
// exports.getUserProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id).select("-password");
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// // Update user profile
// exports.updateUserProfile = async (req, res) => {
//   try {
//     const { name, profile_picture } = req.body;
//     const user = await User.findByIdAndUpdate(
//       req.params.id,
//       { name, profile_picture, updated_at: Date.now() },
//       { new: true }
//     ).select("-password");

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// // Delete user
// exports.deleteUser = async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json({ message: "User deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config.js");

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role, state, city, pin, fields_of_work } =
      req.body;

    // Validate role
    if (!["NGO", "Volunteer", "Admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    let newUserData = { name, email, password: hashedPassword, role };

    // Add additional fields for NGOs
    if (role === "NGO") {
      if (!state || !city || !pin || !fields_of_work) {
        return res.status(400).json({
          message: "Please provide all required fields for NGO registration",
        });
      }
      newUserData = { ...newUserData, state, city, pin, fields_of_work };
    }

    const newUser = new User(newUserData);
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      config.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token, userId: user._id, role: user.role });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { name, profile_picture, State, City, Pin, fields_of_work } =
      req.body;

    // Update profile with NGO-specific fields if role is NGO
    const updatedData = { name, profile_picture };
    if (req.user.role === "NGO") {
      updatedData.State = State;
      updatedData.City = City;
      updatedData.Pin = Pin;
      updatedData.fields_of_work = fields_of_work;
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { ...updatedData, updated_at: Date.now() },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
