import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import ConfirmModal from '../components/ui/ConfirmModal';
import { deleteArticle, getMyArticles } from '../services/newsService';
import { useAuth } from '../context/AuthContext';
import '../styles/my-articles-page.css';

function MyArticlesPage() {
    const { token } = useAuth();

    const [articles, set_articles] = useState([]);
    const [loading, set_loading] = useState(true);
    const [message, set_message] = useState('');
    const [article_to_delete, set_article_to_delete] = useState(null);
    const [delete_loading, set_delete_loading] = useState(false);

    useEffect(() => {
        async function load_my_articles() {
            try {
                set_loading(true);
                const data = await getMyArticles(token);
                set_articles(data);
            } catch (error) {
                set_message(error.message);
            } finally {
                set_loading(false);
            }
        }

        if (token) {
            load_my_articles();
        } else {
            set_loading(false);
        }
    }, [token]);

    function open_delete_modal(article) {
        set_article_to_delete(article);
    }

    function close_delete_modal() {
        set_article_to_delete(null);
    }

    async function handle_delete_confirmed() {
        if (!article_to_delete) return;

        try {
            set_delete_loading(true);
            await deleteArticle(article_to_delete._id, token);

            set_articles((prev) =>
                prev.filter((article) => article._id !== article_to_delete._id)
            );

            close_delete_modal();
        } catch (error) {
            set_message(error.message);
        } finally {
            set_delete_loading(false);
        }
    }

    return (
        <div className="my-articles-page">
            <Navbar />

            <main className="my-articles-page_main">
                <h1 className="my-articles-page_title">Мои статьи</h1>

                {loading && <p className="my-articles-page_state">Загрузка...</p>}

                {message && (
                    <p className="my-articles-page_state my-articles-page_state-error">
                        {message}
                    </p>
                )}

                {!loading && !message && articles.length === 0 && (
                    <p className="my-articles-page_empty">у вас нету статей :(</p>
                )}

                {!loading && !message && articles.length > 0 && (
                    <div className="my-articles-page_list">
                        {articles.map((article) => (
                            <div key={article._id} className="my-articles-page_card">
                                <p className="my-articles-page_category">{article.category}</p>

                                <h2 className="my-articles-page_card-title">{article.title}</h2>

                                <p className="my-articles-page_summary">{article.summary}</p>

                                <div className="my-articles-page_actions">
                                    <Link
                                        to={`/articles/${article._id}/edit`}
                                        className="my-articles-page_edit-link"
                                    >
                                        Редактировать статью
                                    </Link>

                                    <button
                                        className="my-articles-page_delete-button"
                                        onClick={() => open_delete_modal(article)}
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
                isOpen={Boolean(article_to_delete)}
                title="Подтвердить удаление"
                text="Вы действительно хотите удалить статью?"
                confirmText={delete_loading ? 'Удаление...' : 'Да'}
                cancelText="Нет"
                onConfirm={handle_delete_confirmed}
                onCancel={close_delete_modal}
            />
        </div>
    );
}

export default MyArticlesPage;