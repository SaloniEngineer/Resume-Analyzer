const express = require("express");

const {
  generateInterviewReportController,
  getInterviewByIdController,
  getAllInterviewReportsController,
  generatedResumePdfController,
} = require("../controllers/interview.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const upload = require("../middlewares/file.middleware");

const interviewRouter = express.Router();

/**
 * CREATE Interview Report
 */
interviewRouter.post(
  "/",
  authMiddleware.authUser,
  upload.single("resume"),
  generateInterviewReportController
);

/**
 * GENERATE PDF
 */
interviewRouter.post(
  "/resume/pdf/:interviewReportId",
  authMiddleware.authUser,
  generatedResumePdfController
);

/**
 * GET All Interview Reports
 */
interviewRouter.get(
  "/",
  authMiddleware.authUser,
  getAllInterviewReportsController
);

/**
 * GET Interview Report By ID
 */
interviewRouter.get(
  "/:id",
  authMiddleware.authUser,
  getInterviewByIdController
);

module.exports = interviewRouter;