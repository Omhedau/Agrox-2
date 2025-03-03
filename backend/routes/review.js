const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");

const {
  createReview,
  getAllReviews,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

router.get("/:id", getAllReviews);
router.post("/", validateToken, createReview);
router.put("/:id", validateToken, updateReview);
router.delete("/:id", validateToken, deleteReview);

module.exports = router;
