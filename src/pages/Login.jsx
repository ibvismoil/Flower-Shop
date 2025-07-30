import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import icon from "../assets/icons.svg";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const requirements = {
    length: password.length >= 8 && password.length <= 12,
    hasUpper: /[A-Z]/.test(password),
    hasLower: /[a-z]/.test(password),
    hasDigit: /\d/.test(password),
  };

  const allValid = Object.values(requirements).every(Boolean);
  const isFormValid = email && allValid;

  const login = async () => {
    if (!isFormValid) {
      setMessage('❌ Пожалуйста, проверьте правильность email и пароля.');
      return;
    }

    setMessage('');
    setLoading(true);

    try {
      const body = { email, password };
      const res = await fetch('https://flower-backend-betav2.vercel.app/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        setMessage('✅ Вход выполнен! Перенаправление...');

        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        setMessage('❌ Ошибка входа: ' + (data.message || res.statusText));
      }
    } catch (error) {
      setMessage('❌ Ошибка соединения: ' + (error.message || 'Неизвестная ошибка'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-md w-full mx-auto mt-12 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="flex items-center justify-center w-full">
        <img src={icon} className="w-36" alt="logo"/>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 text-center">Вход в аккаунт</h2>
      <p className="text-sm text-gray-500 text-center mb-6">Введите свои данные для входа</p>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0c6435] transition"
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Пароль
        </label>

        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition
              ${allValid || !password
                ? 'border-gray-300 focus:ring-[#0c6435]'
                : 'border-red-300 focus:ring-red-500'
              }`}
            disabled={loading}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.064 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
              </svg>
            )}
          </button>
        </div>

        {password && (
          <ul className="mt-3 space-y-1 text-xs">
            <li className="flex items-center">
              {requirements.length ? (
                <span className="text-[#0c6435] mr-2">✅</span>
              ) : (
                <span className="text-gray-400 mr-2">❌</span>
              )}
              <span className={requirements.length ? 'text-green-700' : 'text-gray-600'}>
                8–12 символов
              </span>
            </li>
            <li className="flex items-center">
              {requirements.hasUpper ? (
                <span className="text-[#0c6435] mr-2">✅</span>
              ) : (
                <span className="text-gray-400 mr-2">❌</span>
              )}
              <span className={requirements.hasUpper ? 'text-green-700' : 'text-gray-600'}>
                Одна ЗАГЛАВНАЯ буква (A–Z)
              </span>
            </li>
            <li className="flex items-center">
              {requirements.hasLower ? (
                <span className="text-[#0c6435] mr-2">✅</span>
              ) : (
                <span className="text-gray-400 mr-2">❌</span>
              )}
              <span className={requirements.hasLower ? 'text-green-700' : 'text-gray-600'}>
                Одна строчная буква (a–z)
              </span>
            </li>
            <li className="flex items-center">
              {requirements.hasDigit ? (
                <span className="text-[#0c6435] mr-2">✅</span>
              ) : (
                <span className="text-gray-400 mr-2">❌</span>
              )}
              <span className={requirements.hasDigit ? 'text-green-700' : 'text-gray-600'}>
                Хотя бы одна цифра (0–9)
              </span>
            </li>
          </ul>
        )}
      </div>

      {message && (
        <p
          className={`text-sm text-center p-2 rounded-md mt-2 ${message.includes('✅')
              ? 'bg-green-50 text-[#0c6435]'
              : 'bg-red-50 text-red-700'
            }`}>
          {message}
        </p>
      )}

      <button onClick={login} disabled={!isFormValid || loading} className={`mt-2 bg-[#0c6435] hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg transition flex items-center justify-center`}>
        {loading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
            Вход...
          </>
        ) : (
          'Войти'
        )}
      </button>
      <p className="text-xs text-gray-500 text-center mt-4">
        Нет аккаунта?{' '}
        <Link to="/register" className="text-[#0c6435] hover:underline font-medium">
          Зарегистрироваться
        </Link>
      </p>
    </div>
  );
};

export default Login;