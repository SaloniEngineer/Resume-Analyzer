import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../interview/style/home.scss";
import { useInterview } from "../interview/hooks/useinterview.js";

const Home = () => {
  const navigate = useNavigate();

  const { loading, error, generateReport } = useInterview();

  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [formError, setFormError] = useState("");
  const [reports, setReports] = useState([]);

  
  useEffect(() => {
    const savedReports =
      JSON.parse(localStorage.getItem("recentInterviewReports")) || [];
    setReports(savedReports);
  }, []);

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleGenerate = async () => {
    setFormError("");

    if (!jobDescription.trim()) {
      setFormError("Job description is required.");
      return;
    }

    if (!selfDescription.trim()) {
      setFormError("Self description is required.");
      return;
    }

    if (!resumeFile) {
      setFormError("Resume file is required.");
      return;
    }

    try {
      const data = await generateReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });

      console.log("Generate Response:", data);

      const newReport = data?.report || data?.interview || data;

      const id =
        data?.report?._id ||
        data?.interview?._id ||
        data?._id;

      if (!id) {
        console.error("Interview ID not found", data);
        setFormError("Interview ID not found.");
        return;
      }

      
      newReport._id = newReport._id || id;

      
      const existingReports =
        JSON.parse(localStorage.getItem("recentInterviewReports")) || [];
      const updatedReports = [
        newReport,
        ...existingReports.filter((r) => r._id !== newReport._id),
      ].slice(0, 5);

      localStorage.setItem(
        "recentInterviewReports",
        JSON.stringify(updatedReports)
      );
      setReports(updatedReports);

      navigate(`/interview/${id}`);
    } catch (err) {
      console.error(err);
      setFormError("Failed to generate interview report.");
    }
  };

  if (loading) {
    return (
      <main className="loading-screen">
        <h1>Loading your interview plan...</h1>
      </main>
    );
  }

  return (
    <main className="home">
      <div className="home__header">
        <h1>
          Create Your Custom{" "}
          <span className="home__accent">Interview Plan</span>
        </h1>
        <p>
          Let our AI analyze the job requirements and your unique profile to
          build a winning strategy.
        </p>
      </div>

      <section className="home__card">
        <div className="home__grid">
          <div className="home__column">
            <div className="home__section-title">
              <div className="home__title-row">
                <h2>Target Job Description</h2>
              </div>
              <span className="home__badge">REQUIRED</span>
            </div>

            <textarea
              id="jobDescription"
              name="jobDescription"
              value={jobDescription}
              maxLength={5000}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the full job description here..."
            />

            <div className="home__counter">
              {jobDescription.length} / 5000 chars
            </div>
          </div>

          <div className="home__column">
            <div className="home__section-title">
              <h2>Your Profile</h2>
            </div>

            <div className="home__field-block">
              <label htmlFor="resume">Upload Resume</label>

              <label className="home__upload" htmlFor="resume">
                <span>
                  {resumeFile
                    ? resumeFile.name
                    : "Click to upload or drag & drop"}
                </span>

                <small>PDF (Max 5MB)</small>

                <input
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".pdf"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            <div className="home__field-block">
              <label
                className="home__label"
                htmlFor="selfDescription"
              >
                Quick Self-Description
              </label>

              <textarea
                id="selfDescription"
                name="selfDescription"
                value={selfDescription}
                onChange={(e) => setSelfDescription(e.target.value)}
                placeholder="Briefly describe your experience..."
              />
            </div>

            {(formError || error) && (
              <p style={{ color: "#f43f5e", marginTop: "8px" }}>
                {formError || error}
              </p>
            )}
          </div>
        </div>

        <div className="home__footer">
          <p>AI-Powered Strategy Generation · Approx 30s</p>

          <button
            className="home__button"
            type="button"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading
              ? "Generating..."
              : "Generate My Interview Strategy"}
          </button>
        </div>
      </section>

      {/* Recent Reports List */}
      {reports.length > 0 && (
        <section
          className="recent-reports"
          style={{
            width: "100%",
            maxWidth: "1100px",
            alignSelf: "center",
            marginTop: "40px",
            boxSizing: "border-box",
          }}
        >
          <h2
            style={{
              color: "#fff",
              fontSize: "1.4rem",
              fontWeight: 700,
              marginBottom: "18px",
              textAlign: "left",
            }}
          >
            My Recent Interview Plans
          </h2>
          <div
            className="report-list"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "18px",
              width: "100%",
            }}
          >
            {reports.map((report) => (
              <div
                key={report._id}
                className="report-item"
                onClick={() => navigate(`/interview/${report._id}`)}
                style={{
                  cursor: "pointer",
                  background: "#12121a",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "14px",
                  padding: "22px",
                  boxSizing: "border-box",
                  textAlign: "left",
                  transition: "border-color 0.2s ease, transform 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <h3
                  style={{
                    color: "#fff",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    marginBottom: "12px",
                  }}
                >
                  {report.title || "Untitled Position"}
                </h3>
                <p
                  className="report-meta"
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "0.85rem",
                    marginBottom: "12px",
                  }}
                >
                  Generated on{" "}
                  {report.createdAt
                    ? new Date(report.createdAt).toLocaleDateString()
                    : "recently"}
                </p>
                {report.matchScore !== undefined && (
                  <span
                    className="match-score"
                    style={{
                      display: "inline-block",
                      color:
                        report.matchScore >= 80
                          ? "#4ade80"
                          : report.matchScore >= 60
                          ? "#facc15"
                          : "#f87171",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                    }}
                  >
                    Match Score: {report.matchScore}%
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default Home;