
const puppeteer = require("puppeteer");

async function generatePdfController(req, res) {
  let browser;

  try {
    const { html } = req.body;

    if (!html) {
      return res.status(400).json({
        message: "HTML content is required",
      });
    }

    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    await page.setContent(html, {
      waitUntil: "networkidle0",
      timeout: 30000,
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20px",
        bottom: "20px",
        left: "20px",
        right: "20px",
      },
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="interview-report.pdf"'
    );

    return res.send(pdfBuffer);
  } catch (error) {
    console.error("PDF generation error:", error);

    return res.status(500).json({
      message: "Failed to generate PDF",
    });
  } finally {
    if (browser) {
      await browser.close().catch((closeError) => {
        console.error("Browser close error:", closeError);
      });
    }
  }
}

module.exports = { generatePdfController };
