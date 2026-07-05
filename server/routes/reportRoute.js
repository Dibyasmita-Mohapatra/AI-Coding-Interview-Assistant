const express = require("express");
const PDFDocument = require("pdfkit");

const router = express.Router();

router.post("/generate", async (req, res) => {

  try {

    const {
      type,
      score,
      feedback,
    } = req.body;

    const doc = new PDFDocument();

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=InterviewReport.pdf"
    );

    doc.pipe(res);

    doc.fontSize(24)
      .text("AI Interview Report");

    doc.moveDown();

    doc.fontSize(16)
      .text(`Interview Type: ${type}`);

    doc.moveDown();

    doc.text(`Score: ${score}%`);

    doc.moveDown();

    doc.text("Feedback:");

    doc.moveDown();

    doc.text(feedback);

    doc.end();

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "PDF generation failed",
    });

  }

});

module.exports = router;