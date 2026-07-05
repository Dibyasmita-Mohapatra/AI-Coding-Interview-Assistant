import React from "react";

const FeatureCard = ({ title, desc }) => {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:scale-105 transition">
      <h2 className="text-2xl font-bold text-white mb-4">
        {title}
      </h2>

      <p className="text-gray-400">
        {desc}
      </p>
    </div>
  );
};

export default FeatureCard;