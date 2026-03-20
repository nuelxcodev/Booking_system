const Booking = require("../models/bookings");
const Room = require("../models/rooms");
const mongoose = require("mongoose");

// POST /book-room
exports.bookRoom = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { userId, roomId } = req.body;

    // Validation
    if (!userId || !roomId) {
      return res.status(400).json({ message: "userId and roomId are required" });
    }

    const room = await Room.findById(roomId).session(session);

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    if (!room.available) {
      return res.status(400).json({ message: "Room not available" });
    }

    const booking = await Booking.create(
      [
        {
          user: userId,
          room: roomId,
        },
      ],
      { session }
    );

    room.available = false;
    await room.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: "Booking successful",
      booking: booking[0],
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

// GET /bookings
exports.getBookings = async (req, res, next) => {
  try {
    const { status } = req.query;

    const filter = {};
    if (status) {
      filter.status = status;
    }

    const bookings = await Booking.find(filter);

    const formatted = bookings.map((b) => ({
      id: b._id,
      user: b.user,
      room: b.room,
      status: b.status,
      createdAt: b.createdAt,
    }));

    res.json(formatted);
  } catch (error) {
    next(error);
  }
};


// GET /bookings/stats
exports.getBookingStats = async (req, res, next) => {
  try {
    const stats = await Booking.aggregate([
      {
        $group: {
          _id: "$room",
          totalBookings: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "rooms",
          localField: "_id",
          foreignField: "_id",
          as: "room",
        },
      },
      {
        $unwind: "$room",
      },
      {
        $project: {
          _id: 0,
          roomId: "$room._id",
          roomName: "$room.name",
          totalBookings: 1,
        },
      },
    ]);

    res.status(200).json(stats);
  } catch (error) {
    next(error);
  }
};
