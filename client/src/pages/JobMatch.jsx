import { useState } from "react";
import axios from "axios";

const JobMatch = () => {

  const resumeText =
    localStorage.getItem("resumeText");

  const [jobDescription, setJobDescription] =
    useState("");

  const [result, setResult] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  if (!resumeText) {

    return (

      <div className="min-h-screen bg-black text-white flex items-center justify-center">

        <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 text-center">

          <h1 className="text-3xl font-bold mb-4">
            Resume Not Found
          </h1>

          <p className="text-gray-400">
            Please upload your resume first in
            Resume Analyzer.
          </p>

        </div>

      </div>

    );

  }

  const analyze = async () => {

    if (!jobDescription.trim()) {

      alert("Please enter Job Description");

      return;

    }

    try {

      setLoading(true);

      const response =
        await axios.post(
          "http://localhost:5000/api/job-match/match",
          {
            resumeText,
            jobDescription,
          }
        );

      setResult(response.data);

    } catch (error) {

      console.log(error);

      alert("Analysis failed");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-black text-white p-6">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          ATS Resume Matcher
        </h1>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">

          <h2 className="text-xl font-bold mb-3">
            Job Description
          </h2>

          <textarea
            rows="12"
            placeholder="Paste Job Description Here..."
            value={jobDescription}
            onChange={(e) =>
              setJobDescription(e.target.value)
            }
            className="w-full bg-black border border-gray-700 rounded-xl p-4 outline-none"
          />

        </div>

        <button
          onClick={analyze}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold"
        >
          {loading
            ? "Analyzing..."
            : "Analyze Match"}
        </button>

        {result && (

          <div className="mt-8 bg-gray-900 border border-gray-800 rounded-2xl p-6">

            <h2 className="text-4xl font-bold text-green-400 mb-6">

              ATS Score: {result.score}%

            </h2>

            {/* MATCHED */}

            <div className="mb-8">

              <h3 className="text-2xl font-bold text-green-400 mb-3">
                Matched Skills
              </h3>

              {result.matched.length === 0 ? (

                <p className="text-gray-400">
                  No matched skills found
                </p>

              ) : (

                <ul className="space-y-2">

                  {result.matched.map((skill) => (

                    <li
                      key={skill}
                      className="text-green-300"
                    >
                      ✓ {skill}
                    </li>

                  ))}

                </ul>

              )}

            </div>

            {/* MISSING */}

            <div className="mb-8">

              <h3 className="text-2xl font-bold text-red-400 mb-3">
                Missing Skills
              </h3>

              {result.missing.length === 0 ? (

                <p className="text-gray-400">
                  No missing skills 🎉
                </p>

              ) : (

                <ul className="space-y-2">

                  {result.missing.map((skill) => (

                    <li
                      key={skill}
                      className="text-red-300"
                    >
                      ✗ {skill}
                    </li>

                  ))}

                </ul>

              )}

            </div>

            {/* RECOMMENDATIONS */}

            <div>

              <h3 className="text-2xl font-bold text-yellow-400 mb-3">
                Recommendations
              </h3>

              <ul className="space-y-2 text-gray-300">

                {result.missing.map((skill) => (

                  <li key={skill}>
                    • Add projects or experience related to {skill}
                  </li>

                ))}

              </ul>

            </div>

          </div>

        )}

      </div>

    </div>

  );

};

export default JobMatch;