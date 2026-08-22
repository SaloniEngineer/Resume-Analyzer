import { useContext } from "react";
import {
  getAllInterviewReports,
  generateInterviewReport,
  getInterviewById,
  generateResumePdf,
} from "../../services/interview.api";

import { InterviewContext } from "../../pages/interview.context";

export const useInterview = () => {
  const context = useContext(InterviewContext);

  if (!context) {
    throw new Error("useInterview must be used within an InterviewProvider");
  }

  const {
    loading,
    setLoading,
    error,
    setError,
    report,
    setReport,
    reports,
    setReports,
  } = context;

  // Generate Interview Report
  const generateReport = async ({
    jobDescription,
    selfDescription,
    resumeFile,
  }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await generateInterviewReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });

      setReport(response.interviewReport);

      return response;
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to generate interview report");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get Interview Report By Id
  const getReportById = async (interviewId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await getInterviewById(interviewId);

      setReport(response.interviewReport);

      return response;
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to fetch interview report");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Download Resume PDF
  const getResumePdf = async ({ interviewReportId }) => {
    setLoading(true);

    try {
      const response = await generateResumePdf({
        interviewReportId,
      });

      const url = window.URL.createObjectURL(
        new Blob([response], { type: "application/pdf" })
      );

      const link = document.createElement("a");
      link.href = url;
      link.download = `resume_${interviewReportId}.pdf`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to download PDF");
    } finally {
      setLoading(false);
    }
  };

  // Get All Reports
  const getReports = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getAllInterviewReports();

      setReports(response.interviewReports);

      return response;
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to fetch reports");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    report,
    reports,
    generateReport,
    getReportById,
    getReports,
    getResumePdf,
  };
};