const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        res.status(401);
        throw new Error('Unauthorized');
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
        if (err) {
            res.status(403);
            throw new Error('Forbidden');
        }

        req.userId = decoded.UserInfo.userId;
        req.email = decoded.UserInfo.email;
        req.roles = decoded.UserInfo.roles;
        next();
    })
}

module.exports = verifyJWT