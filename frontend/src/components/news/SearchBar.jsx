import React from 'react';
import '../../styles/SearchBar.css';

function SearchBar({
                       search,
                       setSearch,
                       selectedCategory,
                       setSelectedCategory,
                   }) {
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Поиск новостей..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
            >
                <option value="">Все категории</option>
                <option value="Политика">Политика</option>
                <option value="Спорт">Спорт</option>
                <option value="Финансы">Финансы</option>
                <option value="Здоровье">Здоровье</option>
            </select>
        </div>
    );
}

export default SearchBar;