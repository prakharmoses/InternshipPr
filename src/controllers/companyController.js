const asyncHandler = require('express-async-handler');

// Importing models
const Company = require('../models/company');

// @desc   Get all companies
// @route  GET /companies
// @access Public
const getCompanies = asyncHandler(async (req, res) => {
    const companies = await Company.find().exec();

    // If no companies found
    if (!companies) {
        res.status(404);
        throw new Error('No companies found');
    }

    res.status(200).json(companies);
});

// @desc   Get one company
// @route  GET /companies/oneCompany
// @access Public
const getOneCompany = asyncHandler(async (req, res) => {
    const { companyId } = req.params;

    // Check if companyId given
    if (!companyId) {
        res.status(400);
        throw new Error('Company ID is required');
    }

    const company = await Company.findById(companyId).exec();

    // If no company found
    if (!company) {
        res.status(404);
        throw new Error('Company not found');
    }

    res.status(200).json(company);
})

// @desc   Create company
// @route  POST /companies/create
// @access Private
const createCompany = asyncHandler(async (req, res) => {
    const { name, address, phone, email, website, logo, description, location } = req.body;

    // Check if all fields are given
    if (!name || !address || !phone || !email || !website || !logo || !description || !location) {
        res.status(400);
        throw new Error('All fields are required');
    }

    // Check if the user is authorized to create a company
    if (!req.roles.includes('admin')) {
        res.status(403);
        throw new Error('Forbidden, you are not allowed to alter any company details.');
    }

    // Check if company already exists
    const companyExists = await Company.findOne({ name }).exec();
    if (companyExists) {
        res.status(400);
        throw new Error('Company already exists');
    }

    // Create new company
    const newCompany = new Company({
        name,
        address,
        phone,
        email,
        website,
        logo,
        description,
        location
    });
    await newCompany.save();

    res.status(201).json(newCompany);
})

// @desc   Update company
// @route  PUT /companies/update
// @access Private
const updateCompany = asyncHandler(async (req, res) => {
    const { companyId, name, address, phone, email, website, logo, description, location } = req.body;

    // Check if companyId given
    if (!companyId) {
        res.status(400);
        throw new Error('Company ID is required');
    }

    // Check if the user is authorized to update a company
    if (!req.roles.includes('admin')) {
        res.status(403);
        throw new Error('Forbidden, you are not allowed to alter any company details.');
    }

    // Check if company exists
    const company = await Company.findById(companyId).exec();
    if (!company) {
        res.status(404);
        throw new Error('Company not found');
    }

    // Check if company name already taken
    const companyExists = await Company.findOne({ name }).collation({ locale: 'en', strength: 2 }).exec();
    if (companyExists && companyExists._id.toString() !== companyId.toString()) {
        res.status(400);
        throw new Error('Company name already taken');
    }

    // Update company
    company.name = name || company.name;
    company.address = address || company.address;
    company.phone = phone || company.phone;
    company.email = email || company.email;
    company.website = website || company.website;
    company.logo = logo || company.logo;
    company.description = description || company.description;
    company.location = location || company.location;
    await company.save();

    res.status(200).json(company);
})

// @desc   Delete company
// @route  DELETE /companies/delete
// @access Private
const deleteCompany = asyncHandler(async (req, res) => {
    const { companyId } = req.body;

    // Check if companyId given
    if (!companyId) {
        res.status(400);
        throw new Error('Company ID is required');
    }

    // Check if the user is authorized to delete a company
    if (!req.roles.includes('admin')) {
        res.status(403);
        throw new Error('Forbidden, you are not allowed to alter any company details.');
    }

    // Check if company exists
    const company = await Company.findById(companyId).exec();
    if (!company) {
        res.status(404);
        throw new Error('Company not found');
    }

    // Delete company
    await company.deleteOne();
    res.status(204).json({ message: 'No content' });
})

module.exports = {
    getCompanies,
    getOneCompany,
    createCompany,
    updateCompany,
    deleteCompany
}