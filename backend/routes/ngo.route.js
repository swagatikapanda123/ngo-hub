const express = require("express");
const router = express.Router();
const controller = require("../controllers/ngo.controller.js");

router.post("/create", controller.create);
router.get("/getAllNgos", controller.getAllNgos);
router.get("/ngoByLocation/:location", controller.getNgosByLocation);
router.get("/ngoBySector/:sector", controller.getNgosBySector);
router.post("/login", controller.login);

module.exports = router;
