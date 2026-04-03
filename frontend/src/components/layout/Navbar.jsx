import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/navbar.css';

function Navbar({ search = '', setSearch = null }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [is_open, set_is_open] = useState(false);
    const [local_search, set_local_search] = useState(search);
    const dropdown_ref = useRef(null);

    useEffect(() => {
        set_local_search(search);
    }, [search]);

    useEffect(() => {
        function handle_click_outside(event) {
            if (dropdown_ref.current && !dropdown_ref.current.contains(event.target)) {
                set_is_open(false);
            }
        }

        document.addEventListener('mousedown', handle_click_outside);

        return () => {
            document.removeEventListener('mousedown', handle_click_outside);
        };
    }, []);

    function handle_category_click(category_name) {
        navigate(`/category/${encodeURIComponent(category_name)}`);
    }

    function handle_search_change(event) {
        const value = event.target.value;
        set_local_search(value);

        if (setSearch) {
            setSearch(value);
        }
    }

    function handle_search_key_down(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    }

    function handle_dropdown_toggle() {
        set_is_open((prev) => !prev);
    }

    function handle_logout() {
        logout();
        set_is_open(false);
        navigate('/');
    }

    return (
        <header className="navbar">
            <div className="navbar_inner">
                <Link to="/" className="navbar_logo">
                    <span>Karter</span>
                    <span>NEWS</span>
                </Link>

                <nav className="navbar_nav">
                    <button
                        className="navbar_nav-button"
                        onClick={() => handle_category_click('Политика')}
                    >
                        Политика
                    </button>

                    <button
                        className="navbar_nav-button"
                        onClick={() => handle_category_click('Спорт')}
                    >
                        Спорт
                    </button>

                    <button
                        className="navbar_nav-button"
                        onClick={() => handle_category_click('Финансы')}
                    >
                        Финансы
                    </button>

                    <button
                        className="navbar_nav-button"
                        onClick={() => handle_category_click('Здоровье')}
                    >
                        Здоровье
                    </button>
                </nav>

                <div className="navbar_actions">
                    <input
                        className="navbar_search"
                        type="text"
                        placeholder="Поиск"
                        value={local_search}
                        onChange={handle_search_change}
                        onKeyDown={handle_search_key_down}
                    />

                    {!user ? (
                        <Link to="/login" className="navbar_button navbar_button-outline">
                            Войти
                        </Link>
                    ) : (
                        <div className="navbar_profile" ref={dropdown_ref}>
                            <button
                                className="navbar_avatar-button"
                                onClick={handle_dropdown_toggle}
                            >
                                <div className="navbar_avatar">
                                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                </div>
                            </button>

                            {is_open && (
                                <div className="navbar_dropdown">
                                    <div className="navbar_dropdown-header">
                                        <div className="navbar_dropdown-avatar">
                                            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                        </div>

                                        <div className="navbar_dropdown-user">
                                            <p className="navbar_dropdown-name">
                                                {user.name || 'Пользователь'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="navbar_dropdown-divider" />

                                    <Link
                                        to="/articles/create"
                                        className="navbar_dropdown-item"
                                        onClick={() => set_is_open(false)}
                                    >
                                        Создать статью
                                    </Link>

                                    <Link
                                        to="/my-articles"
                                        className="navbar_dropdown-item"
                                        onClick={() => set_is_open(false)}
                                    >
                                        Просмотр статей
                                    </Link>

                                    <button
                                        className="navbar_dropdown-item navbar_dropdown-item-danger"
                                        onClick={handle_logout}
                                    >
                                        Выйти
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Navbar;