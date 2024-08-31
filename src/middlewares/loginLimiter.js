const rateLimit = require('express-rate-limit');
const { logEvents } = require('./logger');

const loginLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minutes
    max: 5,
    message: { message: 'Too many login attempts from this IP, please try again after 60 seconds' },
    handler: (req, res) => {
        logEvents(`Too many requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errorLog.log');
        res.status(options.statusCode).send(options.message);
    },
    standardHeaders: true,  // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false,  // Disable the `X-RateLimit-*` headers
})

module.exports = loginLimiter