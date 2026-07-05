import { useEffect, useState } from "react";
import axios from "axios";

const InterviewHistory = () => {

  const [interviews, setInterviews] =
    useState([]);

  useEffect(() => {

    fetchHistory();

  }, []);

  const fetchHistory = async () => {

    const response =
      await axios.get(
        "https://ai-coding-interview-assistant-1.onrender.com/api/interview/all"
      );

    setInterviews(response.data);

  };

  return (

    <div className="min-h-screen bg-black text-white p-6">

      <h1 className="text-4xl font-bold mb-8">
        Interview History
      </h1>

      <div className="space-y-4">

        {interviews.map((item) => (

          <div
            key={item._id}
            className="bg-gray-900 border border-gray-800 p-6 rounded-2xl"
          >

            <h2 className="text-xl font-bold">
              {item.type.toUpperCase()}
            </h2>

            <p>
              Score: {item.score}
            </p>

            <p className="text-gray-400 mt-2">
              {item.feedback}
            </p>

          </div>

        ))}

      </div>

    </div>

  );
};

export default InterviewHistory;
