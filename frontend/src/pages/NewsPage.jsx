import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getArticleById } from '../services/newsService';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/layout/Navbar';
import '../styles/News.css';

function NewsPage() {
    const { id } = useParams();
    const { user } = useAuth();

    const [article, set_article] = useState(null);
    const [loading, set_loading] = useState(true);
    const [message, set_message] = useState('');

    useEffect(() => {
        async function load_article() {
            try {
                const data = await getArticleById(id);
                set_article(data);
            } catch (error) {
                set_message(error.message);
            } finally {
                set_loading(false);
            }
        }

        load_article();
    }, [id]);

    if (loading) {
        return (
            <div className="news-page">
                <Navbar />
                <main className="news-page_main">
                    <div className="news-page_container">
                        <p className="news-page_state">Загрузка...</p>
                    </div>
                </main>
            </div>
        );
    }

    if (message) {
        return (
            <div className="news-page">
                <Navbar />
                <main className="news-page_main">
                    <div className="news-page_container">
                        <p className="news-page_state news-page_state-error">{message}</p>
                    </div>
                </main>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="news-page">
                <Navbar />
                <main className="news-page_main">
                    <div className="news-page_container">
                        <p className="news-page_state">Статья не найдена</p>
                    </div>
                </main>
            </div>
        );
    }

    const current_user_id = user?.id?.toString() || user?._id?.toString();
    const article_author_id =
        article.author?._id?.toString() || article.author?.id?.toString();

    const is_author = current_user_id && article_author_id
        ? current_user_id === article_author_id
        : false;

    return (
        <div className="news-page">
            <Navbar />

            <main className="news-page_main">
                <div className="news-page_container">
                    <div className="news-page_breadcrumb">
                        <Link to="/" className="news-page_breadcrumb-link">
                            Главная
                        </Link>
                        <span className="news-page_breadcrumb-separator"> / </span>
                        <span>{article.category}</span>
                        <span className="news-page_breadcrumb-separator"> / </span>
                        <span>{article.title}</span>
                    </div>

                    <p className="news-page_date">
                        {new Date(article.createdAt).toLocaleString()}
                    </p>

                    <h1 className="news-page_title">{article.title}</h1>

                    <div className="news-page_author-box">
                        <div className="news-page_author-avatar">
                            {article.author?.avatar ? (
                                <img
                                    src={article.author.avatar}
                                    alt={article.author?.name || 'Автор'}
                                    className="news-page_author-image"
                                />
                            ) : (
                                (article.author?.name?.charAt(0) || 'A').toUpperCase()
                            )}
                        </div>

                        <div className="news-page_author-info">
                            <p className="news-page_author-name">
                                {article.author?.name || 'Автор'}
                            </p>
                            <p className="news-page_author-role">Автор статьи</p>
                        </div>
                    </div>

                    {article.image && (
                        <img
                            src={article.image}
                            alt={article.title}
                            className="news-page_image"
                        />
                    )}

                    <div className="news-page_content">
                        <h2 className="news-page_category">{article.category}</h2>

                        <p className="news-page_summary">{article.summary}</p>

                        <p className="news-page_text">{article.content}</p>
                    </div>

                    {is_author && (
                        <div className="news-page_actions">
                            <Link
                                to={`/articles/${article._id}/edit`}
                                className="news-page_edit-link"
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