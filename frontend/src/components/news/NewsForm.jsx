import React, { useEffect, useState } from 'react';
import '../../styles/NewsForm.css';

const TITLE_MAX_LENGTH = 120;
const SUMMARY_MAX_LENGTH = 250;

function NewsForm({
                      onSubmit,
                      loading = false,
                      submitText = 'Опубликовать статью',
                      initialData = null,
                      onDelete = null,
                      showDeleteButton = false,
                      deleteButtonText = 'Удалить статью',
                  }) {
    const [formData, setFormData] = useState({
        title: '',
        summary: '',
        content: '',
        category: 'Политика',
        image: '',
    });

    useEffect(() => {
        if (!initialData) return;

        setFormData({
            title: initialData.title || '',
            summary: initialData.summary || '',
            content: initialData.content || '',
            category: initialData.category || 'Политика',
            image: initialData.image || '',
        });
    }, [initialData]);

    function handleChange(event) {
        const { name, value } = event.target;

        if (name === 'title' && value.length > TITLE_MAX_LENGTH) {
            return;
        }

        if (name === 'summary' && value.length > SUMMARY_MAX_LENGTH) {
            return;
        }

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
                    maxLength={TITLE_MAX_LENGTH}
                />
                <p className="news-form-counter">
                    {formData.title.length}/{TITLE_MAX_LENGTH}
                </p>
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
                    maxLength={SUMMARY_MAX_LENGTH}
                />
                <p className="news-form-counter">
                    {formData.summary.length}/{SUMMARY_MAX_LENGTH}
                </p>
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
                    required
                />
            </div>

            <div className="news-form-actions">
                <button className="news-form-button" type="submit" disabled={loading}>
                    {loading ? 'Загрузка...' : submitText}
                </button>

                {showDeleteButton && onDelete && (
                    <button
                        type="button"
                        className="news-form-delete-button"
                        onClick={onDelete}
                    >
                        {deleteButtonText}
                    </button>
                )}
            </div>
        </form>
    );
}

export default NewsForm;