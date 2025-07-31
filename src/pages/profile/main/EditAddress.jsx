import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import icon from "../../../assets/icons.svg";

const EditAddress = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const userFromStorage = JSON.parse(localStorage.getItem("user") || "{}");

  const [formData, setFormData] = useState({
    country: "Узбекистан",
    city: "",
    street: "",
    house: "",
    housenumber: "",
  });

  useEffect(() => {
    if (userFromStorage) {
      setFormData((prev) => ({
        ...prev,
        country: userFromStorage.country || "Узбекистан",
        city: userFromStorage.city || "",
        street: userFromStorage.street || "",
        house: userFromStorage.house || "",
        housenumber: userFromStorage.housenumber || "",
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const saveChanges = async () => {
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("❌ Вы не авторизованы");
        return;
      }

      const res = await fetch(
        `https://flower-backend-betav2.vercel.app/api/users/${userFromStorage.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (res.ok && (data.user || data.doc || data)) {
        const updatedUser = data.user || data.doc || data;
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setMessage("✅ Адрес успешно обновлен!");
        setTimeout(() => navigate("/"), 1500);
      } else {
        setMessage(`❌ ${data.message || "Не удалось обновить адрес"}`);
      }
    } catch (error) {
      setMessage(
        "❌ Ошибка соединения: " + (error.message || "Попробуйте позже")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-md w-full mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="flex items-center justify-center w-full">
        <img src={icon} className="w-36 mx-auto" alt="logo" />
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Мой адрес
      </h2>
      <p className="text-sm text-gray-500 text-center mb-6">
        Обновите информацию об адресе
      </p>

      <input name="country" type="text" value={formData.country}
        readOnly
        className="px-4 py-2 border border-gray-200 bg-gray-50 rounded-lg text-gray-600"
      />
      <input name="city" type="text" placeholder="Город"
        value={formData.city}
        onChange={handleChange}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600"
        disabled={loading}
      />
      <input name="street" type="text" placeholder="Улица"
        value={formData.street}
        onChange={handleChange}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600"
        disabled={loading}
      />
      <div className="grid grid-cols-2 gap-4">
        <input name="house" type="text" placeholder="Дом"
          value={formData.house}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600"
          disabled={loading}
        />
        <input name="housenumber" type="text" placeholder="Квартира"
          value={formData.housenumber}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600"
          disabled={loading}
        />
      </div>

      {message && (
        <p
          className={`text-sm text-center p-2 rounded-md mt-2 ${
            message.includes("✅")
              ? "bg-green-50 text-green-600"
              : "bg-red-50 text-red-600"
          }`}
        >
          {message}
        </p>
      )}

      <button
        onClick={saveChanges}
        disabled={loading}
        className="mt-2 bg-[#0c6435] hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg transition"
      >
        {loading ? "Сохранение..." : "Сохранить адрес"}
      </button>
    </div>
  );
};

export default EditAddress