const express = require("express");
const numeroscopeController = require("./../controller/numeroscopeController");

const router = express.Router();

router.route("/DOB/:DOB").get(numeroscopeController.getReport);
router.route("/:pattern").get(numeroscopeController.getNumoTraits);
router.route("/rajyog/:pattern").get(numeroscopeController.getRajyog);
router.route("/combination/:pattern").get(numeroscopeController.getCombination);
module.exports = router;
