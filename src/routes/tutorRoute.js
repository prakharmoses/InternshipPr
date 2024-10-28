const express = require('express')
const router = express.Router()

// Importing middlewares
const verifyJWT = require('../middlewares/verifyJWT')

// Importing controllers
const tutorController = require('../controllers/tutorController')

// Defining Routes
router.get('/', tutorController.getTutors)
router.get('/totalTutors', tutorController.getTotalTutors)
router.get('/:email', verifyJWT, tutorController.getOneTutor)
router.post('/add', verifyJWT, tutorController.createTutor)
router.patch('/update', verifyJWT, tutorController.updateTutor)
router.delete('/delete', verifyJWT, tutorController.deleteTutor)

module.exports = router