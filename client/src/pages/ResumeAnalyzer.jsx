import { useState } from "react";
import axios from "axios";

const ResumeAnalyzer = () => {

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState("");

  const analyzeResume = async () => {

    if (!file) {
      alert("Please select a PDF");
      return;
    }

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append("resume", file);

      const response = await axios.post(
        "https://ai-coding-interview-assistant-1.onrender.com/api/resume/analyze",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setAnalysis(response.data.analysis);

      localStorage.setItem(
        "resumeText",
        response.data.resumeText
      );

    } catch (error) {

      console.log(error);

      alert("Resume analysis failed");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-black text-white p-6">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          AI Resume Analyzer
        </h1>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">

          <input
            type="file"
            accept=".pdf"
            onChange={(e) =>
              setFile(e.target.files[0])
            }
            className="w-full bg-black border border-gray-700 p-4 rounded-xl"
          />

          <button
            onClick={analyzeResume}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl mt-6"
          >
            Analyze Resume
          </button>

        </div>

        {loading && (

          <div className="mt-8 text-green-400 text-xl">
            Analyzing Resume...
          </div>

        )}

        {analysis && (

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mt-8">

            <h2 className="text-2xl font-bold mb-4">
              AI Resume Feedback
            </h2>

            <pre className="whitespace-pre-wrap text-green-400 leading-7">
              {analysis}
            </pre>

          </div>

        )}

      </div>

    </div>

  );

};

export default ResumeAnalyzer;
