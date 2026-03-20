const express = require("express");
const {
  bookRoom,
  getBookings,
  getBookingStats, 
} = require("../controller/booking");

const router = express.Router();

router.post("/book-room", bookRoom);
router.get("/bookings", getBookings);


router.get("/bookings/stats", getBookingStats);

module.exports = router;