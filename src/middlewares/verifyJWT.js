const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.authorization;

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

        req.email = decoded.UserInfo.email;
        req.role = decoded.UserInfo.role;
        next();
    })
}

module.exports = verifyJWT