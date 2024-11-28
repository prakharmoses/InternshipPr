const express = require('express')
const router = express.Router()

// Importing middlewares
const verifyJWT = require('../middlewares/verifyJWT')

// Importing controllers
const contentController = require('../controllers/contentController')

// Defining Routes
router.get('/getContent/:contentId', verifyJWT, contentController.getContent)
router.get('/getOtherContentOfCourse/:courseId', verifyJWT, contentController.getOtherContentOfCourse)
router.get('/getContentByCourse/:courseId', verifyJWT, contentController.getContentByCourse)
router.patch('/toggleLikeContent/:contentId', verifyJWT, contentController.toggleLikeContent)
router.get('/isLiked/:contentId', verifyJWT, contentController.isContentLiked)
router.post('/add', verifyJWT, contentController.createContent)
router.patch('/update', verifyJWT, contentController.updateContent)
router.delete('/delete', verifyJWT, contentController.deleteContent)
router.patch('/addComment', verifyJWT, contentController.addComment)
router.patch('/addCommentReply', verifyJWT, contentController.addCommentReply)
router.get('/getLikedContent/:userId', verifyJWT, contentController.getLikedContent)
router.get('/getCommentedContent/:userId', verifyJWT, contentController.getCommentedContent)

module.exports = router