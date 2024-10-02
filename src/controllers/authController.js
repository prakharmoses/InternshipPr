const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');

// Importing models
const User = require('../models/user');

// @desc   Login user
// @route  POST /auth
// @access Public
const login = asyncHandler(async (req, res) => {
    // Get email and password from request body
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error('Email and password are required');
    }

    const foundUser = await User.findOne({ email }).collation({ locale: 'en', strength: 2 }).exec();
    if (!foundUser) {
        res.status(401);
        throw new Error('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
        res.status(401);
        throw new Error('Invalid email or password');
    }

    // Generate access token
    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "email": foundUser.email,
                "roles": foundUser.roles,
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '30m' }
    )

    // Generate refresh token
    const refreshToken = jwt.sign(
        { "email": foundUser.email },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    )

    // Create secure cookie with refresh token
    res.cookie('jwt', refreshToken, {
        httpOnly: true,                  // Accessible only by web server
        secure: true,                    // https only
        sameSite: 'None',
        maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days
    })

    // Send access token in response
    res.status(200).json({
        id: foundUser._id,
        avatar: foundUser.avatar,
        cover: foundUser.cover,
        accessToken: accessToken
    })
})

// @desc   Register user
// @route  POST /auth/register
// @access Public
const register = asyncHandler(async (req, res) => {
    // Get email and password from request body
    const { email, password, name, sex, confirmPassword } = req.body;

    if (!email || !password || !name || !confirmPassword) {
        res.status(400);
        throw new Error('Kindly provide all the fields!');
    }

    // Check if user exists
    const foundUser = await User.findOne({ email }).collation({ locale: 'en', strength: 2 }).exec();
    if (foundUser) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Check if password satisfies the constraints
    const PASS_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
    if (!PASS_REGEX.test(password)) {
        res.status(400);
        throw new Error('Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character');
    }

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
        res.status(400);
        throw new Error('Passwords do not match');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
        email,
        password: hashedPassword,
        name,
        sex: sex ? sex : 'O',
    })

    // Save user to database
    const savedUser = await newUser.save();

    // Generate access token
    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "userId": savedUser._id,
                "email": savedUser.email,
                "roles": savedUser.roles,
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '30m' }
    )

    // Generate refresh token
    const refreshToken = jwt.sign(
        { "email": savedUser.email },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    )

    // Create secure cookie with refresh token
    res.cookie('jwt', refreshToken, {
        httpOnly: true,                  // Accessible only by web server
        secure: true,                    // https only
        sameSite: 'None',
        maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days
    })

    // Send access token in response
    res.status(201).json({
        id: savedUser._id,
        avatar: savedUser.avatar,
        cover: savedUser.cover,
        accessToken: accessToken
    })
})

// @desc   Refresh token
// @route  GET /auth/refresh
// @access Public - because access token has expired
const refresh = asyncHandler(async (req, res) => {
    // Get refresh token from request cookies
    const cookies = req.cookies;

    // Check if refresh token exists
    if (!cookies?.jwt) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const refreshToken = cookies.jwt;

    // Verify refresh token
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' });
            // Get user from database
            const foundUser = await User.findOne({ email: decoded.email }).exec();

            if (!foundUser) return res.status(401).json({ message: 'Unauthorized' });

            // Generate new access token
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "userId": foundUser._id,
                        "email": foundUser.email,
                        "roles": foundUser.roles,
                    },
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30m' }
            )

            res.status(200).json({ accessToken });
        })
    )
})

// @desc   Update user role
// @route  PATCH /auth/updateRole
// @access Private
const updateRole = asyncHandler(async (req, res) => {
    const { email, roles } = req.body;

    // Check if email and role are provided
    if (!email || !roles) {
        res.status(400);
        throw new Error('Email and role are required');
    }

    // Check if role is valid
    if (roles && (!Array.isArray(roles) || roles.some(role => !['student', 'tutor', 'admin'].includes(role)))) {
        res.status(400);
        throw new Error('Invalid role');
    }

    // Check authorization
    if (req.email !== email) {
        res.status(403);
        throw new Error('Forbidden, authorization error.');
    }

    // Check if user exists
    const updatedUser = await User.findOne({ email }).collation({ locale: 'en', strength: 2 }).exec();
    if (!updatedUser) {
        res.status(401);
        throw new Error('User not found');
    }

    // Update the role
    updatedUser.roles = roles;
    await updatedUser.save();

    // Generate new access token
    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "userId": updatedUser._id,
                "email": updatedUser.email,
                "roles": updatedUser.roles,
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '30m' }
    )

    res.status(200).json({
        message: `Role update successfully to ${updatedUser.role}`,
        accessToken: accessToken
    });
})

// @desc   Send verification email
// @route  POST /users/send-verification-email
// @access Public
const sendVerificationEmail = asyncHandler(async (req, res) => {
    const { email } = req.body;

    // Check if email is provided
    if (!email) {
        res.status(400);
        throw new Error('Email is required');
    }

    // Check for the authorization
    if (req.email !== email) {
        res.status(403);
        throw new Error('Forbidden, authorization error.');
    }

    // Check if user exists
    const foundUser = await User.findOne({ email }).collation({ locale: 'en', strength: 2 }).exec();
    if (!foundUser) {
        res.status(401);
        throw new Error('User not found');
    }

    // Check if already verified
    if (foundUser.isEmailVerified) {
        res.status(400);
        throw new Error('Email already verified');
    }

    // Generate token
    const token = jwt.sign({ "email": email }, process.env.EMAIL_VERIFICATION_SECRET, { expiresIn: '1d' });

    // Send email
    const link = `http://localhost:5000/users/verify-email/${token}`;
    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: 'Email Verification',
        text: `Click on the link to verify your email: ${link}`
    }
    console.log('Transporter... ', transporter);

    await transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error sending email' });
        }
        res.status(200).json({ success: true, message: 'Verification email sent' });
    })
})

// @desc   Verify email
// @route  GET /users/verify-email/:token
// @access Public
const verifyEmail = asyncHandler(async (req, res) => {
    const { token } = req.params;

    // Check if token is provided
    if (!token) {
        res.status(400);
        throw new Error('Token is required');
    }

    // Decode token
    const decoded = jwt.verify(token, process.env.EMAIL_VERIFICATION_SECRET);
    const { email } = decoded;

    // Check if user exists
    const foundUser = await User.findOne({ email }).collation({ locale: 'en', strength: 2 }).exec();
    if (!foundUser) {
        res.status(401);
        throw new Error('User not found');
    }

    // Check if already verified
    if (foundUser.isEmailVerified) {
        res.status(400);
        throw new Error('Email already verified');
    }

    // Update user
    foundUser.isEmailVerified = true;
    await foundUser.save();

    res.status(200).redirect('http://localhost:3000');
})

// @desc   Logout user
// @route  POST /auth/logout
// @access Private
const logout = asyncHandler(async (req, res) => {
    // Get refresh token from request cookies
    const cookies = req.cookies;

    // Check if refresh token exists
    if (!cookies?.jwt) {
        return res.status(204).json({ message: 'No content' });
    }
    console.log("Here the cookie = ", cookies)
    res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'None' })
    res.status(200).json({ message: 'Cookies cleared' });
})

module.exports = {
    login,
    register,
    refresh,
    updateRole,
    sendVerificationEmail,
    verifyEmail,
    logout,
}