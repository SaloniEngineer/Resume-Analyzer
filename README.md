# Resume Analyzer

An AI-powered tool that helps you prepare for job interviews the smart way.

Most people prepare for interviews using generic question lists that have nothing to do with the actual job they're applying for. This tool fixes that  just paste a job description and your resume, and it tells you how well you match, what skills you're missing, and what questions you're likely to be asked, all tailored to that specific role.

## What it does

- Match Score  See how well your resume fits a job description, instantly.
- Skill Gap Analysis  Know exactly what skills you're missing for the role.
- Custom Interview Questions  Get technical and behavioral questions based on the actual job, not random ones off the internet.
- Resume PDF Export  Download a clean version of your resume.
- Plan History All your past interview prep plans, saved in one place.

## Built With

- Frontend: React + Vite
- Backend:  Node.js + Express
- AI: Groq API
- Auth: JWT
- PDF Generation: Puppeteer

## Getting Started

1. Clone the repo

    git clone https://github.com/SaloniEngineer/Resume-Analyzer.git
    cd Resume-Analyzer

2. Backend setup

    cd Backend
    npm install

Create a `.env` file inside `Backend/`:

    GROQ_API_KEY=your_api_key_here

Run it:

    node server.js

3. Frontend setup

    cd Frontend/frontend
    npm install
    npm run dev

That's it — open the local link shown in your terminal and you're good to go.

## Why I Built This

Interview prep online is either too generic or too scattered. I wanted something that actually looks at the job you're going for and tells you exactly where you stand and what to work on — instead of another 100-questions PDF that applies to no one in particular.

---

Feel free to explore, fork, or reach out if you'd like to collaborate.
