require('dotenv').config();
const Groq = require('groq-sdk');
const puppeteer = require("puppeteer");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

const generateInterviewReport = async ({ resume, selfDescription, jobDescription }) => {
    const prompt = `
You are an expert interview coach and technical recruiter. Analyze the following candidate information and job description to generate a comprehensive interview preparation report.

/*Candidate's Resume:*/
${resume}

/*Candidate's Self Description:*/
${selfDescription}

/*Job Description:*/
${jobDescription}

Perform a complete profile evaluation. Calculate a match score as a raw integer/number out of 100 based on how well their profile matches the requirements. Extract the candidate's name, analyze their technical assessment baseline, evaluate culture fit alignment, identify explicit areas for improvement, compile target technical/behavioral questions, isolate skill gaps, and layout a 7-day preparation roadmap.
`;

    try {
        const response = await groq.chat.completions.create({
            model: 'openai/gpt-oss-120b',
            messages: [
                {
                    role: 'system',
                    content: `You are an expert interview coach. You must respond with a JSON object ONLY.

                    CRITICAL REQUIREMENT: Do NOT use percentages or strings for the match score. It MUST be a raw integer/number data type (e.g., 85 instead of "85%").
                    Do NOT create any nested wrapper keys like "interviewPreparationReport".
                    Your response MUST be a completely flat JSON object containing EXACTLY these 10 root keys and nothing else:

                    {
                      "candidateName": "String (Extract full name from the resume, default to 'Candidate' if missing)",
                      "matchScore": 85,
                      "technicalAssessment": "String (Detailed breakdown of core technical strengths based on resume and JD)",
                      "cultureFit": "String (Evaluation of how well the candidate aligns with team values and collaboration)",
                      "areasForImprovement": ["String identifying a clear technical or soft-skill area for improvement"],
                      "additionalComments": "String (Extra strategic notes or observations for this role)",
                      "technicalQuestions": [{ "question": "string", "intention": "string", "answer": "string" }],
                      "behavioralQuestions": [{ "question": "string", "intention": "string", "answer": "string" }],
                      "skillGaps": [{ "skill": "string", "severity": "low | medium | high" }],
                      "preparationPlan": [{ "day": 1, "focus": "string", "tasks": ["string"] }]
                    }`
                },
                { role: 'user', content: prompt }
            ],
            temperature: 0.3,
            max_tokens: 4096,
            response_format: { type: "json_object" }
        });

        const rawContent = response.choices[0]?.message?.content;
        if (!rawContent) throw new Error('No response content from Groq');

        return JSON.parse(rawContent);
    } catch (error) {
        console.error('Error generating interview report:', error);
        throw new Error(`Failed to generate interview report: ${error.message}`);
    }
};

async function generatedPdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();
        await page.setContent(htmlContent, { waitUntil: "domcontentloaded", timeout: 30000 });
        return await page.pdf({ format: "A4", printBackground: true });
    } finally {
        await browser.close();
    }
}

