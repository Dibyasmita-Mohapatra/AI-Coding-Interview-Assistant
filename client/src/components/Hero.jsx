import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-black text-white min-h-[90vh] flex items-center px-6">

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        <div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Crack Your <span className="text-blue-500">Coding Interviews</span> with AI
          </h1>

          <p className="text-gray-400 text-lg mt-6">
            Practice coding interviews, get AI feedback,
            solve DSA questions, and improve your placement preparation.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">

            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-lg font-semibold transition"
            >
              Start Interview
            </Link>

            <Link
              to="/login"
              className="border border-gray-600 hover:border-white px-6 py-3 rounded-xl text-lg transition"
            >
              Login
            </Link>

          </div>
        </div>

        <div className="flex justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
            alt="AI"
            className="w-[350px] md:w-[500px] animate-pulse"
          />
        </div>

      </div>

    </section>
  );
};

export default Hero;