const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: String,
  available: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Room", roomSchema);