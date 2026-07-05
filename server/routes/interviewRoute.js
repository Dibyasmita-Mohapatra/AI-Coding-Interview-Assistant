const express = require("express");
const router = express.Router();

const Interview = require("../models/Interview");

router.post("/save", async (req, res) => {

  try {

    const interview =
      await Interview.create(req.body);

    res.json(interview);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed",
    });

  }

});

router.get("/all", async (req, res) => {

  try {

    const interviews =
      await Interview.find().sort({
        createdAt: -1,
      });

    res.json(interviews);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed",
    });

  }

});

/* ADD THIS NEW ROUTE */

router.get("/stats", async (req, res) => {

  try {

    const interviews =
      await Interview.find();

    const totalInterviews =
      interviews.length;

    const averageScore =
      interviews.length > 0
        ? (
            interviews.reduce(
              (sum, item) =>
                sum + item.score,
              0
            ) / interviews.length
          ).toFixed(1)
        : 0;

    const codingCount =
      interviews.filter(
        (item) =>
          item.type === "coding"
      ).length;

    const hrCount =
      interviews.filter(
        (item) =>
          item.type === "hr"
      ).length;

    const resumeCount =
      interviews.filter(
        (item) =>
          item.type === "resume"
      ).length;

    res.json({
      totalInterviews,
      averageScore,
      codingCount,
      hrCount,
      resumeCount,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed",
    });

  }

});

router.get("/recent", async (req, res) => {

  try {

    const interviews =
      await Interview.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json(interviews);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed",
    });

  }

});

module.exports = router;