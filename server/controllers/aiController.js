import geminiAI from "../config/gemeni.js";
import aiInsightModel from "../models/aiinsightModel.js";
import { sendResponse } from "../utils/sendResponse.js";

const analyzeFile = async (req, res) => {
  try {
    const { pdfText } = req.body; // Text sent from frontend after extraction

    if (!pdfText || pdfText.trim().length === 0) {
      return res.status(400).json({ message: "No text provided for analysis" });
    }

    const prompt = `
Analyze and summarize the following medical report. 
Format the output in HTML so it can be displayed directly in a web page. Use proper headings, paragraphs, and lists.

Requirements:
1. A short summary (use <h2>Summary</h2> and <p>).
2. Key abnormal values or findings (use <h2>Key Findings</h2> and <ul><li>...</li></ul>).
3. A few simple health recommendations (use <h2>Recommendations</h2> and <ul><li>...</li></ul>).
4. Always end with: "<p><strong>Note:</strong> This summary is for understanding only, not for medical advice.</p>"

Report:
<pre>${pdfText}</pre>
`;

    // Create Gemini model instance
    const response = await geminiAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    // Save AI summary in database
    await aiInsightModel.create({
      ...req.body,
      userId: req.user.id,
      aiSummary: response.text,
      extractedText: pdfText,
    });

    sendResponse(res, 200, "Summery SUccessfull", { summery: response.text });
  } catch (error) {
    console.error("Error in analyzeFile:", error);
    sendResponse(res, 500, "Internal server error", { error: error.message });
  }
};

const getAllInsights = async (req, res) => {
  try {
    const insights = await aiInsightModel.find({});

    sendResponse(res, 200, "All insights successfull", { insights });
  } catch (error) {
    console.log(error);
    sendResponse(res, 500, "Internal serveer error", { error: error.message });
  }
};

const getInsightById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      sendResponse(res, 400, "No id provided");
      return;
    }

    const singleInsight = await aiInsightModel.findOne({ _id: id });

    if (!singleInsight) {
      return sendResponse(res, 404, "No insight found");
    }

    sendResponse(res, 200, "Insight successfull", { singleInsight });
  } catch (error) {
    console.log(error);
    sendResponse(res, 500, "Internal serveer error", { error: error.message });
  }
};

const deleteInsight = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      sendResponse(res, 400, "No id provided");
      return;
    }

    await aiInsightModel.deleteOne({ _id: id });

    sendResponse(res, 200, "Deleted Successfully");
  } catch (error) {
    console.log(error);
    sendResponse(res, 500, "Internal serveer error", { error: error.message });
  }
};

export { analyzeFile, getAllInsights, getInsightById, deleteInsight };