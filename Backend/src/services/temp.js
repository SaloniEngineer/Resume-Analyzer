
const sampleResume = {
    personalInfo: {
        name: "Rahul Sharma",
        email: "rahul.sharma@gmail.com",
        phone: "+91 9876543210",
        location: "Noida, Uttar Pradesh, India",
        linkedin: "linkedin.com/in/rahulsharma",
        github: "github.com/rahulsharma"
    },
    summary: "Motivated and detail-oriented Full Stack Developer with 2 years of experience building scalable web applications using the MERN stack. Passionate about writing clean code and solving real-world problems.",
    education: [
        {
            degree: "Bachelor of Technology - Computer Science",
            institution: "Dr. A.P.J. Abdul Kalam Technical University",
            location: "Lucknow, UP",
            year: "2019 - 2023",
            cgpa: "7.8/10"
        }
    ],
    experience: [
        {
            title: "Junior Full Stack Developer",
            company: "TechSoft Solutions Pvt. Ltd.",
            location: "Noida, UP",
            duration: "Jan 2023 - Present",
            responsibilities: [
                "Developed REST APIs using Node.js and Express.js",
                "Built responsive UI components using React.js and Tailwind CSS",
                "Integrated MongoDB for data storage and management",
                "Collaborated with team using Git and GitHub"
            ]
        }
    ],
    skills: {
        languages: ["JavaScript", "TypeScript", "HTML", "CSS"],
        frameworks: ["React.js", "Node.js", "Express.js"],
        databases: ["MongoDB", "MySQL"],
        tools: ["Git", "GitHub", "Postman", "VS Code", "Docker"]
    },
    projects: [
        {
            name: "Resume Analyzer",
            description: "An AI-powered web app that analyzes resumes and provides feedback using Gemini AI",
            tech: ["React.js", "Node.js", "MongoDB", "Gemini API"],
            github: "github.com/rahulsharma/resume-analyzer"
        },
        {
            name: "E-Commerce Website",
            description: "A full-stack e-commerce platform with cart, payment, and admin dashboard",
            tech: ["React.js", "Express.js", "MongoDB", "Stripe API"],
            github: "github.com/rahulsharma/ecommerce"
        }
    ],
    certifications: [
        "MongoDB Developer Certification - 2023",
        "React.js Advanced - Udemy - 2022",
        "Node.js Backend Development - Coursera - 2022"
    ]
};


// 2. ANY USER RESUME 

const anyUserResume = {
    personalInfo: {
        name: "Priya Patel",
        email: "priya.patel@email.com",
        phone: "+91 9123456789",
        location: "Bengaluru, Karnataka",
        linkedin: "linkedin.com/in/priyapatel-dev"
    },
    summary: "Frontend Engineer with 3 years of experience specializing in React.js, modern JavaScript, and UI/UX design. Passionate about performance optimization and building pixel-perfect interfaces.",
    education: [
        {
            degree: "Bachelor of Engineering in Information Technology",
            institution: "Visvesvaraya Technological University",
            year: "2018 - 2022",
            cgpa: "8.2/10"
        }
    ],
    experience: [
        {
            title: "Frontend Developer",
            company: "WebCraft Studio",
            location: "Bengaluru",
            duration: "June 2023 - Present",
            responsibilities: [
                "Built and maintained responsive web applications using React.js and Redux Toolkit.",
                "Optimized page load speed by 35% through lazy loading and code-splitting.",
                "Collaborated closely with UI/UX designers to convert Figma designs into clean code."
            ]
        }
    ],
    skills: {
        languages: ["HTML5", "CSS3", "JavaScript (ES6+)", "TypeScript"],
        frameworks: ["React.js", "Next.js", "Tailwind CSS", "Material UI"],
        tools: ["Git", "Figma", "Webpack", "Jest"]
    },
    projects: [
        {
            name: "SaaS Analytics Dashboard",
            tech: ["React.js", "Chart.js", "Tailwind CSS"],
            description: "A real-time data visualization dashboard for business metrics with dark mode support."
        }
    ]
};


// 3. USER 

const selfDescription = {
    rawText: "I am a dedicated frontend developer with 3 years of experience. I love working on user interfaces using React and Tailwind. Recently, I have also started learning Node.js and backend architectures because my goal is to transition into a Full Stack Developer role. I am very comfortable fixing tricky UI bugs and working with Figma designs.",
    aiInsights: {
        extractedCoreFocus: "Frontend Development transitioning into Full Stack",
        claimedStrengths: ["React.js", "Tailwind CSS", "Figma to Code", "UI Debugging"],
        futureGoals: {
            targetDomain: "Full Stack Development",
            currentlyLearning: ["Node.js", "Backend Architecture"]
        },
        toneAnalysis: {
            professionalism: "High",
            confidenceLevel: "Moderate-High"
        }
    }
};


