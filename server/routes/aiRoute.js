const express = require("express");
const Groq = require("groq-sdk");

const router = express.Router();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// =========================
// CODING HINT
// =========================

router.post("/hint", async (req, res) => {
  try {

    const { problem } = req.body;

    const chatCompletion =
      await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "You are a coding interview assistant.",
          },
          {
            role: "user",
            content: `Give a hint for this coding problem:\n${problem}`,
          },
        ],
        model: "llama-3.3-70b-versatile",
      });

    res.json({
      hint:
        chatCompletion.choices[0]?.message?.content,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "AI request failed",
    });

  }
});

// =========================
// AI CHAT
// =========================

router.post("/chat", async (req, res) => {
  try {

    const { question } = req.body;

    const chatCompletion =
      await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `
You are an AI coding interview assistant.

Help users:
- Solve coding problems
- Debug code
- Explain DSA concepts
- Explain algorithms
- Improve interview skills
            `,
          },
          {
            role: "user",
            content: question,
          },
        ],
        model: "llama-3.3-70b-versatile",
      });

    res.json({
      reply:
        chatCompletion.choices[0]?.message?.content,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "AI chat failed",
    });

  }
});

// =========================
// COMPANY HR QUESTION
// =========================

router.post("/hr-question", async (req, res) => {

  try {

    const {
      company = "Google",
      difficulty = "Medium",
    } = req.body;

    const chatCompletion =
      await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `
You are a professional HR interviewer.

Generate ONE realistic HR interview question.

Company: ${company}
Difficulty: ${difficulty}

Rules:
- Ask only one question
- Make it company-specific
- Do not provide answers
- Return only the question
            `,
          },
        ],
        model: "llama-3.3-70b-versatile",
      });

    res.json({
      question:
        chatCompletion.choices[0]?.message?.content,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Failed to generate HR question",
    });

  }

});

// =========================
// HR FEEDBACK
// =========================

router.post("/hr-feedback", async (req, res) => {

  try {

    const { question, answer } = req.body;

    const chatCompletion =
      await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `
You are a senior HR interviewer.

Analyze the candidate answer.

Return EXACTLY in this format:

Score: X/10

Strengths:
- point
- point

Weaknesses:
- point
- point

Communication:
- point

Suggestions:
- point
- point
            `,
          },
          {
            role: "user",
            content: `
Question:
${question}

Answer:
${answer}
            `,
          },
        ],
        model: "llama-3.3-70b-versatile",
      });

    const feedback =
      chatCompletion.choices[0]?.message?.content;

    const scoreMatch =
      feedback.match(/Score:\s*(\d+)/i);

    const score =
      scoreMatch
        ? scoreMatch[1]
        : "0";

    res.json({
      score,
      feedback,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Failed to analyze answer",
    });

  }

});

module.exports = router;