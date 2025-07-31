import React, { useState, useEffect } from "react";
import { Heart, Loader2 } from "lucide-react";

const getUserId = () =>
  localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).id : null;

const getToken = () => localStorage.getItem("token") || null;
const getCart = () => JSON.parse(localStorage.getItem("cart") || "[]");
const setCart = (cart) => localStorage.setItem("cart", JSON.stringify(cart));

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCartState] = useState(getCart());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://flower-backend-betav2.vercel.app/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.docs || []))
      .catch(console.error);
  }, []);

  useEffect(() => {
    setLoading(true);
    let url = "https://flower-backend-betav2.vercel.app/api/products";
    if (selectedCategory) url += `?where[category][equals]=${selectedCategory}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.docs || []);
        setLoading(false);
      })
      .catch(() => {
        setProducts([]);
        setLoading(false);
      });
  }, [selectedCategory]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    const userId = getUserId();
    if (!userId || !getToken()) return setFavorites([]);

    try {
      const res = await fetch(
        `https://flower-backend-betav2.vercel.app/api/favorites?where[user][equals]=${userId}`,
        { headers: { Authorization: `JWT ${getToken()}` } }
      );
      const data = await res.json();
      setFavorites(data.docs || []);
    } catch {
      setFavorites([]);
    }
  };

  const toggleFavorite = async (productId) => {
    const fav = favorites.find(
      (f) => (typeof f.product === "object" ? f.product.id : f.product) === productId
    );

    const token = getToken();
    const userId = getUserId();
    if (!userId || !token) return alert("Сначала войдите в аккаунт!");

    if (fav) {
      await fetch(
        `https://flower-backend-betav2.vercel.app/api/favorites/${fav.id}`,
        { method: "DELETE", headers: { Authorization: `JWT ${token}` } }
      );
    } else {
      await fetch("https://flower-backend-betav2.vercel.app/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
        body: JSON.stringify({ user: userId, product: productId }),
      });
    }
    fetchFavorites();
  };

  const addToCart = (productId) => {
    const cart = getCart();
    const idx = cart.findIndex((item) => item.product === productId);
    if (idx > -1) cart[idx].quantity += 1;
    else cart.push({ product: productId, quantity: 1 });
    setCart(cart);
    setCartState([...cart]);
  };

  const isFavorite = (productId) =>
    favorites.some(
      (f) =>
        (typeof f.product === "object" ? f.product.id : f.product) === productId
    );

  return (
    <div className="containers">
      <div className="mt-20 px-4 sm:px-6 lg:px-8 min-h-screen pb-12">

        <div className="mb-6">
          <div className="flex lg:hidden overflow-x-auto space-x-2 pb-2 scrollbar-hide">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm ${
                !selectedCategory ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700"
              }`}
            >
              Все
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm ${
                  selectedCategory === cat.id
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex flex-col w-64 space-y-2 p-4 rounded-2xl top-20">
            <h3 className="font-bold text-lg mb-3">Категории</h3>
            <button
              onClick={() => setSelectedCategory(null)}
              className={`w-full px-4 py-3 rounded-xl text-left ${
                !selectedCategory
                  ? "bg-[#0c6435] text-white font-medium"
                  : "hover:bg-green-50 text-gray-700"
              }`}>
              Все товары
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`w-full px-4 py-3 rounded-xl text-left ${
                  selectedCategory === cat.id
                    ? "bg-[#0c6435] text-white font-medium"
                    : "hover:bg-green-50 text-gray-700"
                }`}>
                {cat.name}
              </button>
            ))}
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-green-600" size={40} />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <p>Нет товаров в этой категории.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => {
              const imgUrl = product.image?.url || "/placeholder-flower.jpg";
              const isFav = isFavorite(product.id);

              return (
                <div key={product.id} className="max-w-[300px] w-full border-t-2 border-t-transparent bg-gray-100 text-lg p-2 transi group rounded">
                  <div className="relative">
                    <img src={imgUrl} alt={product.title} className="bg-[#FBFBFB] transi w-full  flex justify-center items-center object-cover"/>
                    <button onClick={() => toggleFavorite(product.id)} className="absolute top-2 right-2 p-1 cursor-pointer">
                      <Heart fill={isFav ? "#ef4444" : "transparent"} size={18}/>
                    </button>
                  </div>
                  <div className="p-3 flex-1 flex flex-col">
                    <h3 className="font-bold mt-4 group-hover:text-[#46A358] transi">{product.title}</h3>
                    <span className="text-black font-semibold">
                      {product.price} сум
                    </span>
                    <button onClick={() => addToCart(product.id)} className="mt-auto w-full bg-[#0c6435] cursor-pointer text-white py-2 rounded-lg text-sm">
                      В корзину
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
