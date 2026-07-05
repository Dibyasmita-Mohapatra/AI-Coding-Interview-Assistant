const StatCard = ({ title, value }) => {
  return (
    <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">

      <h2 className="text-gray-400 text-lg">
        {title}
      </h2>

      <h1 className="text-4xl font-bold text-white mt-4">
        {value}
      </h1>

    </div>
  );
};

export default StatCard;