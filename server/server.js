const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

// Routes
const executeRoute = require("./routes/executeRoute");
const aiRoute = require("./routes/aiRoute");
const authRoute = require("./routes/authRoute");
const codeReviewRoute = require("./routes/codeReviewRoute");
const resumeRoute = require("./routes/resumeRoute");
const interviewRoute = require("./routes/interviewRoute");
const reportRoute = require("./routes/reportRoute");
const jobMatchRoute = require("./routes/jobMatchRoute");

// Connect MongoDB
connectDB();

const app = express();

/* ===========================
   Middlewares
=========================== */

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      process.env.CLIENT_URL,
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ===========================
   API Routes
=========================== */

app.use("/api/code", executeRoute);
app.use("/api/ai", aiRoute);
app.use("/api/auth", authRoute);
app.use("/api/review", codeReviewRoute);
app.use("/api/resume", resumeRoute);
app.use("/api/interview", interviewRoute);
app.use("/api/report", reportRoute);
app.use("/api/job-match", jobMatchRoute);

/* ===========================
   Health Check
=========================== */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AI Coding Interview Assistant Backend Running 🚀",
  });
});

/* ===========================
   404 Route
=========================== */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

/* ===========================
   Global Error Handler
=========================== */

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

/* ===========================
   Start Server
=========================== */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
