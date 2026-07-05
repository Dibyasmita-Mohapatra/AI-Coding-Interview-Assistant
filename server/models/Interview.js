const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    type: {
      type: String,
      enum: ["coding", "hr", "resume"],
    },

    score: Number,

    feedback: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Interview",
  interviewSchema
);