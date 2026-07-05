import { useNavigate } from "react-router-dom";

const InterviewCard = ({
  title,
  desc,
  button,
  route,
}) => {

  const navigate = useNavigate();

  return (

    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">

      <h1 className="text-2xl font-bold text-white mb-4">
        {title}
      </h1>

      <p className="text-gray-400 mb-6">
        {desc}
      </p>

      <button
        onClick={() => navigate(route)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl transition"
      >
        {button}
      </button>

    </div>

  );
};

export default InterviewCard;