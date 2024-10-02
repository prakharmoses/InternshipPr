const express = require('express')
const router = express.Router()

// Importing middlewares
const loginLimiter = require('../middlewares/loginLimiter')
const verifyJWT = require('../middlewares/verifyJWT')

// Importing controllers
const authController = require('../controllers/authController')

// Defining Routes
router.post('/', loginLimiter, authController.login)
router.post('/register', authController.register)
router.get('/refresh', authController.refresh)
router.patch('/updateRole', verifyJWT, authController.updateRole)
router.post('/send-verification-email', verifyJWT, authController.sendVerificationEmail)
router.get('/verify-email/:token', authController.verifyEmail)
router.post('/logout', authController.logout)

module.exports = router