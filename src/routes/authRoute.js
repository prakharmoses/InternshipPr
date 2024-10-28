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
router.get('/send-reset-password-email/:email', authController.sendResetPasswordEmail)
router.patch('/resetPassword/:jwtToken', authController.resetPassword)
router.patch('/updateRole', verifyJWT, authController.updateRole)
router.get('/send-verification-email/:email', verifyJWT, authController.sendVerificationEmail)
router.get('/verify-email/:token', authController.verifyEmail)
router.post('/logout', authController.logout)

module.exports = router