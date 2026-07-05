import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";
import { Link } from "react-router-dom";

const Home = () => {

  return (

    <div className="bg-black min-h-screen overflow-x-hidden text-white">

      {/* HERO SECTION */}
      <Hero />

      {/* FEATURES SECTION */}
      <section className="px-6 py-20">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-4xl md:text-5xl font-bold text-center mb-14">
            Powerful AI Features
          </h1>

          <div className="grid md:grid-cols-3 gap-8">

            <FeatureCard
              title="AI Coding Interview"
              desc="Practice coding interview questions with AI-generated hints, explanations, and solutions."
            />

            <FeatureCard
              title="Online Code Compiler"
              desc="Run and test code instantly in multiple programming languages directly in browser."
            />

            <FeatureCard
              title="AI HR Interview"
              desc="Experience real HR interview simulations with AI voice interaction and feedback."
            />

          </div>

        </div>

      </section>

      {/* EXTRA SECTION */}
      <section className="px-6 py-20 bg-gray-950">

        <div className="max-w-6xl mx-auto text-center">

          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            Crack Your Dream Job With AI
          </h1>

          <p className="text-gray-400 text-lg leading-8 max-w-3xl mx-auto">
            Practice coding interviews, improve communication skills,
            analyze resumes, and prepare for real company interviews
            using advanced AI tools.
          </p>

          <div className="flex flex-wrap justify-center gap-5 mt-10">

            <Link
              to="/register"
              className="bg-green-600 hover:bg-green-700 px-8 py-4 rounded-2xl font-semibold transition"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-2xl font-semibold transition"
            >
              Login
            </Link>

          </div>

        </div>

      </section>

    </div>

  );
};

export default Home;