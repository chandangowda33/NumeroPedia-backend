const express = require("express");
const mulankController = require("./../controller/mulankController");

const router = express.Router();

router.route("/:mulankNumber").get(mulankController.getMulank);

module.exports = router;
