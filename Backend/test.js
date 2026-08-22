const { generateInterviewReport } = require('./src/services/ai.service.js'); 

async function start() {
    console.log(" Please wait");

    const dummyData = {
        resume: "Name: Mohammad Shariq. Skills: Node.js, Express, Javascript, MongoDB. Experience: 2 years building backend components.",
        selfDescription: "I am a backend developer who loves optimization and database scaling.",
        jobDescription: "Looking for a Node.js Engineer with strong MongoDB indexing knowledge and clean architecture patterns."
    };

    try {
        const finalReport = await generateInterviewReport(dummyData);
       
    } catch (err) {
        console.error("Test Failed:", err.message);
    }
}

start();