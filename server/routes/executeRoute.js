const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/run", async (req, res) => {

  try {

    const { code, language } = req.body;

    // Judge0 language IDs
    const languageMap = {
      javascript: 63,
      python: 71,
      cpp: 54,
      java: 62,
    };

    const response = await axios.post(
      "https://ce.judge0.com/submissions?base64_encoded=false&wait=true",
      {
        source_code: code,
        language_id: languageMap[language],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Code execution failed",
    });
  }
});

module.exports = router;