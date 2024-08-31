const asyncHandler = require('express-async-handler');

// Importing models
const Company = require('../models/company');

// @desc   Get all companies
// @route  GET /companies
// @access Public
const getCompanies = asyncHandler(async (req, res) => {
    const companies = await Company.find().exec();
    res.status(200).json(companies);
});

// @desc   Get one company
// @route  GET /companies/oneCompany
// @access Public
const getOneCompany = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const company = await Company.findOne({ name }).exec();
    res.status(200).json(company);
})

// @desc   Create company
// @route  POST /companies/create
// @access Private
const createCompany = asyncHandler(async (req, res) => {
    const { name, description, location } = req.body;
    const newCompany = new Company({
        name,
        description,
        location,
    });
    await newCompany.save();
    res.status(201).json(newCompany);
})

// @desc   Update company
// @route  PUT /companies/update
// @access Private
const updateCompany = asyncHandler(async (req, res) => {
    const { name, description, location } = req.body;
    const updatedCompany = await Company.findOne({ name }).exec();
    updatedCompany.description = description;
    updatedCompany.location = location;
    await updatedCompany.save();
    res.status(200).json(updatedCompany);
})

// @desc   Delete company
// @route  DELETE /companies/delete
// @access Private
const deleteCompany = asyncHandler(async (req, res) => {
    const { name } = req.body;
    await Company.findOneAndDelete({ name }).exec();
    res.status(204).json({ message: 'No content' });
})

module.exports = {
    getCompanies,
    getOneCompany,
    createCompany,
    updateCompany,
    deleteCompany
}