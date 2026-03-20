const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  pricePerNight: {
    type: Number,
    default: 0,
  },
  description: String,
});

module.exports = mongoose.model("Room", roomSchema);