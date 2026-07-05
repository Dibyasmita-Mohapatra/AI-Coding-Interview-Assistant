import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const token = localStorage.getItem("token");

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

  };

  return (

    <nav className="bg-black border-b border-gray-800">

      <div className="px-4 md:px-6 py-4">

        {/* TOP BAR */}

        <div className="flex justify-between items-center">

          <h1 className="text-xl md:text-2xl font-bold text-white">
            AI Interview Assistant
          </h1>

          {/* DESKTOP MENU */}

          <div className="hidden md:flex items-center gap-5">

            <Link
              to="/"
              className="text-gray-300 hover:text-white"
            >
              Home
            </Link>

            {token && (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-300 hover:text-white"
                >
                  Dashboard
                </Link>

                <Link
                  to="/coding-interview"
                  className="text-gray-300 hover:text-white"
                >
                  Coding
                </Link>

                <Link
                  to="/hr-interview"
                  className="text-gray-300 hover:text-white"
                >
                  HR Interview
                </Link>
              </>
            )}

            {!token ? (
              <>
                <Link
                  to="/login"
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl text-white"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl text-white"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl text-white"
              >
                Logout
              </button>
            )}

          </div>

          {/* MOBILE BUTTON */}

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>

        </div>

        {/* MOBILE MENU */}

        {open && (

          <div className="md:hidden flex flex-col gap-4 mt-5 pb-3">

            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="text-gray-300 hover:text-white"
            >
              Home
            </Link>

            {token && (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setOpen(false)}
                  className="text-gray-300 hover:text-white"
                >
                  Dashboard
                </Link>

                <Link
                  to="/coding-interview"
                  onClick={() => setOpen(false)}
                  className="text-gray-300 hover:text-white"
                >
                  Coding Interview
                </Link>

                <Link
                  to="/hr-interview"
                  onClick={() => setOpen(false)}
                  className="text-gray-300 hover:text-white"
                >
                  HR Interview
                </Link>

                <Link
                  to="/resume-analyzer"
                  onClick={() => setOpen(false)}
                  className="text-gray-300 hover:text-white"
                >
                  Resume Analyzer
                </Link>

                <Link
                  to="/job-match"
                  onClick={() => setOpen(false)}
                  className="text-gray-300 hover:text-white"
                >
                  ATS Match
                </Link>

                <Link
                  to="/resume-builder"
                  onClick={() => setOpen(false)}
                  className="text-gray-300 hover:text-white"
                >
                  Resume Builder
                </Link>

                <Link
                  to="/history"
                  onClick={() => setOpen(false)}
                  className="text-gray-300 hover:text-white"
                >
                  Interview History
                </Link>
              </>
            )}

            {!token ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="bg-blue-600 text-center px-4 py-2 rounded-xl text-white"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="bg-green-600 text-center px-4 py-2 rounded-xl text-white"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl text-white"
              >
                Logout
              </button>
            )}

          </div>

        )}

      </div>

    </nav>

  );

};

export default Navbar;