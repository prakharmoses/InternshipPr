const express= require('express')
const router = express.Router()

// Importing middlewares
const verifyJWT = require('../middlewares/verifyJWT')

// Importing controllers
const companyController = require('../controllers/companyController')

// Defining Routes
router.get('/:id', companyController.getOneCompany)
router.get('/', verifyJWT, companyController.getCompanies)
router.post('/add', verifyJWT, companyController.createCompany)
router.put('/update/', verifyJWT, companyController.updateCompany)
router.delete('/delete/', verifyJWT, companyController.deleteCompany)

module.exports = router