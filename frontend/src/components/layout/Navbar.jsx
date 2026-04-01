import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/Navbar.css';

function Navbar({ search = '', setSearch = null }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    function handleCategoryClick(category) {
        navigate(`/category/${encodeURIComponent(category)}`);
    }

    function handleSearchChange(e) {
        if (setSearch) {
            setSearch(e.target.value);
        }
    }

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

                    {user ? (
                        <>
                            <Link to="/articles/create" className="navbar__btn navbar__btn--dark">
                                Добавить
                            </Link>
                            <button onClick={logout} className="navbar__btn navbar__btn--outline">
                                Выйти
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="navbar__btn navbar__btn--outline">
                            Войти
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Navbar;