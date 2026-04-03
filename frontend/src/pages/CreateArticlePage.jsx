import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import NewsForm from '../components/news/NewsForm';
import { createArticle } from '../services/newsService';
import { useAuth } from '../context/AuthContext';

function CreateArticlePage() {
    const { token } = useAuth();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    async function handleCreate(formData) {
        setMessage('');

        if (
            !formData.title ||
            !formData.summary ||
            !formData.content ||
            !formData.category ||
            !formData.image
        ) {
            setMessage('Заполните все обязательные поля');
            return;
        }

        try {
            setLoading(true);
            const article = await createArticle(formData, token);
            navigate(`/news/${article._id}`);
        } catch (error) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{ background: '#dcdcdc', minHeight: '100vh' }}>
            <Navbar />

            <main
                style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '20px',
                    background: '#f4f4f4',
                    minHeight: 'calc(100vh - 86px)',
                }}
            >
                <h1 style={{ marginBottom: '10px', color: '#111' }}>Создать статью</h1>
                <p style={{ color: '#666', marginBottom: '20px' }}>
                    Заполните форму для публикации новой статьи.
                </p>

                {message && (
                    <p style={{ color: '#c81414', fontWeight: '600' }}>{message}</p>
                )}

                <NewsForm
                    onSubmit={handleCreate}
                    loading={loading}
                    submitText="Опубликовать статью"
                />
            </main>
        </div>
    );
}

export default CreateArticlePage;