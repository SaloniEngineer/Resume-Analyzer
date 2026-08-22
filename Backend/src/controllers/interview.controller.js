const pdfParse = require("pdf-parse");
const InterviewReport = require("../models/interviewReport.model");
const {
  generateInterviewReport,
  generatedResumePdf,
} = require("../services/ai.service");

/**
 * CREATE INTERVIEW REPORT
 */
async function generateInterviewReportController(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Resume file is required",
      });
    }

    const parsedPdf = await pdfParse(req.file.buffer);
    const resumeContent = parsedPdf.text;

    const { selfDescription, jobDescription } = req.body;

    if (!jobDescription || !selfDescription) {
      return res.status(400).json({
        message: "jobDescription and selfDescription are required",
      });
    }

    const aiResponse = await generateInterviewReport({
      resume: resumeContent,
      selfDescription,
      jobDescription,
    });

    const savedReport = await InterviewReport.create({
      title: `Interview Prep Plan - ${
        aiResponse.candidateName || "Candidate"
      }`,
      user: req.user?._id,
      resume: resumeContent,
      selfDescription,
      jobDescription,
      ...aiResponse,
    });

    return res.status(201).json({
      message: "Interview report generated successfully",
      report: savedReport,
    });
  } catch (error) {
    console.error("POST Interview Error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

/**
 * GET INTERVIEW REPORT BY ID
 */
async function getInterviewByIdController(req, res) {
  try {
    const { id } = req.params;

    const interviewReport = await InterviewReport.findById(id);

    if (!interviewReport) {
      return res.status(404).json({
        message: "Interview report not found.",
      });
    }

    return res.status(200).json({
      message: "Interview report fetched successfully.",
      interviewReport,
    });
  } catch (error) {
    console.error("GET Interview Error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

/**
 * GET ALL INTERVIEW REPORTS
 */
async function getAllInterviewReportsController(req, res) {
  try {
    const interviewReports = await InterviewReport.find({
      user: req.user._id,
    })
      .sort({ createdAt: -1 })
      .select(
        "-resume -selfDescription -jobDescription -__v -technicalQuestions.answer -behavioralQuestions.answer -strategicAdvice"
      );

    return res.status(200).json({
      message: "Interview reports fetched successfully.",
      interviewReports,
    });
  } catch (error) {
    console.error("GET All Interviews Error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

/**
 * GENERATE RESUME PDF
 */
async function generatedResumePdfController(req, res) {
  try {
    const { interviewReportId } = req.params;

    const interviewReport = await InterviewReport.findById(
      interviewReportId
    );

    if (!interviewReport) {
      return res.status(404).json({
        message: "Interview report not found.",
      });
    }

    const { resume, jobDescription, selfDescription } = interviewReport;

    const pdfBuffer = await generatedResumePdf({
      resume,
      jobDescription,
      selfDescription,
    });

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`,
    });

    return res.send(pdfBuffer);
  } catch (error) {
    console.error("PDF Generation Error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

module.exports = {
  generateInterviewReportController,
  getInterviewByIdController,
  getAllInterviewReportsController,
  generatedResumePdfController,
};