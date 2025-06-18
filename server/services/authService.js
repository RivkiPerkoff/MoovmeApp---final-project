const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUserService = async ({ username, email, password, user_type }) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        const error = new Error('User already exists');
        error.status = 400;
        throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        user_type
    });

    const savedUser = await newUser.save();
    return { message: 'User registered successfully', user: savedUser };
};

const loginUserService = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
        const error = new Error('User not found');
        error.status = 404;
        throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        const error = new Error('Invalid credentials');
        error.status = 400;
        throw error;
    }

    const token = jwt.sign(
        { id: user._id, user_type: user.user_type },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    return { token, user };
};

module.exports = {
    registerUserService,
    loginUserService,
};
