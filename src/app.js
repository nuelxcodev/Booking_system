require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const bookingRoutes = require("./routes/bookings")
const uploadRoutes = require("./routes/fileupload")
const userRoutes = require("./routes/users")
const roomRoutes = require("./routes/rooms")
const { default: errorHander } = require("./middlewares/errorhandler");

const app = express();

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api", bookingRoutes);
app.use("/api", uploadRoutes);
app.use("/api", userRoutes);
app.use("/api", roomRoutes);

app.use(errorHander)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});