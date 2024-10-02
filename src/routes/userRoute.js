const express = require('express')
const router = express.Router()

// Importing middlewares
const verifyJWT = require('../middlewares/verifyJWT')

// Importing controllers
const userController = require('../controllers/userController')

// Defining Routes
router.get('/oneUser/:email', verifyJWT, userController.getOneUser)
router.get('/', verifyJWT, userController.getUsers)
router.patch('/update', verifyJWT, userController.updateUser)
router.patch('/resetPassword', verifyJWT, userController.resetPassword)
router.delete('/delete', verifyJWT, userController.deleteUser)

module.exports = router