// 4. TARGET JOB DESCRIPTION 

const jobDescription = {
    companyName: "InnovateTech Solutions",
    role: "Full Stack Engineer (React & Node)",
    location: "Remote / Hybrid (Bengaluru)",
    experienceRequired: "2-4 Years",
    aboutRole: "We are looking for a Full Stack Developer who can handle our user-facing web apps and scale our backend APIs. You will be working heavily on React.js and Node.js with PostgreSQL.",
    requiredSkills: [
        "Strong proficiency in JavaScript/TypeScript and React.js",
        "Hands-on experience with Node.js and Express.js",
        "Experience with relational databases (PostgreSQL/MySQL)",
        "State management libraries like Redux or Context API",
        "Familiarity with AWS services and Docker containerization"
    ],
    responsibilities: [
        "Develop user-facing features using React.js",
        "Design and implement low-latency, high-performance backend services",
        "Write reusable, testable, and efficient code"
    ]
};


// 5.  SKILL GAP ANALYSIS

const skillGapAnalysis = {
    targetRole: "Senior Full Stack Developer",
    matchPercentage: 72,
    missingSkills: {
        technical: ["Next.js", "Redis (Caching)", "Microservices Architecture", "AWS (S3, EC2, Lambda)"],
        softSkills: ["Team Mentorship", "System Design Documentation"]
    },
    recommendations: [
        {
            skill: "Next.js",
            reason: "Industry standard for production React apps (SEO & SSR).",
            learningResource: "Next.js Official Documentation or 'Complete Next.js' on Udemy."
        },
        {
            skill: "AWS",
            reason: "Senior roles require knowledge of cloud deployment and infrastructure.",
            learningResource: "AWS Certified Cloud Practitioner - Stephane Maarek."
        }
    ]
};


// 6.  INTERVIEW PREPARATION

const interviewPrep = {
    roleContext: "MERN Stack Developer",
    technicalQuestions: [
        {
            topic: "React.js",
            question: "In your 'Resume Analyzer' project, how did you handle state management for the Gemini API responses?",
            expectedKeywords: ["Context API", "Redux", "loading states", "error handling"]
        },
        {
            topic: "Node.js",
            question: "Explain the middleware pattern you used in your E-Commerce project for Stripe payments.",
            expectedKeywords: ["app.use()", "async/await", "webhooks", "request validation"]
        },
        {
            topic: "MongoDB",
            question: "How would you optimize the schema of your E-Commerce platform to handle high-traffic product searches?",
            expectedKeywords: ["Indexing", "Aggregation Pipeline", "Denormalization"]
        }
    ],
    behavioralQuestions: [
        {
            question: "Describe a time at TechSoft Solutions where you had to solve a difficult bug under a tight deadline.",
            tip: "Use the STAR method (Situation, Task, Action, Result)."
        }
    ]
};


// 7. TEMPORARY 

const temporaryCode = {
    snippetId: "scratch_auth_middleware_01",
    fileName: "authMiddleware.js",
    language: "JavaScript",
    context: "Drafting JWT verification for a private route, currently failing on error handling.",
    codeString: `
const jwt = require('jsonwebtoken');
const SECRET_KEY = "my_super_secret_temporary_key_123"; 

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(403).json({ message: "No token provided!" });
    }

    try {
        const token = authHeader.split(' ')[1]; 
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        console.error("Auth error:", err);
        return res.status(401).json({ error: "Unauthorized access" });
    }
};

module.exports = verifyToken;
    `,
    detectedIssues: [
        {
            type: "Security Risk",
            severity: "High",
            line: 3,
            description: "Hardcoded sensitive credential (SECRET_KEY). Should use process.env.JWT_SECRET."
        },
        {
            type: "Code Quality / Crash Risk",
            severity: "Medium",
            line: 11,
            description: "Potential crash if Authorization header format is malformed or missing the Bearer prefix."
        }
    ]
};

// MODULE EXPORTS 

module.exports = {
    sampleResume,
    anyUserResume,
    selfDescription,
    jobDescription,
    skillGapAnalysis,
    interviewPrep,
    temporaryCode
};