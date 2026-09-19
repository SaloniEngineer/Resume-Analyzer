const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require('../models/blacklist.model');

async function registerUserController(req, res) {
    let { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "Please provide username, email and password"
        });
    }

    email = email.toLowerCase().trim();
    username = username.trim();

    const isUserAlreadyExist = await userModel.findOne({
        $or: [{ username }, { email }]
    });

    if (isUserAlreadyExist) {
        return res.status(400).json({
            message: "User already exist with this username or email address"
        });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await userModel.create({
        username,
        email,
        password: hash
    });

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    res.cookie("token", token);

    return res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
}

async function loginUserController(req, res) {
    let { email, password } = req.body;

    email = email.toLowerCase().trim();

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        });
    }

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    res.cookie("token", token);

    return res.status(200).json({
        message: "User logged in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
}

async function logoutUserController(req, res) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(400).json({
            message: "No token found"
        });
    }

    await tokenBlacklistModel.create({ token });

    res.clearCookie("token");

    return res.status(200).json({
        message: "User logged out successfully"
    });
}

async function getMeController(req, res) {
    const user = await userModel.findById(req.user.id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
}

module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController,
};