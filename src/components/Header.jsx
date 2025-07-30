import React, { useState } from 'react';
import icon from '../assets/icons.svg';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Menu, X } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const token = localStorage.getItem('token');
  const isLoggedIn = !!user && !!token;

  const handleProfileClick = () => {
    navigate(isLoggedIn ? '/profile/account' : '/login');
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 py-2">

          <Link to="/" className="flex items-center hover:opacity-90 transition" onClick={() => setIsOpen(false)}>
            <img src={icon} className="w-[150px] h-[50px] object-contain" alt="Логотип" />
          </Link>

          <button className="lg:hidden p-2 text-gray-700" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <nav className="hidden lg:flex items-center gap-6">
            <ul className="flex gap-8 justify-center text-lg font-medium">
              <li>
                <Link to="/blog" className="text-gray-700 hover:text-green-600 transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
            <div className="flex items-center gap-5 text-gray-600">
              <Link to="/shopping-cart" className="hover:text-green-600 transition">
                <ShoppingCart size={22} />
              </Link>
              <Link to="/like" className="hover:text-green-600 transition">
                <Heart size={22} />
              </Link>
              <button onClick={handleProfileClick} className="bg-[#0c6435] text-white px-6 py-2.5 text-lg font-medium rounded-lg shadow-md hover:bg-green-600 active:scale-95 transition">
                {isLoggedIn ? (user.name || 'Аккаунт') : 'Войти'}
              </button>
            </div>
          </nav>
        </div>

        {isOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 py-4 px-4 space-y-4 animate-fadeIn">
            <ul className="space-y-3">
              <li>
                <Link to="/blog" className="block text-lg text-gray-700 hover:text-green-600" onClick={() => setIsOpen(false)}>
                  Blog
                </Link>
              </li>
            </ul>

            <div className="flex flex-col gap-4 pt-4 border-t border-gray-200">
              <Link to="/shopping-cart" className="flex items-center gap-3 text-gray-700 hover:text-green-600" onClick={() => setIsOpen(false)}>
                <ShoppingCart size={20} />
                <span>Корзина</span>
              </Link>

              <Link to="/like" className="flex items-center gap-3 text-gray-700 hover:text-green-600" onClick={() => setIsOpen(false)}>
                <Heart size={20} />
                <span>Избранное</span>
              </Link>

              <button onClick={handleProfileClick} className="text-left flex items-center gap-3 text-lg font-medium text-gray-700 hover:text-green-600">
                {isLoggedIn ? (user.name || 'Аккаунт') : 'Войти'}
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </header>
  );
};

export default Header;