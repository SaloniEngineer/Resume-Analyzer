import axios from "axios";

const api = axios.create({
 // baseURL: "http://localhost:3000",
 baseURL: "https://resume-analyzer-8ls7.onrender.com",
  withCredentials: true,
});

// Generate Interview Report
export async function generateInterviewReport({
  jobDescription,
  selfDescription,
  resumeFile,
}) {
  const formData = new FormData();

  formData.append("jobDescription", jobDescription);
  formData.append("selfDescription", selfDescription);
  formData.append("resume", resumeFile);

  const response = await api.post("/api/interview", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

// Get All Interview Reports
export async function getAllInterviewReports() {
  const response = await api.get("/api/interview");
  return response.data;
}

// Get Interview Report By ID
export async function getInterviewById(id) {
  const response = await api.get(`/api/interview/${id}`);
  return response.data;
}

// Generate Resume PDF
export async function generateResumePdf({ interviewReportId }) {
  const response = await api.post(
    `/api/interview/resume/pdf/${interviewReportId}`,
    {},
    {
      responseType: "blob",
    }
  );

  return response.data;
}