const express = require('express')
const router = express.Router()

// Importing middlewares
const verifyJWT = require('../middlewares/verifyJWT')

// Importing controllers
const userController = require('../controllers/userController')

// Defining Routes
router.get('/oneUser/:email', verifyJWT, userController.getOneUser)
router.get('/totalStudents', userController.getTotalStudents)
router.get('/get-email-verification-status/:email', verifyJWT, userController.getEmailVerificationStatus)
router.get('/', verifyJWT, userController.getUsers)
router.get('/getProfile-insights/:email', verifyJWT, userController.getProfileInsights)
router.patch('/update', verifyJWT, userController.updateUser)
router.patch('/updateProfile', verifyJWT, userController.updateUserProfile)
router.delete('/delete', verifyJWT, userController.deleteUser)

module.exports = router