import React from "react";
import icon from "../assets/icons.svg";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="bg-white p-10 rounded-3xl  flex flex-col items-center animate-fadeIn">

        <div className="w-36 h-36 flex items-center justify-center">
          <img src={icon} alt="Logo" className="w-35 h-35 "/>
        </div>

        <h1 className="text-7xl font-extrabold text-[#0c6435] mt-8 animate-bounce">
          404
        </h1>
        <p className="text-gray-500 mt-3 text-lg text-center">
          Oops! Страница не найдена.
        </p>

        <a href="/" className="mt-8 bg-[#0c6435] text-white px-8 py-3 rounded-xl hover:bg-green-700 transition transform hover:scale-105 shadow-md">
          На главную
        </a>
      </div>
    </div>
  );
}
