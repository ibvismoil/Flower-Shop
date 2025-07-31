import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";

const getUserId = () =>
  localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).id : null;
const getToken = () => localStorage.getItem("token") || null;

const Wishlist = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    const userId = getUserId();
    if (!userId || !getToken()) return setFavorites([]);
    const res = await fetch(
      `https://flower-backend-betav2.vercel.app/api/favorites?where[user][equals]=${userId}`,
      { headers: { Authorization: `JWT ${getToken()}` } }
    );
    const data = await res.json();
    setFavorites(data.docs || []);
  };

  const removeFavorite = async (favoriteId) => {
    await fetch(
      `https://flower-backend-betav2.vercel.app/api/favorites/${favoriteId}`,
      {
        method: "DELETE",
        headers: { Authorization: `JWT ${getToken()}` },
      }
    );
    fetchFavorites();
  };

  if (!favorites.length) {
    return <p className="text-center text-gray-500 mt-8">Ваш список избранного пуст</p>;
  }

  return (
    <div>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {favorites.map((fav) => {
        const product = typeof fav.product === "object" ? fav.product : null;
        if (!product) return null;
        const imgUrl = product.image?.url || "";

        return (
          <div
            key={fav.id}
            className="border rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col"
          >
            {imgUrl && (
              <img
                src={imgUrl}
                alt={product.title}
                className="w-full h-48 object-cover rounded-lg mb-2"
              />
            )}
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-lg">{product.title}</h3>
              <Heart className="text-xl text-red-500" />
            </div>
            <span className="text-green-600 font-semibold mt-1">
              {product.price} сум
            </span>
            <small className="text-gray-500">{product.minidescription}</small>

            <button
              onClick={() => removeFavorite(fav.id)}
              className="mt-auto bg-red-100 hover:bg-red-200 text-red-600 py-2 rounded-lg transition"
            >
              Удалить
            </button>
          </div>
        );
      })}
    </div>
    </div>
  );
};

export default Wishlist;
