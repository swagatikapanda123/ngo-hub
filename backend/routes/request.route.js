const express = require("express");
const router = express.Router();
const controller = require("../controllers/request.controller.js");

router.post("/create", controller.create);
// router.get("/getAllNgos", controller.getAllNgos);
router.get("/requestByNgo/:id", controller.getRequestByNgo);
// router.get("/ngoBySector/:sector", controller.getNgosBySector);
router.post("/updateRequest/:id", controller.updateRequest);

module.exports = router;
