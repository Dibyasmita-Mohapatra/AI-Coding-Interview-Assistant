import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleRegister = async () => {

    try {

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      alert("Registration successful");

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert("Registration failed");

    }
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center p-6">

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 w-full max-w-md">

        <h1 className="text-4xl font-bold text-white mb-8">
          Register
        </h1>

        <div className="space-y-5">

          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="w-full bg-black border border-gray-700 rounded-xl p-4 text-white outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full bg-black border border-gray-700 rounded-xl p-4 text-white outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full bg-black border border-gray-700 rounded-xl p-4 text-white outline-none"
          />

          <button
            onClick={handleRegister}
            className="w-full bg-green-600 hover:bg-green-700 py-4 rounded-xl text-white font-semibold"
          >
            Register
          </button>

        </div>

      </div>

    </div>
  );
};

export default Register;