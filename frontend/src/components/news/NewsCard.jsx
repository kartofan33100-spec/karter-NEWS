import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/NewsCard.css';

function NewsCard({ article }) {
    return (
        <article className="news-card">
            {article.image ? (
                <img
                    className="news-card-image"
                    src={article.image}
                    alt={article.title}
                />
            ) : (
                <div className="news-card-image news-card-image-placeholder">
                    No image
                </div>
            )}

            <div className="news-card-content">
                <p className="news-card-category">{article.category}</p>

                <h3 className="news-card-title">{article.title}</h3>

                <p className="news-card-summary">{article.summary}</p>

                <div className="news-card-footer">
          <span className="news-card-author">
            {article.author?.name || 'Unknown author'}
          </span>
                    <span className="news-card-date">
            {new Date(article.createdAt).toLocaleDateString()}
          </span>
                </div>

                <Link className="news-card-link" to={`/news/${article._id}`}>
                    Читать полностью
                </Link>
            </div>
        </article>
    );
}

export default NewsCard;