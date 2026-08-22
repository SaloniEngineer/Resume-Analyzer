const express = require('express');
const app = express();
const cookiesParser = require('cookie-parser');
const cors = require('cors');

//  middleware
app.use(express.json());
app.use(cookiesParser());

app.use(cors({
    origin: ['http://localhost:5173', 'https://resume-analyzer-one-peach.vercel.app'],
    credentials: true
}));

app.get('/', (req, res) => {
    res.send('Server is working perfectly!');
});

//  routes
const authRouter = require('./routes/auth.routes');
const interviewRouter = require('./routes/interview.routes');
const pdfRouter = require('./routes/pdf.routes');
const resumeRouter = require('./routes/resume.routes');

app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);
app.use("/api", pdfRouter);
app.use("/api", resumeRouter);   

module.exports = app;