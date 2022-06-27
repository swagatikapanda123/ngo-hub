const Ngos = require("../models/Ngo");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const lodash = require("lodash");
const { JWT_SECRET, RESET_PASSWOED_KEY } = require("../config/config");

const create = (req, res, next) => {
  bcrypt.hash(req.body.Password, 10).then((hash) => {
    const ngos = new Ngos({
      Name: req.body.Name,
      Location: req.body.Location,
      Email: req.body.Email,
      Phone: req.body.Phone,
      Website: req.body.Website,
      Field: req.body.Field,
      State: req.body.State,
      District: req.body.District,
      Password: hash,
    });
    ngos
      .save()
      .then((ngo) => {
        res.send(ngo);
        console.log(ngo);
      })
      .catch((error) => {
        res.status(500).json({
          error: error,
        });
      });
  });
};

const getNgosByLocation = (req, res) => {
  console.log(req.params.location);
  Ngos.find({ Location: req.params.location })
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((error) => {
      return res.status(404).send({
        message: "Ngo not found with location " + req.params.location,
      });
    });
};

const getNgosBySector = (req, res) => {
  console.log(req.params.sector);
  Ngos.find()
    .then((data) => {
      // var picked = lodash.filter(data, (x) =>
      //   lodash.filter(x.Field, (i) => i.id === req.params.sector)
      // );
      var picked = [];

      data.forEach((element) => {
        var matched = lodash.filter(element.Field, (x) => {
          if (x.id === req.params.sector) {
            picked.push(element);
          }
        });
        //picked.push(matched);
      });
      // var sector = lodash.filter(picked, (item) => console.log(item));
      console.log(picked);
      res.send(picked);
    })
    .catch((error) => {
      return res.status(404).send({
        message: "Ngo not found with sector " + req.params.sector,
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

const getNgoById = (req, res) => {
  Ngos.findOne({ _id: req.params.id })
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

const update = (req, res) => {
  Sessions.findOne({ _id: req.params.sessionId })
    .then((note) => {
      console.log(note);
      let objToUpdate = {
        Status: req.body.Status,
      };
      Sessions.findByIdAndUpdate(note._id, objToUpdate, { new: true })
        .then((note) => {
          if (!note) {
            return res.status(404).send({
              message: "Note not found with id " + req.params.sessionId,
            });
          }
          res.send(note);
        })
        .catch((err) => {
          if (err.kind === "ObjectId") {
            return res.status(404).send({
              message: "Therapist not found with id " + req.params.sessionId,
            });
          }
          return res.status(500).send({
            message: "Error updating note with id " + req.params.sessionId,
          });
        });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Therapist not found with id " + req.params.sessionId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving Therapist with id " + req.params.sessionId,
      });
    });
};

const deleteSession = (req, res) => {
  Sessions.findOneAndUpdate(
    { sessionId: req.params.sessionId },
    { isActive: false, isDeleted: true },
    { new: true }
  )
    .then((note) => {
      console.log(note);
      res.json({ message: "Session Deleted SuccessFully." });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Session not found. ",
        });
      }
      return res.status(500).send({
        message: "Internal server error. ",
      });
    });
};

const login = (req, res, next) => {
  Ngos.findOne({ Email: req.body.Email })
    .then((ngo) => {
      if (!ngo) {
        return res.status(404).json({
          message: "This email id is not registered",
        });
      }
      bcrypt
        .compare(req.body.Password, ngo.Password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({
              message: "Incorrect password",
            });
          }
          const token = jwt.sign({ ngoId: ngo._id }, JWT_SECRET, {
            expiresIn: "24h",
          });
          res.status(200).json({
            ngoId: ngo._id,
            token: token,
            name: ngo.Name,
          });
        })
        .catch((errro) => {
          res.status(500).json({
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};

module.exports = {
  create,
  getAllNgos,
  getNgosByLocation,
  login,
  getNgosBySector,
  getNgoById,
};
