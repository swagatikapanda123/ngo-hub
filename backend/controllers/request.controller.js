const Requests = require("../models/Request");

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
  });
  requests
    .save()
    .then((data) => {
      res.send(data);
      console.log(data);
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
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
