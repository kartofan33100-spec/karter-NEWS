const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

async function registerUser(req, res, next) {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: 'Please fill in all fields',
            });
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({
                message: 'Invalid email format',
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: 'Password must be at least 6 characters',
            });
        }

        const existingUser = await User.findOne({ email: email.toLowerCase().trim() });

        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists',
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username: username.trim(),
            email: email.toLowerCase().trim(),
            password: hashedPassword,
            avatar: '',
        });

        res.status(201).json({
            message: 'User registered successfully',
            token: generateToken(user._id),
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
                role: user.role,
            },
        });
    } catch (error) {
        next(error);
    }
}

async function loginUser(req, res, next) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Please fill in all fields',
            });
        }

        const user = await User.findOne({ email: email.toLowerCase().trim() });

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
            return res.status(401).json({
                message: 'Invalid password',
            });
        }

        res.status(200).json({
            message: 'Login successful',
            token: generateToken(user._id),
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
                role: user.role,
            },
        });
    } catch (error) {
        next(error);
    }
}

async function getCurrentUser(req, res, next) {
    try {
        res.status(200).json({
            user: {
                id: req.user._id,
                username: req.user.username,
                email: req.user.email,
                avatar: req.user.avatar,
                role: req.user.role,
            },
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    registerUser,
    loginUser,
    getCurrentUser,
};