const QuotationModel = require('../models/Quotation');

/* This function retrieves all quotations in the database */
const getAllQuotations = (req, res) => {
    QuotationModel.find({})
        .then(quotations => res.json(quotations))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Failed to fetch quotations' });
        });
};

/* This function retrieves quotations using a unique email */
const getQuotationByEmail = (req, res) => {
    const email = req.params.email;

    QuotationModel.find({ email })
        .then(quotations => {
            if (quotations.length === 0) {
                return res.status(404).json({ error: 'No quotations found for this email' });
            }
            res.json(quotations);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Failed to fetch quotations by email' });
        });
};

/* This function creates a quotation to be stored in the database */
const createQuotation = (req, res) => {
    const {
        firstname, middlename, lastname, email, contactNumber, startDate, endDate,
        pickupLocation, dropOffLocation, numOfPerson, vehicleName, remarks, status, type
    } = req.body;

    /* Generates a random nine-digit number */
    const generateRandomNumber = () => Math.floor(100000000 + Math.random() * 900000000);

    const newQuotation = new QuotationModel({
        firstname,
        middlename,
        lastname,
        email,
        contactNumber,
        startDate,
        endDate,
        pickupLocation,
        dropOffLocation,
        numOfPerson,
        vehicleName,
        remarks,
        status,
        num: generateRandomNumber(),
        type,
        db: 'quotation'
    });

    newQuotation.save()
        .then(savedQuotation => res.status(201).json(savedQuotation))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Failed to create quotation' });
        });
};

/* This function retrieves one quotation using a unique id */
const getQuotationById = (req, res) => {
    const id = req.params.id;

    QuotationModel.findById(id)
        .then(quotation => {
            if (!quotation) {
                return res.status(404).json({ error: 'Quotation not found' });
            }
            res.json(quotation);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Failed to fetch quotation by ID' });
        });
};

/* Changes the status of a particular quotation using unique id */
const changeStatus = (req, res) => {
    const { quotationId, status } = req.body;

    console.log(status)

    QuotationModel.findByIdAndUpdate(quotationId, { status }, { new: true })
        .then(updatedQuotation => {
            if (!updatedQuotation) {
                return res.status(404).json({ error: 'BookQuotationing not found' });
            }
            res.json(updatedQuotation);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Failed to change status' });
        });
};

module.exports = {
    getAllQuotations,
    getQuotationByEmail,
    createQuotation,
    getQuotationById,
    changeStatus 
};
