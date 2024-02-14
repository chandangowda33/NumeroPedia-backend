const express = require("express");
const viewController = require("./../controller/viewController");

const router = express.Router();

router.route("/").get(viewController.getWelcome);
router.route("/getReport").get(viewController.getReport);
module.exports = router;
