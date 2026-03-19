require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const bookingRoutes = require("./routes/booking.routes");
const uploadRoutes = require("./routes/upload.routes");
const errorMiddleware = require("./middleware/error.middleware");

const app = express();

connectDB();

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api", bookingRoutes);
app.use("/api", uploadRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});