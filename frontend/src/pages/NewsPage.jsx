import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getArticleById } from '../services/newsService';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/layout/Navbar';

function NewsPage() {
    const { id } = useParams();
    const { user } = useAuth();

    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        async function loadArticle() {
            try {
                const data = await getArticleById(id);
                setArticle(data);
            } catch (error) {
                setMessage(error.message);
            } finally {
                setLoading(false);
            }
        }

        loadArticle();
    }, [id]);

    if (loading) {
        return (
            <div style={{ background: '#dcdcdc', minHeight: '100vh' }}>
                <Navbar />
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
                    Загрузка...
                </div>
            </div>
        );
    }

    if (message) {
        return (
            <div style={{ background: '#dcdcdc', minHeight: '100vh' }}>
                <Navbar />
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', color: 'red' }}>
                    {message}
                </div>
            </div>
        );
    }

    if (!article) {
        return (
            <div style={{ background: '#dcdcdc', minHeight: '100vh' }}>
                <Navbar />
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
                    Статья не найдена
                </div>
            </div>
        );
    }

    const isAuthor =
        user && article.author && (user.id === article.author.id || user.id === article.author._id);

    return (
        <div style={{ background: '#dcdcdc', minHeight: '100vh' }}>
            <Navbar />

            <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', background: '#f4f4f4' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto', padding: '30px 10px' }}>
                    <div style={{ fontSize: '14px', color: '#888', marginBottom: '20px' }}>
                        <Link to="/" style={{ color: '#888', textDecoration: 'none' }}>Главная</Link>
                        {' / '}
                        <span>{article.category}</span>
                        {' / '}
                        <span>{article.title}</span>
                    </div>

                    <p style={{ color: '#666', marginBottom: '10px' }}>
                        {new Date(article.createdAt).toLocaleString()}
                    </p>

                    <h1 style={{ fontSize: '48px', lineHeight: '1.1', margin: '0 0 24px', color: '#111' }}>
                        {article.title}
                    </h1>

                    <div
                        style={{
                            borderTop: '2px solid #cfcfcf',
                            paddingTop: '20px',
                            marginBottom: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                        }}
                    >
                        <div
                            style={{
                                width: '40px',
                                height: '40px',
                                background: '#f28b82',
                                borderRadius: '6px',
                            }}
                        />
                        <span style={{ color: '#c81414', fontWeight: '700' }}>
              {article.author?.name || 'Автор'}
            </span>
                    </div>

                    {article.image && (
                        <img
                            src={article.image}
                            alt={article.title}
                            style={{
                                width: '100%',
                                maxHeight: '500px',
                                objectFit: 'cover',
                                display: 'block',
                                marginBottom: '24px',
                            }}
                        />
                    )}

                    <div style={{ borderTop: '2px solid #cfcfcf', paddingTop: '24px' }}>
                        <h2 style={{ marginTop: 0 }}>{article.category}</h2>
                        <p style={{ fontSize: '20px', fontWeight: '600', lineHeight: '1.6', color: '#222' }}>
                            {article.summary}
                        </p>
                        <p style={{ fontSize: '20px', lineHeight: '1.8', color: '#222', whiteSpace: 'pre-line' }}>
                            {article.content}
                        </p>
                    </div>

                    {isAuthor && (
                        <div style={{ marginTop: '24px' }}>
                            <Link
                                to={`/articles/${article._id}/edit`}
                                style={{
                                    textDecoration: 'none',
                                    background: '#111',
                                    color: '#fff',
                                    padding: '12px 16px',
                                    borderRadius: '6px',
                                    fontWeight: '700',
                                }}
                            >
                                Редактировать статью
                            </Link>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default NewsPage;