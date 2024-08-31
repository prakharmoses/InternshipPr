const express = require('express')
const router = express.Router()

// Importing middlewares
const verifyJWT = require('../middlewares/verifyJWT')

// Importing controllers
const courseController = require('../controllers/courseController')

// Defining Routes
router.get('/', courseController.getCourses)
router.get('/:id', verifyJWT, courseController.getOneCourse)
router.post('/add', verifyJWT, courseController.createCourse)
router.put('/update', verifyJWT, courseController.updateCourse)
router.delete('/delete', verifyJWT, courseController.deleteCourse)

module.exports = router