function escapeHtml(str = '') {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function buildResumeHtml(data) {
    const {
        fullName = 'Candidate Name',
        location = '', phone = '', email = '', linkedin = '', github = '',
        summary = '', skills = [], experience = [], projects = [], education = []
    } = data;

    const contactLine = [location, phone, email, linkedin, github]
        .filter(Boolean).map(escapeHtml).join(' &nbsp;|&nbsp; ');

    const skillsHtml = skills.map(s => `
        <div class="skill-row">
            <span class="skill-label">${escapeHtml(s.category)}:</span>
            <span class="skill-value">${escapeHtml(s.items)}</span>
        </div>`).join('');

    const experienceHtml = experience.map(exp => `
        <div class="entry">
            <div class="entry-header">
                <span class="entry-title">${escapeHtml(exp.role)}${exp.company ? ` &mdash; ${escapeHtml(exp.company)}` : ''}</span>
                <span class="entry-date">${escapeHtml(exp.startDate || '')}${exp.endDate ? ` - ${escapeHtml(exp.endDate)}` : ''}</span>
            </div>
            <ul class="entry-bullets">${(exp.bullets || []).map(b => `<li>${escapeHtml(b)}</li>`).join('')}</ul>
        </div>`).join('');

    const projectsHtml = projects.length ? `
        <div class="section">
            <h2>PROJECTS</h2>
            ${projects.map(p => `
                <div class="entry">
                    <div class="entry-header"><span class="entry-title">${escapeHtml(p.title)}</span></div>
                    <ul class="entry-bullets">${(p.bullets || []).map(b => `<li>${escapeHtml(b)}</li>`).join('')}</ul>
                </div>`).join('')}
        </div>` : '';

    const educationHtml = education.length ? `
        <div class="section">
            <h2>EDUCATION</h2>
            ${education.map(e => `
                <div class="entry">
                    <div class="entry-header">
                        <span class="entry-title">${escapeHtml(e.degree)}${e.institute ? ` &mdash; ${escapeHtml(e.institute)}` : ''}</span>
                        <span class="entry-date">${escapeHtml(e.year || '')}</span>
                    </div>
                </div>`).join('')}
        </div>` : '';

    return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<style>
    * { box-sizing: border-box; }
    body {
        font-family: 'Helvetica Neue', Arial, sans-serif;
        color: #1a1a1a;
        max-width: 100%;
        margin: 0;
        padding: 48px 56px;
        font-size: 12.5px;
        line-height: 1.7;
        word-wrap: break-word;
    }
    .name { font-size: 28px; font-weight: 700; color: #14213d; margin: 0 0 6px 0; letter-spacing: 0.5px; }
    .contact { font-size: 11.5px; color: #444; margin-bottom: 14px; }
    hr { border: none; border-top: 2px solid #14213d; margin: 14px 0 24px 0; }
    .summary { margin-bottom: 24px; color: #2b2b2b; text-align: justify; }
    .section { margin-bottom: 26px; }
    h2 { font-size: 13.5px; font-weight: 700; color: #14213d; letter-spacing: 0.5px; border-bottom: 1px solid #ccc; padding-bottom: 6px; margin: 0 0 14px 0; }
    .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px 28px; }
    .skill-row { font-size: 12px; }
    .skill-label { font-weight: 700; color: #14213d; }
    .skill-value { color: #2b2b2b; }
    .entry { margin-bottom: 18px; }
    .entry-header { display: flex; justify-content: space-between; align-items: baseline; font-weight: 700; color: #1a1a1a; font-size: 12.5px; }
    .entry-date { font-weight: 400; color: #666; font-size: 11.5px; white-space: nowrap; }
    .entry-bullets { margin: 6px 0 0 0; padding-left: 20px; }
    .entry-bullets li { margin-bottom: 6px; color: #2b2b2b; }
</style>
</head>
<body>
    <div class="name">${escapeHtml(fullName)}</div>
    <div class="contact">${contactLine}</div>
    <hr />
    ${summary ? `<div class="summary">${escapeHtml(summary)}</div>` : ''}
    ${skills.length ? `<div class="section"><h2>TECHNICAL SKILLS</h2><div class="skills-grid">${skillsHtml}</div></div>` : ''}
    ${experience.length ? `<div class="section"><h2>PROFESSIONAL EXPERIENCE</h2>${experienceHtml}</div>` : ''}
    ${projectsHtml}
    ${educationHtml}
</body>
</html>`;
}

async function generatedResumePdf({ resume, selfDescription, jobDescription, candidateName, candidateEmail }) {
    const prompt = `
You are a professional resume writer. Based on the candidate information below, extract and generate structured resume content as a JSON object.
The content must sound human-written (not AI-generated), be tailored to the job description, and highlight relevant strengths and experience.

${candidateName ? `Candidate's known name: ${candidateName} (use this exact name for "fullName" unless the resume text explicitly gives a different full name)` : ''}
${candidateEmail ? `Candidate's known email: ${candidateEmail} (use this exact email for the "email" field unless the resume text explicitly gives a different email)` : ''}

Resume (raw candidate info):
${resume}

Self Description:
${selfDescription}

Job Description (tailor content towards this role):
${jobDescription}

IMPORTANT: Carefully scan the resume text for ANY contact details - phone numbers, city/location, LinkedIn URLs, GitHub URLs - and extract them exactly as written. Do not invent any contact detail that is not present in the text or provided above.

IMPORTANT: If the resume text does not contain a traditional job history (company names, roles, dates), DO NOT leave "experience" empty.
Instead, convert the candidate's described skills, architecture knowledge, and system design points into a "Core Competencies" style experience-like section:
create 1-2 entries under "experience" with role as a relevant title, company as "" (empty), no dates, and turn the descriptions into strong resume-style achievement bullet points.

IMPORTANT for "skills": Group skills into 5-6 categories, using labels like: "Languages & Frameworks", "Frontend", "Databases", "DevOps & Tools", "Architecture", "Specialties". Only include a category if there is genuinely relevant content for it based on the resume/self description - do not invent unrelated skills, but do spread the real skills across these category types rather than lumping everything into one or two categories.

IMPORTANT for "experience": If the candidate only has one continuous role or project-based background, split it into TWO entries representing an earlier phase and a more recent/current phase of their work (e.g., "Junior contributions" vs "Core development work", or by approximate time period), each with its own realistic date range (based on any dates mentioned, or reasonable relative ranges like "2023 - Present" and "2022 - 2023" if no real dates exist) and its own 4-5 bullet points. Do not fabricate a second real company if none exists - use the SAME company/context if that's all the source material supports, just split the responsibilities into two chronological entries.

IMPORTANT for "education": Always extract the exact institute/university name from the resume text if present, even if abbreviated (e.g. "XYZ Institute of Technology", "IIT Delhi", "Delhi University"). Never leave "institute" empty if any educational institution name appears anywhere in the resume or self description. If the candidate is a FRESHER (no real job history), give MORE weight and detail to the education and projects sections — ensure degree, institute name, and year are all clearly present, since this becomes the strongest credibility signal for a fresher's resume. If the candidate is EXPERIENCED (has real job history with company names and dates), keep education concise (degree, institute, year only) since work experience is the primary highlight.

Respond with ONLY a JSON object with EXACTLY this structure (no extra keys, no markdown, no explanation):
{
  "fullName": "string",
  "location": "string",
  "phone": "string",
  "email": "string",
  "linkedin": "string",
  "github": "string",
  "summary": "string, 2-4 sentences, professional tone",
  "skills": [{ "category": "string", "items": "comma separated string" }],
  "experience": [{ "role": "string", "company": "string", "startDate": "string", "endDate": "string", "bullets": ["string"] }],
  "projects": [{ "title": "string", "bullets": ["string"] }],
  "education": [{ "degree": "string", "institute": "string", "year": "string" }]
}

MANDATORY: Every entry in "experience" must have AT LEAST 4 bullet points. Every entry in "projects" must have AT LEAST 2 bullet points describing what was built and which technologies were used. NEVER return an empty "bullets" array — if the source information is limited, generate reasonable, realistic bullet points based on the technologies and context mentioned in the resume, self description, and job description. A project or experience entry with zero bullets is not acceptable.

Never invent fake companies, dates, or credentials - only reframe what is actually given.
`;

    const response = await groq.chat.completions.create({
        model: "openai/gpt-oss-120b",
        messages: [
            { role: "system", content: "You return ONLY a raw JSON object matching the requested schema. Never wrap in markdown code fences. Never add explanation text." },
            { role: "user", content: prompt }
        ],
        temperature: 0.3,
        response_format: { type: "json_object" }
    });

    const rawContent = response.choices[0]?.message?.content;
    if (!rawContent) throw new Error("Failed to generate resume content.");

    let resumeData;
    try {
        resumeData = JSON.parse(rawContent);
    } catch (e) {
        throw new Error("Failed to parse resume content as JSON.");
    }

    if ((!resumeData.fullName || resumeData.fullName.trim() === '') && candidateName) {
        resumeData.fullName = candidateName;
    }
    if ((!resumeData.email || resumeData.email.trim() === '') && candidateEmail) {
        resumeData.email = candidateEmail;
    }

    const htmlContent = buildResumeHtml(resumeData);
    return await generatedPdfFromHtml(htmlContent);
}

module.exports = { generateInterviewReport, generatedResumePdf };