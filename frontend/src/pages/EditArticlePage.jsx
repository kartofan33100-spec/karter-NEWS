import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import NewsForm from '../components/news/NewsForm';
import ConfirmModal from '../components/ui/ConfirmModal';
import {
    deleteArticle,
    getArticleById,
    updateArticle,
} from '../services/newsService';
import { useAuth } from '../context/AuthContext';

function EditArticlePage() {
    const { id } = useParams();
    const { user, token } = useAuth();
    const navigate = useNavigate();

    const [article, setArticle] = useState(null);
    const [pageLoading, setPageLoading] = useState(true);
    const [saveLoading, setSaveLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    useEffect(() => {
        async function loadArticle() {
            try {
                setPageLoading(true);
                const data = await getArticleById(id);
                setArticle(data);
            } catch (error) {
                setMessage(error.message);
            } finally {
                setPageLoading(false);
            }
        }

        loadArticle();
    }, [id]);

    const isAuthor =
        user &&
        article &&
        article.author &&
        (user.id === article.author.id || user.id === article.author._id);

    async function handleUpdate(formData) {
        setMessage('');

        if (!formData.title || !formData.summary || !formData.content || !formData.category) {
            setMessage('Заполните все обязательные поля');
            return;
        }

        try {
            setSaveLoading(true);
            const updatedArticle = await updateArticle(id, formData, token);
            navigate(`/news/${updatedArticle._id}`);
        } catch (error) {
            setMessage(error.message);
        } finally {
            setSaveLoading(false);
        }
    }

    async function handleDeleteConfirmed() {
        try {
            setDeleteLoading(true);
            await deleteArticle(id, token);
            setIsDeleteModalOpen(false);
            navigate('/my-articles');
        } catch (error) {
            setMessage(error.message);
        } finally {
            setDeleteLoading(false);
        }
    }

    if (pageLoading) {
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
                    <p>Загрузка статьи...</p>
                </main>
            </div>
        );
    }

    if (!article) {
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
                    <p style={{ color: '#c81414' }}>{message || 'Статья не найдена'}</p>
                </main>
            </div>
        );
    }

    if (!isAuthor) {
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
                    <p style={{ color: '#c81414' }}>
                        Вы можете редактировать только свои статьи.
                    </p>
                </main>
            </div>
        );
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
                <h1 style={{ marginBottom: '10px', color: '#111' }}>
                    Редактировать статью
                </h1>

                <p style={{ color: '#666', marginBottom: '20px' }}>
                    Измените данные статьи и сохраните изменения.
                </p>

                {message && (
                    <p style={{ color: '#c81414', fontWeight: '600' }}>{message}</p>
                )}

                <NewsForm
                    onSubmit={handleUpdate}
                    loading={saveLoading}
                    submitText="Сохранить изменения"
                    initialData={article}
                />

                <div
                    style={{
                        maxWidth: '850px',
                        margin: '0 auto',
                        paddingBottom: '30px',
                    }}
                >
                    <button
                        onClick={() => setIsDeleteModalOpen(true)}
                        style={{
                            border: 'none',
                            background: '#c81414',
                            color: '#fff',
                            padding: '12px 18px',
                            borderRadius: '6px',
                            fontWeight: '700',
                            cursor: 'pointer',
                        }}
                    >
                        Удалить статью
                    </button>
                </div>
            </main>

            <ConfirmModal
                isOpen={isDeleteModalOpen}
                title="Подтвердить удаление"
                text="Вы действительно хотите удалить статью?"
                confirmText={deleteLoading ? 'Удаление...' : 'Да'}
                cancelText="Нет"
                onConfirm={handleDeleteConfirmed}
                onCancel={() => setIsDeleteModalOpen(false)}
            />
        </div>
    );
}

export default EditArticlePage;