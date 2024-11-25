const express= require('express')
const router = express.Router()

// Importing middlewares
const verifyJWT = require('../middlewares/verifyJWT')

// Importing controllers
const companyController = require('../controllers/companyController')

// Defining Routes
router.get('/getOneCompany/:companyId', companyController.getOneCompany)
router.get('/totalPlaced/:companyId', companyController.totalPlaced)
router.get('/getFeedback/:companyId', companyController.getFeedback)
router.post('/addFeedback', verifyJWT, companyController.addFeedback)
router.get('/', verifyJWT, companyController.getCompanies)
router.get('/getCategories/:companyId', companyController.getCategories)
router.post('/add', verifyJWT, companyController.createCompany)
router.put('/update/', verifyJWT, companyController.updateCompany)
router.delete('/delete/', verifyJWT, companyController.deleteCompany)

module.exports = router