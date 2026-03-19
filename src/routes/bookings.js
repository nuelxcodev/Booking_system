const express = require("express");
const {
  bookRoom,
  getBookings,
} = require("../controllers/booking.controller");

const router = express.Router();

router.post("/book-room", bookRoom);
router.get("/bookings", getBookings);

module.exports = router;