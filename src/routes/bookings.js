const express = require("express");
const {
  bookRoom,
  getBookings,
  getBookingStats, // ✅ NEW
} = require("../controllers/booking.controller");

const router = express.Router();

router.post("/book-room", bookRoom);
router.get("/bookings", getBookings);


router.get("/bookings/stats", getBookingStats);

module.exports = router;