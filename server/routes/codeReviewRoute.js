const express = require("express");
const router = express.Router();

const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

router.post("/", async (req, res) => {

  try {

    const { code, language } = req.body;

    const completion =
      await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "You are a senior software engineer. Review the code and provide code quality, time complexity, space complexity and suggestions."
          },
          {
            role: "user",
            content: `
Language: ${language}

Code:
${code}
            `
          }
        ],

        model: "llama-3.3-70b-versatile",
      });

    res.json({
      review:
        completion.choices[0].message.content
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Review failed"
    });

  }

});

module.exports = router;