import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/NewsCard.css';

function NewsCard({ article }) {
    return (
        <article className="news-card">
            <Link to={`/news/${article._id}`} className="news-card_image-link">
                {article.image ? (
                    <img
                        className="news-card_image"
                        src={article.image}
                        alt={article.title}
                    />
                ) : (
                    <div className="news-card_image news-card_image-placeholder">
                        Тут картинка
                    </div>
                )}
            </Link>

            <div className="news-card_content">
                <p className="news-card_category">{article.category.toUpperCase()}</p>

                <Link to={`/news/${article._id}`} className="news-card_title-link">
                    <h3 className="news-card_title">{article.title}</h3>
                </Link>

                <p className="news-card_date">
                    {new Date(article.createdAt).toLocaleDateString()}
                </p>
            </div>
        </article>
    );
}

export default NewsCard;