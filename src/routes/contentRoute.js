const express = require('express')
const router = express.Router()

// Importing middlewares
const verifyJWT = require('../middlewares/verifyJWT')

// Importing controllers
const contentController = require('../controllers/contentController')

// Defining Routes
router.get('/:id', verifyJWT, contentController.getContents)
router.post('/add', verifyJWT, contentController.createContent)
router.put('/update', verifyJWT, contentController.updateContent)
router.delete('/delete', verifyJWT, contentController.deleteContent)

module.exports = router