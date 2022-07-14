const Requests = require("../models/Request");
var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");
require("dotenv").config();

const create = (req, res, next) => {
  const requests = new Requests({
    Name: req.body.Name,
    Address: req.body.Address,
    Email: req.body.Email,
    Phone: req.body.Phone,
    State: req.body.State,
    District: req.body.District,
    Status: "requested",
    Request_date: req.body.Request_date,
    Description: req.body.Description,
    NgoDetails: req.body.NgoDetails,
    ngo_id: req.body.ngo_id,
  });
  requests
    .save()
    .then((data) => {
      mailer("swagatikapanda29@gmail.com");
      res.send(data);
      console.log(data);
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};

const mailer = (email) => {
  console.log(email);
  var transport = nodemailer.createTransport({
    service: "Gmail",

    auth: {
      user: "info.ngohub@gmail.com",
      pass: "vizkotdursgipnru",
    },
  });

  var mailOptions = {
    from: "info.ngohub@gmail.com",
    to: email,
    //subject: otp,
    subject: "New Request from NGOHUB",
    text:
      "You are receiving this because someone has requested the reset of the password for your account.\n\n" +
      "Please enter the following code  to complete the process:\n\n" +
      "\n\n\n" +
      "If you did not request this, please ignore this email and your password will remain unchanged.\n",
  };

  transport.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent:" + info.response);
    }
  });
};

const getRequestByNgo = (req, res) => {
  Requests.find({ ngo_id: req.params.id })
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "session not found with id " + req.params.id,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "ngo not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "error retrieving ngo with id " + req.params.id,
      });
    });
};

const getAllNgos = (req, res) => {
  Ngos.find()
    .then((note) => {
      res.send(note);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving ngos.",
      });
    });
};

module.exports = {
  create,
  getRequestByNgo,
};
