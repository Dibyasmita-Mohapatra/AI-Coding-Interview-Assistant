import {
  LayoutDashboard,
  Code2,
  Mic,
  FileText,
  History,
  Briefcase,
  FilePenLine,
  LogOut,
} from "lucide-react";

import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

  };

  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={22} />,
      path: "/dashboard",
    },
    {
      name: "Coding Interview",
      icon: <Code2 size={22} />,
      path: "/coding-interview",
    },
    {
      name: "HR Interview",
      icon: <Mic size={22} />,
      path: "/hr-interview",
    },
    {
      name: "Resume Analyzer",
      icon: <FileText size={22} />,
      path: "/resume-analyzer",
    },
    {
      name: "ATS Match",
      icon: <Briefcase size={22} />,
      path: "/job-match",
    },
    {
      name: "Resume Builder",
      icon: <FilePenLine size={22} />,
      path: "/resume-builder",
    },
    {
      name: "Interview History",
      icon: <History size={22} />,
      path: "/history",
    },
  ];

  return (
    <div
      className="
        hidden
        md:flex
        w-[260px]
        bg-gray-950
        border-r
        border-gray-800
        min-h-screen
        p-6
        flex-col
      "
    >
      <h1 className="text-2xl font-bold text-white mb-10">
        AI Interview
      </h1>

      <div className="space-y-3 flex-1">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
              location.pathname === item.path
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );

};

export default Sidebar;