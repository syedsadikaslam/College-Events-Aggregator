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

    const prompt = `Search for real ${rawText} internships for 2026. 
        Return ONLY a single valid JSON object. 
        If you find multiple, return ONLY the most relevant one.
        Structure:
        {
          "role": "...",
          "company": "...",
          "stipend": "...",
          "location": "...",
          "applyLink": "...",
          "description": "...",
          "lastDate": "..."
        }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim();

    // --- STRATEGIC FIX FOR MULTIPLE JSON OBJECTS ---
    // Hum pehla '{' dhoondhenge
    const startIdx = text.indexOf('{');
    
    // Aur hum pehla '}' dhoondhenge jo pehle '{' ke BAAD aata hai
    // Yeh logic ensure karta hai ki humein sirf pehla complete object mile
    let endIdx = text.indexOf('}', startIdx);

    if (startIdx === -1 || endIdx === -1) {
        throw new Error("AI response did not contain a valid JSON object.");
    }

    // Sirf pehle object ko slice karna
    let jsonString = text.substring(startIdx, endIdx + 1);

    try {
        const jobData = JSON.parse(jsonString);

        // Database Save
        const newJob = new Internship(jobData);
        await newJob.save();

        res.status(200).json({ 
            success: true, 
            message: `Premium Card Created for ${jobData.company}`, 
            data: newJob 
        });
    } catch (parseError) {
        console.error("Parse Error Details:", jsonString);
        throw new Error("AI generated invalid JSON structure.");
    }

  } catch (error) {
    console.error("Gemini Route Error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
