const express = require('express')
const router = express.Router()

// Importing middlewares
const loginLimiter = require('../middlewares/loginLimiter')

// Importing controllers
const authController = require('../controllers/authController')

// Defining Routes
router.post('/', loginLimiter, authController.login)
router.get('/refresh', authController.refresh)
router.post('/logout', authController.logout)

module.exports = router