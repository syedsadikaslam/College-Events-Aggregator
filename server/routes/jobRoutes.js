const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Internship = require("../models/Internship");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/auto-fetch", async (req, res) => {
  try {
    const { rawText } = req.body; 
    if (!rawText) return res.status(400).json({ error: "Job title is required" });

    const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash",
        tools: [{ googleSearch: {} }] 
    });

    const prompt = `Search the internet for 1 real and active ${rawText} internship opening in January 2026. 
        Return ONLY a raw JSON object. NO MARKDOWN, NO BACKTICKS.
        {
          "role": "...",
          "company": "...",
          "stipend": "...",
          "location": "...",
          "applyLink": "...",
          "description": "...",
          "lastDate": "..."
        }
        Role: ${rawText}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim();

    // --- BULLETPROOF EXTRACTION ---
    // 1. Pehle aur aakhri bracket dhoondhna
    const startIdx = text.indexOf('{');
    const lastIdx = text.lastIndexOf('}');

    if (startIdx === -1 || lastIdx === -1) {
        throw new Error("AI response did not contain JSON.");
    }

    // 2. Sirf JSON block nikalna
    let jsonString = text.substring(startIdx, lastIdx + 1);

    // 3. CLEANING: Remove invisible control characters and extra spaces
    jsonString = jsonString.replace(/[\u0000-\u001F\u007F-\u009F]/g, ""); 

    try {
        const jobData = JSON.parse(jsonString);

        // Database Save
        const newJob = new Internship(jobData);
        await newJob.save();

        res.status(200).json({ 
            success: true, 
            message: `Premium Card Created for ${jobData.role}`, 
            data: newJob 
        });
    } catch (parseError) {
        console.error("Parse Error Details:", jsonString);
        throw new Error("AI generated bad JSON syntax.");
    }

  } catch (error) {
    console.error("Gemini Route Error:", error.message);
    res.status(500).json({ 
        success: false, 
        error: "Server Error: AI formatting failed. Try once more." 
    });
  }
});

module.exports = router;