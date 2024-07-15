const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config.js");

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

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
    const newUser = new User({ name, email, password: hashedPassword, role });
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
    const { name, profile_picture } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, profile_picture, updated_at: Date.now() },
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

// const Requests = require("../models/Request");
// var nodemailer = require("nodemailer");
// var smtpTransport = require("nodemailer-smtp-transport");
// require("dotenv").config();

// const register = (req, res, next) => {
//   const requests = new Requests({
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.email,
//     role: req.body.role,
//   });
//   requests
//     .save()
//     .then((data) => {
//       mailer("swagatikapanda29@gmail.com");
//       res.send(data);
//       console.log(data);
//     })
//     .catch((error) => {
//       res.status(500).json({
//         error: error,
//       });
//     });
// };

// const login = (req, res) => {};

// const getUserProfile = (req, res) => {};

// const updateUserProfile = (req, res) => {};

// const deleteUserProfile = (req, res) => {};

// const mailer = (email) => {
//   console.log(email);
//   var transport = nodemailer.createTransport({
//     service: "Gmail",

//     auth: {
//       user: "info.ngohub@gmail.com",
//       pass: "vizkotdursgipnru",
//     },
//   });

//   var mailOptions = {
//     from: "info.ngohub@gmail.com",
//     to: email,
//     //subject: otp,
//     subject: "Registration Successful",
//     text:
//       "You have been successfully registred into NGOHUB. \n\n" +
//       "\n\n\n" +
//       "Thank you.\n",
//   };

//   transport.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("Email sent:" + info.response);
//     }
//   });
// };

// const getRequestByNgo = (req, res) => {
//   Requests.find({ ngo_id: req.params.id })
//     .then((data) => {
//       if (!data) {
//         return res.status(404).send({
//           message: "session not found with id " + req.params.id,
//         });
//       }
//       res.send(data);
//     })
//     .catch((err) => {
//       if (err.kind === "ObjectId") {
//         return res.status(404).send({
//           message: "ngo not found with id " + req.params.id,
//         });
//       }
//       return res.status(500).send({
//         message: "error retrieving ngo with id " + req.params.id,
//       });
//     });
// };

// const updateRequest = (req, res) => {
//   Requests.findOne({ _id: req.params.id })
//     .then((note) => {
//       console.log(note);
//       let objToUpdate = {
//         Status: req.body.Status,
//       };
//       Requests.findByIdAndUpdate(note._id, objToUpdate, { new: true })
//         .then((note) => {
//           if (!note) {
//             return res.status(404).send({
//               message: "Note not found with id " + req.params.id,
//             });
//           }
//           res.send(note);
//         })
//         .catch((err) => {
//           if (err.kind === "ObjectId") {
//             return res.status(404).send({
//               message: "Therapist not found with id " + req.params.id,
//             });
//           }
//           return res.status(500).send({
//             message: "Error updating note with id " + req.params.id,
//           });
//         });
//     })
//     .catch((err) => {
//       if (err.kind === "ObjectId") {
//         return res.status(404).send({
//           message: "Therapist not found with id " + req.params.id,
//         });
//       }
//       return res.status(500).send({
//         message: "Error retrieving Therapist with id " + req.params.id,
//       });
//     });
// };

// const getAllNgos = (req, res) => {
//   Ngos.find()
//     .then((note) => {
//       res.send(note);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || "Some error occurred while retrieving ngos.",
//       });
//     });
// };

// module.exports = {
//   register,
//   login,
//   getUserProfile,
//   updateUserProfile,
//   deleteUserProfile,
//   getRequestByNgo,
//   updateRequest,
// };
