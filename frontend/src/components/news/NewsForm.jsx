import React, { useState } from 'react';
import '../../styles/NewsForm.css';

function NewsForm({ onSubmit, loading = false, submitText = 'Опубликовать' }) {
    const [formData, setFormData] = useState({
        title: '',
        summary: '',
        content: '',
        category: 'Политика',
        image: '',
    });

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        onSubmit(formData);
    }

    return (
        <form className="news-form" onSubmit={handleSubmit}>
            <div className="news-form-group">
                <label htmlFor="title">Заголовок</label>
                <input
                    id="title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Введите заголовок"
                />
            </div>

            <div className="news-form-group">
                <label htmlFor="summary">Краткое описание</label>
                <textarea
                    id="summary"
                    name="summary"
                    value={formData.summary}
                    onChange={handleChange}
                    placeholder="Введите краткое описание"
                    rows="4"
                />
            </div>

            <div className="news-form-group">
                <label htmlFor="content">Полный текст статьи</label>
                <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="Введите полный текст"
                    rows="10"
                />
            </div>

            <div className="news-form-group">
                <label htmlFor="category">Категория</label>
                <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                >
                    <option value="Политика">Политика</option>
                    <option value="Спорт">Спорт</option>
                    <option value="Финансы">Финансы</option>
                    <option value="Здоровье">Здоровье</option>
                </select>
            </div>

            <div className="news-form-group">
                <label htmlFor="image">Ссылка на изображение</label>
                <input
                    id="image"
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="Вставьте URL картинки"
                />
            </div>

            <button className="news-form-button" type="submit" disabled={loading}>
                {loading ? 'Загрузка...' : submitText}
            </button>
        </form>
    );
}

export default NewsForm;