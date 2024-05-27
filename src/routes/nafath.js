const express = require("express");
const { upload } = require("../middlewares/upload");
const advancedResults = require("../middlewares/advanceResults");
const {
  createSession,getStatus
} = require("../controllers/nafath");

const router = express.Router();
router.post(
  "/createSession",
  createSession
);
router.get(
  "/getStatus",
  getStatus
)

module.exports = router;