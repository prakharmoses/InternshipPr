const express = require('express')
const router = express.Router()

// Importing middlewares
const verifyJWT = require('../middlewares/verifyJWT')

// Importing controllers
const userController = require('../controllers/userController')

// Defining Routes
router.get('/oneUser', userController.getOneUser)
router.get('/', verifyJWT, userController.getUsers)
router.put('/update', verifyJWT, userController.updateUser)
router.put('/updateRole', verifyJWT, userController.updateRole)
router.delete('/delete', verifyJWT, userController.deleteUser)

module.exports = router