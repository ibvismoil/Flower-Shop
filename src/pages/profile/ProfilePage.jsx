import React, { useState } from "react";
import EditAccount from "./main/EditAccount";
// import { FaHeart, FaBox, FaHome, FaUser, FaSignOutAlt } from "react-icons/fa";
import { ArrowDownWideNarrow, ListOrderedIcon, LogOut, LucideVoicemail, User } from "lucide-react";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("account");

  const renderContent = () => {
    switch (activeTab) {
      case "account":
        return <EditAccount />;
      case "wishlist":
        return <div className="p-6 bg-white rounded-xl shadow">💖 Тут будет Wishlist</div>;
      case "orders":
        return <div className="p-6 bg-white rounded-xl shadow">📦 Тут будет Orders</div>;
      case "address":
        return <div className="p-6 bg-white rounded-xl shadow">🏠 Тут будет Address</div>;
      default:
        return null;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="flex max-w-6xl mx-auto mt-12 gap-6 px-4">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow rounded-xl p-4 flex flex-col gap-2">
        <button
          onClick={() => setActiveTab("account")}
          className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
            activeTab === "account"
              ? "bg-[#0c6435] text-white"
              : "hover:bg-green-50 text-gray-700"
          }`}
        >
          <User /> Мой профиль
        </button>
        <button
          onClick={() => setActiveTab("wishlist")}
          className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
            activeTab === "wishlist"
              ? "bg-[#0c6435] text-white"
              : "hover:bg-green-50 text-gray-700"
          }`}
        >
          <LucideVoicemail /> Wishlist
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
            activeTab === "orders"
              ? "bg-[#0c6435] text-white"
              : "hover:bg-green-50 text-gray-700"
          }`}
        >
          <ListOrderedIcon /> Orders
        </button>
        <button
          onClick={() => setActiveTab("address")}
          className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
            activeTab === "address"
              ? "bg-[#0c6435] text-white"
              : "hover:bg-green-50 text-gray-700"
          }`}
        >
          <ArrowDownWideNarrow /> Address
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2 rounded-lg transition hover:bg-red-50 text-red-600 mt-4"
        >
          <LogOut /> Выйти
        </button>
      </div>

      {/* Content */}
      <div className="flex-1">{renderContent()}</div>
    </div>
  );
};

export default ProfilePage;
