import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import NewsForm from '../components/news/NewsForm';
import { createArticle } from '../services/newsService';
import { useAuth } from '../context/AuthContext';
import '../styles/article-editor-page.css';

function CreateArticlePage() {
    const { token } = useAuth();
    const navigate = useNavigate();

    const [loading, set_loading] = useState(false);
    const [message, set_message] = useState('');

    async function handle_create(form_data) {
        set_message('');

        if (
            !form_data.title ||
            !form_data.summary ||
            !form_data.content ||
            !form_data.category ||
            !form_data.image
        ) {
            set_message('Заполните все обязательные поля, включая изображение');
            return;
        }

        try {
            set_loading(true);
            const article = await createArticle(form_data, token);
            navigate(`/news/${article._id}`);
        } catch (error) {
            set_message(error.message);
        } finally {
            set_loading(false);
        }
    }

    return (
        <div className="article-editor-page">
            <Navbar />

            <main className="article-editor-page_main">
                <h1 className="article-editor-page_title">Создать статью</h1>

                <p className="article-editor-page_text">
                    Заполните форму для публикации новой статьи.
                </p>

                {message && (
                    <p className="article-editor-page_message">{message}</p>
                )}

                <NewsForm
                    onSubmit={handle_create}
                    loading={loading}
                    submitText="Опубликовать статью"
                />
            </main>
        </div>
    );
}

export default CreateArticlePage;