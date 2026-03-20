const express = require("express");
const bookingController = require("../controller/booking");

const router = express.Router();
router.post("/book-room", bookingController.bookRoom);
router.get("/bookings", bookingController.getBookings);
router.get("/bookings/stats", bookingController.getBookingStats);

module.exports = router;