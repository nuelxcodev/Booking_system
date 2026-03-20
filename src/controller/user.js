const User = require("../models/user");

const createUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "name, email and password are required" });
        }

        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(409).json({ message: "Email already exists" });
        }

        const user = await User.create({ name, email, password });
        res.status(201).json({ message: "User created", user });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createUser,
};