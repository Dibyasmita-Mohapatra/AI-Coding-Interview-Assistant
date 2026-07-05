const express = require("express");
const router = express.Router();

router.post("/match", async (req, res) => {

  try {

    const { resumeText, jobDescription } = req.body;

    const skills = [
      "javascript",
      "react",
      "node",
      "express",
      "mongodb",
      "mysql",
      "docker",
      "aws",
      "git",
      "java",
      "python",
      "c++"
    ];

    const matched = [];
    const missing = [];

    skills.forEach((skill) => {

      const hasInResume =
        resumeText.toLowerCase().includes(skill);

      const hasInJD =
        jobDescription.toLowerCase().includes(skill);

      if (hasInJD) {

        if (hasInResume) {
          matched.push(skill);
        } else {
          missing.push(skill);
        }

      }

    });

    const score =
      matched.length +
      missing.length === 0
        ? 0
        : Math.round(
            (matched.length /
              (matched.length + missing.length))
            * 100
          );

    res.json({
      score,
      matched,
      missing,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Analysis failed",
    });

  }

});

module.exports = router;