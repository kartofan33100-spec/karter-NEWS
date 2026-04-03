import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';
import '../../styles/auth-page.css';

function AuthForm({ type }) {
    const is_login = type === 'login';
    const navigate = useNavigate();
    const { login } = useAuth();

    const [form_data, set_form_data] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: '',
    });

    const [message, set_message] = useState('');
    const [message_type, set_message_type] = useState('');
    const [loading, set_loading] = useState(false);

    function handle_change(event) {
        const { name, value } = event.target;

        set_form_data((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function validate_form() {
        if (!is_login && !form_data.name.trim()) {
            return 'Введите имя';
        }

        if (!form_data.email.trim() || !form_data.password.trim()) {
            return 'Заполните все обязательные поля';
        }

        if (!/\S+@\S+\.\S+/.test(form_data.email)) {
            return 'Введите корректную почту';
        }

        if (form_data.password.length < 6) {
            return 'Пароль должен быть не менее 6 символов';
        }

        if (!is_login && form_data.password !== form_data.confirm_password) {
            return 'Пароли не совпадают';
        }

        return '';
    }

    async function handle_submit(event) {
        event.preventDefault();
        set_message('');
        set_message_type('');

        const validation_error = validate_form();

        if (validation_error) {
            set_message(validation_error);
            set_message_type('error');
            return;
        }

        set_loading(true);

        try {
            if (is_login) {
                const data = await loginUser({
                    email: form_data.email,
                    password: form_data.password,
                });

                login(data);
                set_message('Вход выполнен успешно');
                set_message_type('success');
                navigate('/');
            } else {
                const data = await registerUser({
                    name: form_data.name,
                    email: form_data.email,
                    password: form_data.password,
                });

                login(data);
                set_message('Регистрация прошла успешно');
                set_message_type('success');
                navigate('/');
            }
        } catch (error) {
            set_message(error.message);
            set_message_type('error');
        } finally {
            set_loading(false);
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-page_card">
                <h1 className="auth-page_logo">Karter NEWS</h1>

                <h2 className="auth-page_title">
                    {is_login ? 'Войдите в свой аккаунт' : 'Зарегистрируйте свой аккаунт'}
                </h2>

                <form className="auth-page_form" onSubmit={handle_submit}>
                    {!is_login && (
                        <div className="auth-page_group">
                            <label className="auth-page_label" htmlFor="name">
                                Имя
                            </label>
                            <input
                                className="auth-page_input"
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Введите имя"
                                value={form_data.name}
                                onChange={handle_change}
                            />
                        </div>
                    )}

                    <div className="auth-page_group">
                        <label className="auth-page_label" htmlFor="email">
                            Электронная почта
                        </label>
                        <input
                            className="auth-page_input"
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Введите почту"
                            value={form_data.email}
                            onChange={handle_change}
                        />
                    </div>

                    <div className="auth-page_group">
                        <label className="auth-page_label" htmlFor="password">
                            Пароль
                        </label>
                        <input
                            className="auth-page_input"
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Введите пароль"
                            value={form_data.password}
                            onChange={handle_change}
                        />
                    </div>

                    {!is_login && (
                        <div className="auth-page_group">
                            <label className="auth-page_label" htmlFor="confirm_password">
                                Подтверждение пароля
                            </label>
                            <input
                                className="auth-page_input"
                                id="confirm_password"
                                type="password"
                                name="confirm_password"
                                placeholder="Повторите пароль"
                                value={form_data.confirm_password}
                                onChange={handle_change}
                            />
                        </div>
                    )}

                    {message && (
                        <p
                            className={
                                message_type === 'error'
                                    ? 'auth-page_message auth-page_message-error'
                                    : 'auth-page_message auth-page_message-success'
                            }
                        >
                            {message}
                        </p>
                    )}

                    <button className="auth-page_button" type="submit" disabled={loading}>
                        {loading ? 'Загрузка...' : is_login ? 'Войти' : 'Зарегистрироваться'}
                    </button>
                </form>

                <p className="auth-page_switch">
                    {is_login ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}{' '}
                    <span
                        className="auth-page_link"
                        onClick={() => navigate(is_login ? '/register' : '/login')}
                    >
            {is_login ? 'Зарегистрироваться' : 'Войти'}
          </span>
                </p>
            </div>
        </div>
    );
}

export default AuthForm;