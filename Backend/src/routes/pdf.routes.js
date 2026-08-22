const express = require('express');
const router = express.Router();
const { generatePdfController } = require('../controllers/pdf.controller');

router.post('/generate-pdf', generatePdfController);

module.exports = router;