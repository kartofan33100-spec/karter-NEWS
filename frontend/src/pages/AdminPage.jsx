import React, { useEffect, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import { useAuth } from '../context/AuthContext';
import {
    getPendingArticles,
    approveArticle,
    rejectArticle,
} from '../services/adminService';

function AdminPage() {
    const { token, user } = useAuth();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        async function loadPendingArticles() {
            try {
                const data = await getPendingArticles(token);
                setArticles(data);
            } catch (error) {
                setMessage(error.message);
            } finally {
                setLoading(false);
            }
        }

        if (user?.role === 'admin') {
            loadPendingArticles();
        } else {
            setLoading(false);
            setMessage('Доступ только для администратора');
        }
    }, [token, user]);

    async function handleApprove(articleId) {
        try {
            await approveArticle(articleId, token);
            setArticles((prev) => prev.filter((article) => article._id !== articleId));
        } catch (error) {
            setMessage(error.message);
        }
    }

    async function handleReject(articleId) {
        try {
            await rejectArticle(articleId, token);
            setArticles((prev) => prev.filter((article) => article._id !== articleId));
        } catch (error) {
            setMessage(error.message);
        }
    }

    return (
        <div>
            <Navbar />

            <main style={{ padding: '30px' }}>
                <h1>Модерация статей</h1>

                {message && <p style={{ color: 'red' }}>{message}</p>}

                {loading ? (
                    <p>Загрузка...</p>
                ) : articles.length === 0 ? (
                    <p>Нет статей на модерации</p>
                ) : (
                    <div>
                        {articles.map((article) => (
                            <div
                                key={article._id}
                                style={{
                                    border: '1px solid #ccc',
                                    padding: '16px',
                                    marginBottom: '16px',
                                    borderRadius: '8px',
                                }}
                            >
                                <h2>{article.title}</h2>
                                <p><strong>Автор:</strong> {article.author?.username}</p>
                                <p><strong>Категория:</strong> {article.category}</p>
                                <p><strong>Описание:</strong> {article.description}</p>
                                <p><strong>Текст:</strong> {article.content}</p>

                                <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                                    <button onClick={() => handleApprove(article._id)}>
                                        Одобрить
                                    </button>

                                    <button onClick={() => handleReject(article._id)}>
                                        Отклонить
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

export default AdminPage;