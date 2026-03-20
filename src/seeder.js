require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const User = require("./models/user");
const Room = require("./models/rooms");
const Booking = require("./models/bookings");

const users = [
    { name: "Alice Smith", email: "alice@example.com", password: "password123", phone: "+2347011111111" },
    { name: "Bob Johnson", email: "bob@example.com", password: "password123", phone: "+2347022222222" },
];

const rooms = [
    { name: "Blue Room", available: true, pricePerNight: 150, description: "Sea-side view room" },
    { name: "Green Room", available: true, pricePerNight: 120, description: "Garden view suite" },
    { name: "Red Room", available: true, pricePerNight: 100, description: "Standard city room" },
];

const seed = async () => {
    try {
        await connectDB();

        await Booking.deleteMany();
        await Room.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);
        const createdRooms = await Room.insertMany(rooms);

        console.log("Seeded users:", createdUsers.map((u) => u.email));
        console.log("Seeded rooms:", createdRooms.map((r) => r.name));

        // sample booking using first user and first room:
        const sampleBooking = await Booking.create({
            user: createdUsers[0]._id,
            room: createdRooms[0]._id,
            status: "confirmed",
        });

        await Room.findByIdAndUpdate(createdRooms[0]._id, { available: false });

        console.log("Seeded booking:", sampleBooking._id);
        console.log("Seeding complete.");
        process.exit();
    } catch (error) {
        console.error("Seeding failed", error);
        process.exit(1);
    }
};

seed();
