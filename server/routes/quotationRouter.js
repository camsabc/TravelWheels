/* Import statement for modules */
const express = require('express');
const router = express.Router();
const quotationController = require('../controllers/quotationController');

/* Provides routing for the quotation functions */
router.get('/get-all-quotations', quotationController.getAllQuotations);
router.get('/get-all-quotations-by-email/:email', quotationController.getQuotationByEmail);
router.get('/get-quotation-by-id/:id', quotationController.getQuotationById);
router.post('/create-quotation', quotationController.createQuotation);

router.post('/change-status', quotationController.changeStatus);

module.exports = router;
