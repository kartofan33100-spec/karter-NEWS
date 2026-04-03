import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/NewsCard.css';

function NewsCard({ article }) {
    return (
        <article className="news-card">
            <Link to={`/news/${article._id}`} className="news-card__image-link">
                {article.image ? (
                    <img
                        className="news-card__image"
                        src={article.image}
                        alt={article.title}
                    />
                ) : (
                    <div className="news-card__image news-card__image--placeholder">
                        Тут картинка
                    </div>
                )}
            </Link>

            <div className="news-card__content">
                <p className="news-card__category">{article.category.toUpperCase()}</p>

                <Link to={`/news/${article._id}`} className="news-card__title-link">
                    <h3 className="news-card__title">{article.title}</h3>
                </Link>

                <p className="news-card__date">
                    {new Date(article.createdAt).toLocaleDateString()}
                </p>
            </div>
        </article>
    );
}

export default NewsCard;