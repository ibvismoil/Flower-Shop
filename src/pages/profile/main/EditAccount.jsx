import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import icon from "../../../assets/icons.svg";

const EditAccount = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const userFromStorage = JSON.parse(localStorage.getItem('user') || '{}');

    const [formData, setFormData] = useState({
        name: '',
        surename: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
    });

    const { password, confirmPassword } = formData;
    const requirements = {
        length: password.length >= 8 && password.length <= 12,
        hasUpper: /[A-Z]/.test(password),
        hasLower: /[a-z]/.test(password),
        hasDigit: /\d/.test(password),
    };
    const passwordsMatch = password === confirmPassword;
    const allPasswordValid =
        (!password && !confirmPassword) || (Object.values(requirements).every(Boolean) && passwordsMatch);

    useEffect(() => {
        if (userFromStorage) {
            setFormData((prev) => ({
                ...prev,
                ...userFromStorage,
                password: '',
                confirmPassword: '',
            }));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const saveChanges = async () => {
        if (!allPasswordValid) {
            setMessage('❌ Пароль не соответствует требованиям.');
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setMessage('❌ Вы не авторизованы');
                return;
            }

            const { confirmPassword, ...submitData } = formData;
            if (!submitData.password) delete submitData.password;

            const res = await fetch(`https://flower-backend-betav2.vercel.app/api/users/${userFromStorage.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(submitData),
            });

            const data = await res.json();

            if (res.ok && (data.user || data.doc || data)) {
                const updatedUser = data.user || data.doc || data;
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setMessage('✅ Данные успешно обновлены!');
                setTimeout(() => navigate('/'), 1500);
            } else {
                setMessage(`❌ ${data.message || 'Не удалось обновить аккаунт'}`);
            }

        } catch (error) {
            setMessage('❌ Ошибка соединения: ' + (error.message || 'Попробуйте позже'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4 max-w-md w-full mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center justify-center w-full">
                <img src={icon} className="w-36 mx-auto" alt="logo" />
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 text-center">Изменить аккаунт</h2>
            <p className="text-sm text-gray-500 text-center mb-6">Обновите ваши данные</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                    name="name"
                    type="text"
                    placeholder="Имя"
                    value={formData.name}
                    onChange={handleChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600"
                    disabled={loading}
                />
                <input
                    name="surename"
                    type="text"
                    placeholder="Фамилия"
                    value={formData.surename}
                    onChange={handleChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600"
                    disabled={loading}
                />
            </div>

            <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600"
                disabled={loading}
            />
            <input
                name="phoneNumber"
                type="tel"
                placeholder="+998 94 222 22 20"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600"
                disabled={loading}
            />

            {/* Пароль */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Новый пароль (необязательно)</label>
                <div className="relative">
                    <input
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition
              ${allPasswordValid || !password
                                ? 'border-gray-300 focus:ring-green-500'
                                : 'border-red-300 focus:ring-red-500'
                            }`}
                        disabled={loading}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
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
                        <li>{requirements.length ? '✅' : '❌'} 8–12 символов</li>
                        <li>{requirements.hasUpper ? '✅' : '❌'} Одна ЗАГЛАВНАЯ</li>
                        <li>{requirements.hasLower ? '✅' : '❌'} Одна строчная</li>
                        <li>{requirements.hasDigit ? '✅' : '❌'} Цифра (0–9)</li>
                        <li>{passwordsMatch ? '✅' : '❌'} Пароли совпадают</li>
                    </ul>
                )}
            </div>

            <input
                name="confirmPassword"
                type="password"
                placeholder="Подтвердите пароль"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600"
                disabled={loading}
            />

            {message && (
                <p className={`text-sm text-center p-2 rounded-md mt-2 ${message.includes('✅')
                    ? 'bg-green-50 text-green-600'
                    : 'bg-red-50 text-red-600'
                    }`}>
                    {message}
                </p>
            )}

            <button
                onClick={saveChanges}
                disabled={loading}
                className="mt-2 bg-[#0c6435] hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg transition"
            >
                {loading ? 'Сохранение...' : 'Сохранить изменения'}
            </button>
        </div>
    );
};

export default EditAccount;
