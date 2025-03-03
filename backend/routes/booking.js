const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");
const { getBookings, getBooking, addBooking, updateBooking, deleteBooking } = require("../controllers/bookingController");

console.log("booking.js");

router.use(validateToken);

router.get("/all", getBookings);
router.post("/", addBooking);
router.get("/:id", getBooking);
router.put("/:id", updateBooking);
router.delete("/:id", deleteBooking);

module.exports = router;
