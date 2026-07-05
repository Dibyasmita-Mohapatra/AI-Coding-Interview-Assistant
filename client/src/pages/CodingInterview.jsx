import { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import AIChat from "../components/AIChat";

const CodingInterview = () => {

  const [language, setLanguage] = useState("javascript");

  const [code, setCode] = useState(`function hello() {
  console.log("Hello World");
}`);

  const [output, setOutput] = useState("");

  const [review, setReview] =
  useState("");

  // RUN CODE
  const runCode = async () => {

    try {

      setOutput("Running...");

      const response = await axios.post(
        "https://ai-coding-interview-assistant-1.onrender.com/api/code/run",
        {
          code,
          language,
        }
      );

      setOutput(
        response.data.stdout ||
        response.data.compile_output ||
        response.data.stderr ||
        "No Output"
      );

    } catch (error) {

      console.log(error);

      setOutput("Error running code");

    }
  };

  const reviewCode = async () => {

    try {

      setReview("Reviewing code...");

      const response =
        await axios.post(
          "https://ai-coding-interview-assistant-1.onrender.com/api/review",
          {
            code,
            language,
          }
        );

      setReview(
        response.data.review
      );

    } catch (error) {

      console.log(error);

      setReview(
        "Failed to review code"
      );

    }

  };

  // AI HINT
  const getHint = async () => {

    try {

      setOutput("Generating AI Hint...");

      const response = await axios.post(
        "https://ai-coding-interview-assistant-1.onrender.com/api/ai/hint",
        {
          problem: `
          Given an array of integers nums and a target,
          return indices of two numbers such that they add up to target.
          `,
        }
      );

      setOutput(response.data.hint);

    } catch (error) {

      console.log(error);

      setOutput("Failed to generate AI hint");

    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-6">

      {/* TOP SECTION */}
      <div className="flex flex-col lg:flex-row gap-6">

        {/* LEFT PANEL */}
        <div className="lg:w-[40%] bg-gray-900 border border-gray-800 rounded-2xl p-6">

          <h1 className="text-3xl font-bold mb-6">
            Coding Interview
          </h1>

          {/* PROBLEM */}
          <div className="mb-6">

            <h2 className="text-2xl font-semibold mb-4">
              Problem
            </h2>

            <p className="text-gray-400 leading-7">
              Given an array of integers nums and an integer target,
              return indices of the two numbers such that they add up to target.
            </p>

          </div>

          {/* EXAMPLE */}
          <div className="mb-6">

            <h2 className="text-xl font-semibold mb-3">
              Example
            </h2>

            <div className="bg-black p-4 rounded-xl text-green-400">
              Input: nums = [2,7,11,15], target = 9
              <br />
              Output: [0,1]
            </div>

          </div>

          {/* AI HINT BUTTON */}
          <button
            onClick={getHint}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-5 py-3 rounded-xl transition"
          >
            Get AI Hint
          </button>

        </div>

        {/* RIGHT SIDE */}
        <div className="lg:w-[60%] flex flex-col gap-6">

          {/* AI CHAT */}
          <AIChat />

          {/* CODE EDITOR SECTION */}
          <div>

            {/* TOP BAR */}
            <div className="flex flex-wrap justify-between items-center gap-4 mb-4">

              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-gray-900 border border-gray-700 px-4 py-3 rounded-xl outline-none"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="cpp">C++</option>
                <option value="java">Java</option>
              </select>

              <div className="flex gap-3">

                <button
                  onClick={runCode}
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold transition"
                >
                  Run Code
                </button>

                <button
                  onClick={reviewCode}
                  className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl font-semibold transition"
                >
                  Review Code
                </button>

              </div>

            </div>

            {/* MONACO EDITOR */}
            <div className="rounded-2xl overflow-hidden border border-gray-800">

              <Editor
                height="500px"
                theme="vs-dark"
                language={language}
                value={code}
                onChange={(value) => setCode(value)}
              />

            </div>

            {/* OUTPUT */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 mt-4">

              <h2 className="text-xl font-semibold mb-3">
                Output
              </h2>

              <p className="text-green-400 whitespace-pre-wrap">
                {output}
              </p>

            </div>

            {/* AI CODE REVIEW */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 mt-4">

              <h2 className="text-xl font-semibold mb-3">
                AI Code Review
              </h2>

              <p className="text-gray-300 whitespace-pre-wrap">
                {review || "Click 'Review Code' to get AI feedback on your code."}
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default CodingInterview;
