import React from "react";
import { Routes, Route, NavLink, useNavigate, Link } from "react-router-dom";
import EditAccount from "./main/EditAccount";
import Wishlist from "./main/Wishlist";
import { Heart, Home, LogOut, LucideBookmarkX, Sigma, User } from "lucide-react";
import EditAddress from "./main/EditAddress";

const Orders = () => <div className="p-6 bg-white rounded-xl shadow">📦 Тут будут заказы</div>;
const Address = () => <div className="p-6 bg-white rounded-xl shadow">🏠 Тут будет адрес</div>;

const ProfilePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  const navItems = [
    { path: "account", label: "Профиль", icon: <User /> },
    { path: "wishlist", label: "Избранное", icon: <Heart /> },
    { path: "orders", label: "Заказы", icon: <LucideBookmarkX /> },
    { path: "address", label: "Адрес", icon: <Home /> },
  ];

  return (
    <div className="">
      <div className="flex flex-col md:flex-row max-w-6xl mx-auto mt-12 gap-6 px-4">
        <div className="hidden md:flex w-64 bg-white shadow rounded-xl p-4 flex-col gap-2">
          {navItems.map(({ path, label, icon }) => (
            <NavLink
              key={path}
              to={`/profile/${path}`}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition ${isActive ? "bg-[#0c6435] text-white" : "hover:bg-green-50 text-gray-700"
                }`
              }>
              {icon} {label}
            </NavLink>
          ))}

          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2 rounded-lg transition hover:bg-red-50 text-red-600 mt-4">
            <LogOut /> Выйти
          </button>
          <Link className="flex items-center gap-3 px-4 py-2 rounded-lg transition hover:bg-red-50 text-red-600" to='/'>Домой</Link>
        </div>

        <div className="flex-1">
          <Routes>
            <Route path="account" element={<EditAccount />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="orders" element={<Orders />} />
            <Route path="address" element={<EditAddress />} />
          </Routes>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md flex justify-around py-2 md:hidden">
          {navItems.map(({ path, label, icon }) => (
            <NavLink
              key={path}
              to={`/profile/${path}`}
              className={({ isActive }) =>
                `flex flex-col items-center text-xs ${isActive ? "text-green-600" : "text-gray-500"
                }`
              }>
              {icon}
              {label}
            </NavLink>
          ))}
          <button onClick={handleLogout} className="flex flex-col items-center text-xs text-red-500">
            <LogOut />
            Выйти
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
