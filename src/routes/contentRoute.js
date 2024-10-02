const express = require('express')
const router = express.Router()

// Importing middlewares
const verifyJWT = require('../middlewares/verifyJWT')

// Importing controllers
const contentController = require('../controllers/contentController')

// Defining Routes
router.get('/:contentId', verifyJWT, contentController.getContent)
router.post('/add', verifyJWT, contentController.createContent)
router.patch('/update', verifyJWT, contentController.updateContent)
router.delete('/delete', verifyJWT, contentController.deleteContent)
router.patch('/addComment', verifyJWT, contentController.addComment)
router.patch('/addCommentReply', verifyJWT, contentController.addCommentReply)

module.exports = router