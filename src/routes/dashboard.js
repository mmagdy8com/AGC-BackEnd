const express = require("express");
const { authenticate } = require("../middlewares/passport");
const { upload } = require("../middlewares/upload");
const advancedResults = require("../middlewares/advanceResults");
const {
  getData,
} = require("../controllers/dashboard");

const Bitaqty = require("../models/Bitaqty");
const Binance = require("../models/Binance");

const router = express.Router();
router.get(
  "/getDashboardData",
  authenticate,
  getData
);

module.exports = router;