import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/auth.css';
import { loginUser, registerUser } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';

function AuthForm({ type }) {
    const isLogin = type === 'login';
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [loading, setLoading] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function validateForm() {
        if (!isLogin && !formData.name.trim()) {
            return 'Введите имя';
        }

        if (!formData.email.trim() || !formData.password.trim()) {
            return 'Заполните все обязательные поля';
        }

        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            return 'Введите корректную почту';
        }

        if (formData.password.length < 6) {
            return 'Пароль должен быть не менее 6 символов';
        }

        if (!isLogin && formData.password !== formData.confirmPassword) {
            return 'Пароли не совпадают';
        }

        return '';
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setMessage('');
        setMessageType('');

        const validationError = validateForm();

        if (validationError) {
            setMessage(validationError);
            setMessageType('error');
            return;
        }

        setLoading(true);

        try {
            if (isLogin) {
                const data = await loginUser({
                    email: formData.email,
                    password: formData.password,
                });

                login(data);
                setMessage('Вход выполнен успешно');
                setMessageType('success');
                navigate('/');
            } else {
                const data = await registerUser({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                });

                login(data);
                setMessage('Регистрация прошла успешно');
                setMessageType('success');
                navigate('/');
            }
        } catch (error) {
            setMessage(error.message);
            setMessageType('error');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1 className="auth-logo">Karter NEWS</h1>
                <h2 className="auth-title">
                    {isLogin ? 'Войдите в свой аккаунт' : 'Зарегистрируйте свой аккаунт'}
                </h2>

                <form className="auth-form" onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="auth-group">
                            <label htmlFor="name">Имя</label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Введите имя"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                    )}

                    <div className="auth-group">
                        <label htmlFor="email">Электронная почта</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Введите почту"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="auth-group">
                        <label htmlFor="password">Пароль</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Введите пароль"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    {!isLogin && (
                        <div className="auth-group">
                            <label htmlFor="confirmPassword">Подтверждение пароля</label>
                            <input
                                id="confirmPassword"
                                type="password"
                                name="confirmPassword"
                                placeholder="Повторите пароль"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>
                    )}

                    {message && (
                        <p className={`auth-message ${messageType === 'error' ? 'auth-error' : 'auth-success'}`}>
                            {message}
                        </p>
                    )}

                    <button className="auth-button" type="submit" disabled={loading}>
                        {loading ? 'Загрузка...' : isLogin ? 'Войти' : 'Зарегистрироваться'}
                    </button>
                </form>

                <p className="auth-switch">
                    {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}{' '}
                    <span
                        className="auth-link"
                        onClick={() => navigate(isLogin ? '/register' : '/login')}
                    >
            {isLogin ? 'Зарегистрироваться' : 'Войти'}
          </span>
                </p>
            </div>
        </div>
    );
}

export default AuthForm;