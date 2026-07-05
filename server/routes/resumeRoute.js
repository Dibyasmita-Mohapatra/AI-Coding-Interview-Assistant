const express = require("express");
const router = express.Router();

const multer = require("multer");
const pdfParse = require("pdf-parse");
const PDFDocument = require("pdfkit");
const Groq = require("groq-sdk");

const storage = multer.memoryStorage();

const upload = multer({
  storage,
});

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// =====================================
// AI RESUME ANALYZER
// =====================================

router.post(
  "/analyze",
  upload.single("resume"),
  async (req, res) => {

    try {

      if (!req.file) {

        return res.status(400).json({
          success: false,
          message: "No resume uploaded",
        });

      }

      const pdfData = await pdfParse(
        req.file.buffer
      );

      const resumeText =
        pdfData.text;

      if (
        !resumeText ||
        resumeText.trim().length < 20
      ) {

        return res.status(400).json({
          success: false,
          message:
            "Could not extract enough text from resume",
        });

      }

      const completion =
        await groq.chat.completions.create({

          model:
            "llama-3.3-70b-versatile",

          messages: [
            {
              role: "system",
              content:
                "You are an expert ATS Resume Analyzer and Career Coach.",
            },

            {
              role: "user",
              content: `
Analyze the following resume.

Return ONLY in this format:

Resume Score: X/100

Strengths:
- Point 1
- Point 2
- Point 3

Weaknesses:
- Point 1
- Point 2
- Point 3

Suggestions:
- Point 1
- Point 2
- Point 3

Resume:

${resumeText}
              `,
            },
          ],

          temperature: 0.5,

        });

      const analysis =
        completion.choices[0]
          .message.content;

      res.status(200).json({
        success: true,
        analysis,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          error.message ||
          "Resume analysis failed",
      });

    }

  }
);

// =====================================
// AI RESUME BUILDER + PDF DOWNLOAD
// =====================================

router.post(
  "/build",
  async (req, res) => {

    try {

      const {
        name,
        email,
        phone,
        skills,
        education,
        experience,
        projects,
      } = req.body;

      const completion =
        await groq.chat.completions.create({

          model:
            "llama-3.3-70b-versatile",

          messages: [

            {
              role: "system",
              content: `
You are a professional resume writer.

Create a modern ATS-friendly resume.

Sections:

1. Name
2. Contact
3. Professional Summary
4. Skills
5. Education
6. Experience
7. Projects

Return only the final resume.
              `,
            },

            {
              role: "user",
              content: `
Name: ${name}

Email: ${email}

Phone: ${phone}

Skills:
${skills}

Education:
${education}

Experience:
${experience}

Projects:
${projects}
              `,
            },

          ],

          temperature: 0.5,

        });

      const resume =
        completion.choices[0]
          .message.content;

      // CREATE PDF

      const doc =
        new PDFDocument({
          margin: 50,
        });

      res.setHeader(
        "Content-Type",
        "application/pdf"
      );

      res.setHeader(
        "Content-Disposition",
        "attachment; filename=AI_Resume.pdf"
      );

      doc.pipe(res);

      doc
        .fontSize(24)
        .text("AI Generated Resume", {
          align: "center",
        });

      doc.moveDown();

      doc
        .fontSize(12)
        .text(resume);

      doc.end();

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          error.message ||
          "Resume generation failed",
      });

    }

  }
);

module.exports = router;