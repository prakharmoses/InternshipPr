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

    const foundUser = await User.findOne({ email }).exec();
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
                "role": foundUser.role,
            }
        },
        process.env.JWT_SECRET,
        { expiresIn: '10m' }
    )

    // Generate refresh token
    const refreshToken = jwt.sign(
        {
            "UserInfo": {
                "email": foundUser.email,
            }
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    )

    // Create secure cookie with refresh token
    res.cookie('jwt', refreshToken, {
        httpOnly: true,                  // Accessible only by web server
        secure: true,                    // https only
        sameSite: 'None',
        maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days
    })

    // Send access token in response
    res.status(200).json({ accessToken })
})

// @desc   Refresh token
// @route  GET /auth/refresh
// @access Public - because access token has expired
const refresh = asyncHandler(async (req, res) => {
    // Get refresh token from request cookies
    const cookies = req.cookies;

    // Check if refresh token exists
    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' });
    const refreshToken = cookies.jwt;

    // Verify refresh token
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async (err, decoded) => {
            if (err) {
                if (err) return res.status(403).json({ message: 'Forbidden' });
                const foundUser = await User.findOne({ email: decoded.email }).exec();

                if (!foundUser) return res.status(401).json({ message: 'Unauthorized' });

                // Generate new access token
                const accessToken = jwt.sign(
                    {
                        "UserInfo": {
                            "email": foundUser.email,
                            "role": foundUser.role,
                        },
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: '10m' }
                )

                res.status(200).json({ accessToken });
            }
        })
    )

    // Get user from database
    // Generate new access token
    // Send new access token
})

// @desc   Logout user
// @route  POST /auth/logout
// @access Private
const logout = asyncHandler(async (req, res) => {
    // Get refresh token from request cookies
    const cookies = req.cookies;

    // Check if refresh token exists
    if (!cookies?.jwt) return res.status(204).json({ message: 'No content' });

    res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'None'})
    res.status(200).json({ message: 'Cookies cleared' });
})

module.exports = {
    login,
    refresh,
    logout,
}