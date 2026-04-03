import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/Navbar.css';

function Navbar({ search = '', setSearch = null }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    function handleCategoryClick(category) {
        navigate(`/category/${encodeURIComponent(category)}`);
    }

    function handleSearchChange(event) {
        if (setSearch) {
            setSearch(event.target.value);
        }
    }

    function toggleDropdown() {
        setIsOpen((prev) => !prev);
    }

    function handleLogout() {
        logout();
        setIsOpen(false);
        navigate('/');
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="navbar">
            <div className="navbar__inner">
                <Link to="/" className="navbar__logo">
                    <span>Karter</span>
                    <span>NEWS</span>
                </Link>

                <nav className="navbar__nav">
                    <button onClick={() => handleCategoryClick('Политика')}>Политика</button>
                    <button onClick={() => handleCategoryClick('Спорт')}>Спорт</button>
                    <button onClick={() => handleCategoryClick('Финансы')}>Финансы</button>
                    <button onClick={() => handleCategoryClick('Здоровье')}>Здоровье</button>
                </nav>

                <div className="navbar__actions">
                    <input
                        className="navbar__search"
                        type="text"
                        placeholder="Поиск"
                        value={search}
                        onChange={handleSearchChange}
                    />

                    {!user ? (
                        <Link to="/login" className="navbar__btn navbar__btn--outline">
                            Войти
                        </Link>
                    ) : (
                        <div className="navbar__profile" ref={dropdownRef}>
                            <button className="navbar__avatar-btn" onClick={toggleDropdown}>
                                <div className="navbar__avatar">
                                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                </div>
                            </button>

                            {isOpen && (
                                <div className="navbar__dropdown">
                                    <div className="navbar__dropdown-header">
                                        <div className="navbar__dropdown-avatar">
                                            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                        </div>

                                        <div className="navbar__dropdown-user">
                                            <p>{user.name || 'Пользователь'}</p>
                                        </div>
                                    </div>

                                    <div className="navbar__dropdown-divider" />

                                    <Link
                                        to="/articles/create"
                                        className="navbar__dropdown-item"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Создать статью
                                    </Link>

                                    <Link
                                        to="/my-articles"
                                        className="navbar__dropdown-item"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Просмотр статей
                                    </Link>

                                    <button
                                        className="navbar__dropdown-item navbar__dropdown-item--danger"
                                        onClick={handleLogout}
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