const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const executeRoute = require("./routes/executeRoute");
const aiRoute = require("./routes/aiRoute");
const authRoute = require("./routes/authRoute");
const codeReviewRoute =
require("./routes/codeReviewRoute");
const resumeRoute = require("./routes/resumeRoute");
const interviewRoute =
  require("./routes/interviewRoute");
const reportRoute =
  require("./routes/reportRoute");
const jobMatchRoute =
require("./routes/jobMatchRoute");


connectDB();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/code", executeRoute);
app.use("/api/ai", aiRoute);
app.use("/api/auth", authRoute);
app.use("/api/review", codeReviewRoute);
app.use("/api/resume", resumeRoute);
app.use(
  "/api/interview",
  interviewRoute
);
app.use(
  "/api/report",
  reportRoute
);
app.use(
  "/api/job-match",
  jobMatchRoute
);

app.get("/", (req, res) => {
  res.send("Server is running...");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});