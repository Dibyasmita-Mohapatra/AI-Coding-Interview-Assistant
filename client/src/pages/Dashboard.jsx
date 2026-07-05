import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import InterviewCard from "../components/InterviewCard";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {

  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalInterviews: 0,
    codingCount: 0,
    averageScore: 0,
  });

  const [recent, setRecent] = useState([]);

  useEffect(() => {

    fetchStats();
    fetchRecent();

  }, []);

  const fetchStats = async () => {

    try {

      const response = await axios.get(
        "https://ai-coding-interview-assistant-1.onrender.com/api/interview/stats"
      );

      setStats(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const fetchRecent = async () => {

    try {

      const response = await axios.get(
        "https://ai-coding-interview-assistant-1.onrender.com/api/interview/recent"
      );

      setRecent(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="bg-black min-h-screen flex">

      <Sidebar />

      <div className="flex-1 p-4 md:p-6">

        {/* HEADER */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-10">

          <div>

            <h1 className="text-2xl md:text-4xl font-bold text-white">
              Welcome Back 👋
            </h1>

            <p className="text-gray-400 mt-2">
              Practice interviews and improve your coding skills.
            </p>

          </div>

          <button
            onClick={() => navigate("/coding-interview")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl transition"
          >
            Start New Interview
          </button>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

          <StatCard
            title="Total Interviews"
            value={stats.totalInterviews}
          />

          <StatCard
            title="Coding Interviews"
            value={stats.codingCount}
          />

          <StatCard
            title="Average Score"
            value={`${stats.averageScore}%`}
          />

        </div>

        {/* RECENT ACTIVITY */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-10">

          <h2 className="text-2xl font-bold text-white mb-6">
            Recent Activity
          </h2>

          {recent.length === 0 ? (

            <p className="text-gray-400">
              No interviews found.
            </p>

          ) : (

            <div className="space-y-4">

              {recent.map((item) => (

                <div
                  key={item._id}
                  className="flex justify-between items-center border-b border-gray-800 pb-4"
                >

                  <div>

                    <h3 className="text-white font-semibold">
                      {item.type}
                    </h3>

                    <p className="text-gray-400 text-sm">
                      {item.feedback}
                    </p>

                  </div>

                  <div className="text-green-400 font-bold text-lg">
                    {item.score}%
                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

        {/* INTERVIEW CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <InterviewCard
            title="Coding Interview"
            desc="Practice DSA and coding interview questions with AI feedback."
            button="Start Coding"
            route="/coding-interview"
          />

          <InterviewCard
            title="HR Interview"
            desc="Improve communication and confidence with AI HR interviews."
            button="Start HR Round"
            route="/hr-interview"
          />

        </div>

      </div>

    </div>

  );

};

export default Dashboard;
