const puppeteer = require('puppeteer');

async function generatePdfController(req, res) {
    try {
        const { html } = req.body;

        if (!html) {
            return res.status(400).json({ message: "HTML content is required" });
        }

        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();

        await page.setContent(html, { waitUntil: 'networkidle0' });

        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: { top: '20px', bottom: '20px', left: '20px', right: '20px' }
        });

        await browser.close();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=interview-report.pdf');
        res.send(pdfBuffer);

    } catch (error) {
        console.error("PDF generation error:", error);
        res.status(500).json({ message: "Failed to generate PDF" });
    }
}

module.exports = { generatePdfController };