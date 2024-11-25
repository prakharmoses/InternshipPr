const express = require('express')
const router = express.Router()

// Importing middlewares
const verifyJWT = require('../middlewares/verifyJWT')

// Importing controllers
const courseController = require('../controllers/courseController')

// Defining Routes
router.get('/:number', courseController.getCourses)
router.get('/totalCourses', courseController.getTotalCourses)
router.get('/topCourses/:number', courseController.getTopCourses)
router.get('/:courseId', verifyJWT, courseController.getOneCourse)
router.post('/add', verifyJWT, courseController.createCourse)
router.patch('/update', verifyJWT, courseController.updateCourse)
router.delete('/delete', verifyJWT, courseController.deleteCourse)

module.exports = router