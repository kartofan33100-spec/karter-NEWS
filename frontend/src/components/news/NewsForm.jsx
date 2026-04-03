import React, { useEffect, useState } from 'react';
import '../../styles/news-form.css';

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
    const [form_data, set_form_data] = useState({
        title: '',
        summary: '',
        content: '',
        category: 'Политика',
        image: '',
    });

    useEffect(() => {
        if (!initialData) return;

        set_form_data({
            title: initialData.title || '',
            summary: initialData.summary || '',
            content: initialData.content || '',
            category: initialData.category || 'Политика',
            image: initialData.image || '',
        });
    }, [initialData]);

    function handle_change(event) {
        const { name, value } = event.target;

        if (name === 'title' && value.length > TITLE_MAX_LENGTH) {
            return;
        }

        if (name === 'summary' && value.length > SUMMARY_MAX_LENGTH) {
            return;
        }

        set_form_data((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function handle_submit(event) {
        event.preventDefault();
        onSubmit(form_data);
    }

    return (
        <form className="news-form" onSubmit={handle_submit}>
            <div className="news-form_group">
                <label className="news-form_label" htmlFor="title">
                    Заголовок
                </label>

                <input
                    className="news-form_input"
                    id="title"
                    type="text"
                    name="title"
                    value={form_data.title}
                    onChange={handle_change}
                    placeholder="Введите заголовок"
                    maxLength={TITLE_MAX_LENGTH}
                />

                <p className="news-form_counter">
                    {form_data.title.length}/{TITLE_MAX_LENGTH}
                </p>
            </div>

            <div className="news-form_group">
                <label className="news-form_label" htmlFor="summary">
                    Краткое описание
                </label>

                <textarea
                    className="news-form_textarea"
                    id="summary"
                    name="summary"
                    value={form_data.summary}
                    onChange={handle_change}
                    placeholder="Введите краткое описание"
                    rows="4"
                    maxLength={SUMMARY_MAX_LENGTH}
                />

                <p className="news-form_counter">
                    {form_data.summary.length}/{SUMMARY_MAX_LENGTH}
                </p>
            </div>

            <div className="news-form_group">
                <label className="news-form_label" htmlFor="content">
                    Полный текст статьи
                </label>

                <textarea
                    className="news-form_textarea"
                    id="content"
                    name="content"
                    value={form_data.content}
                    onChange={handle_change}
                    placeholder="Введите полный текст"
                    rows="10"
                />
            </div>

            <div className="news-form_group">
                <label className="news-form_label" htmlFor="category">
                    Категория
                </label>

                <select
                    className="news-form_select"
                    id="category"
                    name="category"
                    value={form_data.category}
                    onChange={handle_change}
                >
                    <option value="Политика">Политика</option>
                    <option value="Спорт">Спорт</option>
                    <option value="Финансы">Финансы</option>
                    <option value="Здоровье">Здоровье</option>
                </select>
            </div>

            <div className="news-form_group">
                <label className="news-form_label" htmlFor="image">
                    Ссылка на изображение
                </label>

                <input
                    className="news-form_input"
                    id="image"
                    type="text"
                    name="image"
                    value={form_data.image}
                    onChange={handle_change}
                    placeholder="Вставьте URL картинки"
                    required
                />
            </div>

            <div className="news-form_actions">
                <button className="news-form_button" type="submit" disabled={loading}>
                    {loading ? 'Загрузка...' : submitText}
                </button>

                {showDeleteButton && onDelete && (
                    <button
                        type="button"
                        className="news-form_delete-button"
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