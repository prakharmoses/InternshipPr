const express = require('express')
const router = express.Router()

// Importing middlewares
const verifyJWT = require('../middlewares/verifyJWT')

// Importing controllers
const tutorController = require('../controllers/tutorController')

// Defining Routes
router.get('/', tutorController.getTutors)
router.get('/:id', verifyJWT, tutorController.getOneTutor)
router.post('/add', verifyJWT, tutorController.createTutor)
router.put('/update', verifyJWT, tutorController.updateTutor)
router.delete('/delete', verifyJWT, tutorController.deleteTutor)

module.exports = router