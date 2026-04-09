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
import '../styles/article-editor-page.css';

function EditArticlePage() {
    const { id } = useParams();
    const { user, token } = useAuth();
    const navigate = useNavigate();

    const [article, set_article] = useState(null);
    const [page_loading, set_page_loading] = useState(true);
    const [save_loading, set_save_loading] = useState(false);
    const [delete_loading, set_delete_loading] = useState(false);
    const [message, set_message] = useState('');
    const [is_delete_modal_open, set_is_delete_modal_open] = useState(false);

    useEffect(() => {
        async function load_article() {
            try {
                set_page_loading(true);
                const data = await getArticleById(id);
                set_article(data);
            } catch (error) {
                set_message(error.message);
            } finally {
                set_page_loading(false);
            }
        }

        load_article();
    }, [id]);

    const current_user_id = user?.id?.toString() || user?._id?.toString();
    const article_author_id =
        article?.author?._id?.toString() || article?.author?.id?.toString();

    const is_author = current_user_id && article_author_id
        ? current_user_id === article_author_id
        : false;

    async function handle_update(form_data) {
        set_message('');

        if (
            !form_data.title ||
            !form_data.description ||
            !form_data.content ||
            !form_data.category ||
            !form_data.image
        ) {
            set_message('Заполните все обязательные поля, включая изображение');
            return;
        }

        try {
            set_save_loading(true);
            const updated_article = await updateArticle(id, form_data, token);
            navigate(`/news/${updated_article._id}`);
        } catch (error) {
            set_message(error.message);
        } finally {
            set_save_loading(false);
        }
    }

    async function handle_delete_confirmed() {
        try {
            set_delete_loading(true);
            await deleteArticle(id, token);
            set_is_delete_modal_open(false);
            navigate('/my-articles');
        } catch (error) {
            set_message(error.message);
        } finally {
            set_delete_loading(false);
        }
    }

    if (page_loading) {
        return (
            <div className="article-editor-page">
                <Navbar />
                <main className="article-editor-page_main">
                    <p className="article-editor-page_text">Загрузка статьи...</p>
                </main>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="article-editor-page">
                <Navbar />
                <main className="article-editor-page_main">
                    <p className="article-editor-page_message">
                        {message || 'Статья не найдена'}
                    </p>
                </main>
            </div>
        );
    }

    if (!is_author) {
        return (
            <div className="article-editor-page">
                <Navbar />
                <main className="article-editor-page_main">
                    <p className="article-editor-page_message">
                        Вы можете редактировать только свои статьи.
                    </p>
                </main>
            </div>
        );
    }

    return (
        <div className="article-editor-page">
            <Navbar />

            <main className="article-editor-page_main">
                <h1 className="article-editor-page_title">Редактировать статью</h1>

                <p className="article-editor-page_text">
                    Измените данные статьи и сохраните изменения.
                </p>

                {message && (
                    <p className="article-editor-page_message">{message}</p>
                )}

                <NewsForm
                    onSubmit={handle_update}
                    loading={save_loading}
                    submitText="Сохранить изменения"
                    initialData={article}
                    showDeleteButton={true}
                    onDelete={() => set_is_delete_modal_open(true)}
                    deleteButtonText="Удалить статью"
                />
            </main>

            <ConfirmModal
                isOpen={is_delete_modal_open}
                title="Подтвердить удаление"
                text="Вы действительно хотите удалить статью?"
                confirmText={delete_loading ? 'Удаление...' : 'Да'}
                cancelText="Нет"
                onConfirm={handle_delete_confirmed}
                onCancel={() => set_is_delete_modal_open(false)}
            />
        </div>
    );
}

export default EditArticlePage;