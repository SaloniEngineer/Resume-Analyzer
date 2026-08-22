const express = require('express');
const router = express.Router();
const { generatedResumePdf } = require('../services/ai.service');

router.post('/generate-resume-pdf', async (req, res) => {
    try {
        const { resume, selfDescription, jobDescription, candidateName, candidateEmail } = req.body;

        const pdfBuffer = await generatedResumePdf({ resume, selfDescription, jobDescription, candidateName, candidateEmail });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');
        res.send(pdfBuffer);
    } catch (error) {
        console.error("Resume PDF generation error:", error);
        res.status(500).json({ message: "Failed to generate resume PDF" });
    }
});

module.exports = router;