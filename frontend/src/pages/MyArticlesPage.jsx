import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import ConfirmModal from '../components/ui/ConfirmModal';
import { deleteArticle, getAllArticles } from '../services/newsService';
import { useAuth } from '../context/AuthContext'

function MyArticlesPage() {
    const { user, token } = useAuth();

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [articleToDelete, setArticleToDelete] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    useEffect(() => {
        async function loadMyArticles() {
            try {
                setLoading(true);
                const data = await getAllArticles();

                const myArticles = data.filter((article) => {
                    const authorId = article.author?._id || article.author?.id;
                    return user && authorId === user.id;
                });

                setArticles(myArticles);
            } catch (error) {
                setMessage(error.message);
            } finally {
                setLoading(false);
            }
        }

        if (user) {
            loadMyArticles();
        } else {
            setLoading(false);
        }
    }, [user]);

    function openDeleteModal(article) {
        setArticleToDelete(article);
    }

    function closeDeleteModal() {
        setArticleToDelete(null);
    }

    async function handleDeleteConfirmed() {
        if (!articleToDelete) return;

        try {
            setDeleteLoading(true);
            await deleteArticle(articleToDelete._id, token);

            setArticles((prev) =>
                prev.filter((article) => article._id !== articleToDelete._id)
            );

            closeDeleteModal();
        } catch (error) {
            setMessage(error.message);
        } finally {
            setDeleteLoading(false);
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
                <h1 style={{ marginBottom: '24px' }}>Мои статьи</h1>

                {loading && <p>Загрузка...</p>}

                {message && <p style={{ color: '#c81414' }}>{message}</p>}

                {!loading && !message && articles.length === 0 && (
                    <p style={{ fontSize: '20px', color: '#555' }}>
                        у вас нету статей :(
                    </p>
                )}

                {!loading && !message && articles.length > 0 && (
                    <div
                        style={{
                            display: 'grid',
                            gap: '20px',
                        }}
                    >
                        {articles.map((article) => (
                            <div
                                key={article._id}
                                style={{
                                    background: '#fff',
                                    borderRadius: '10px',
                                    padding: '20px',
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                                }}
                            >
                                <p
                                    style={{
                                        margin: '0 0 8px',
                                        color: '#c81414',
                                        fontWeight: '700',
                                        fontSize: '14px',
                                    }}
                                >
                                    {article.category}
                                </p>

                                <h2 style={{ margin: '0 0 10px', color: '#111' }}>
                                    {article.title}
                                </h2>

                                <p style={{ margin: '0 0 16px', color: '#555', lineHeight: '1.6' }}>
                                    {article.summary}
                                </p>

                                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                                    <Link
                                        to={`/articles/${article._id}/edit`}
                                        style={{
                                            textDecoration: 'none',
                                            background: '#111',
                                            color: '#fff',
                                            padding: '10px 16px',
                                            borderRadius: '6px',
                                            fontWeight: '700',
                                        }}
                                    >
                                        Редактировать статью
                                    </Link>

                                    <button
                                        onClick={() => openDeleteModal(article)}
                                        style={{
                                            border: 'none',
                                            background: '#c81414',
                                            color: '#fff',
                                            padding: '10px 16px',
                                            borderRadius: '6px',
                                            fontWeight: '700',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Удалить статью
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <ConfirmModal
                isOpen={Boolean(articleToDelete)}
                title="Подтвердить удаление"
                text="Вы действительно хотите удалить статью?"
                confirmText={deleteLoading ? 'Удаление...' : 'Да'}
                cancelText="Нет"
                onConfirm={handleDeleteConfirmed}
                onCancel={closeDeleteModal}
            />
        </div>
    );
}

export default MyArticlesPage;