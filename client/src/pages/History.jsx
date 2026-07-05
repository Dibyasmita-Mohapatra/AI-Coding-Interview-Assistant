import { useEffect, useState } from "react";
import axios from "axios";

const History = () => {

  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/interview/all"
      );

      setInterviews(res.data);

    } catch (error) {

      console.log(error);

    }
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
            className="bg-gray-900 border border-gray-800 p-5 rounded-xl"
          >
            <h2 className="text-xl font-semibold">
              {item.type}
            </h2>

            <p className="text-gray-400">
              Score: {item.score}
            </p>

            <p className="text-gray-300 mt-2">
              {item.feedback}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
};

export default History;