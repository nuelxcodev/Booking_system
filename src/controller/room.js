const Room = require("../models/rooms");

const createRoom = async (req, res, next) => {
    try {
        const { name, available } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Room name is required" });
        }

        const room = await Room.create({
            name,
            available: available === undefined ? true : available,
        });

        res.status(201).json({ message: "Room created", room });
    } catch (error) {
        next(error);
    }
};

const getRooms = async (req, res, next) => {
    try {
        const rooms = await Room.find();
        res.json(rooms);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createRoom,
    getRooms,
};