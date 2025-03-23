import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setToken }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <img
        onClick={() => navigate("/")}
        className="custom-logo cursor-pointer"
        src={assets.logo}
        alt=""
      />
      <button
        onClick={() => setToken("")}
        className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm cursor-pointer hover:bg-indigo-950 transition duration-300"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
