import { useEffect, useState } from "react";
import axios from "axios";

const HRInterview = () => {

  const [company, setCompany] = useState("Google");

  const [difficulty, setDifficulty] =
    useState("Easy");

  const [question, setQuestion] = useState("");

  const [answer, setAnswer] = useState("");

  const [feedback, setFeedback] = useState("");

  const [loading, setLoading] = useState(false);

  const [score, setScore] = useState("");

  // GET QUESTION
  const getQuestion = async () => {

    try {

      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/ai/hr-question",
        {
          company,
          difficulty,
        }
      );

      setQuestion(response.data.question);

      setAnswer("");

      setFeedback("");

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  // SPEECH RECOGNITION
  const startListening = () => {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

      alert("Speech Recognition not supported");

      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.continuous = false;

    recognition.lang = "en-US";

    recognition.start();

    recognition.onresult = (event) => {

      const transcript =
        event.results[0][0].transcript;

      setAnswer(transcript);

    };
  };

  // SUBMIT ANSWER
  const submitAnswer = async () => {

    try {

      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/ai/hr-feedback",
        {
          question,
          answer,
        }
      );

      setFeedback(response.data.feedback);

      setScore(response.data.score);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    getQuestion();

  }, []);

  return (

    <div className="min-h-screen bg-black text-white p-6">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          AI HR Interview
        </h1>

        {/* COMPANY + DIFFICULTY */}

        <div className="grid md:grid-cols-2 gap-4 mb-6">

          <div>

            <label className="block mb-2">
              Company
            </label>

            <select
              value={company}
              onChange={(e) =>
                setCompany(e.target.value)
              }
              className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3"
            >
              <option>Google</option>
              <option>Amazon</option>
              <option>Microsoft</option>
              <option>TCS</option>
              <option>Infosys</option>
              <option>Wipro</option>
            </select>

          </div>

          <div>

            <label className="block mb-2">
              Difficulty
            </label>

            <select
              value={difficulty}
              onChange={(e) =>
                setDifficulty(e.target.value)
              }
              className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3"
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>

          </div>

        </div>

        {/* QUESTION */}

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">

          <h2 className="text-2xl font-semibold mb-4">
            Interview Question
          </h2>

          <p className="text-gray-300 leading-8">

            {loading
              ? "Loading..."
              : question}

          </p>

        </div>

        {/* ANSWER */}

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">

          <h2 className="text-2xl font-semibold mb-4">
            Your Answer
          </h2>

          <textarea
            value={answer}
            onChange={(e) =>
              setAnswer(e.target.value)
            }
            rows="6"
            className="w-full bg-black border border-gray-700 rounded-xl p-4 outline-none"
            placeholder="Speak or type your answer..."
          />

          <div className="flex flex-wrap gap-4 mt-6">

            <button
              onClick={startListening}
              className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl"
            >
              🎤 Start Speaking
            </button>

            <button
              onClick={submitAnswer}
              className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-xl"
            >
              Submit Answer
            </button>

            <button
              onClick={getQuestion}
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-5 py-3 rounded-xl"
            >
              Next Question
            </button>

          </div>

        </div>

        {/* FEEDBACK */}

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">

          <h2 className="text-2xl font-semibold mb-4">
            AI Feedback
          </h2>

          {score && (

            <div className="mb-6">

              <h3 className="text-xl font-bold text-green-400">
                Score: {score}/10
              </h3>

            </div>

          )}

          <p className="text-gray-300 whitespace-pre-wrap leading-8">

            {feedback ||
              "AI feedback will appear here..."}

          </p>

        </div>

      </div>

    </div>

  );
};

export default HRInterview;