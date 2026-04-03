import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllArticles } from '../services/newsService';
import Navbar from '../components/layout/Navbar';
import NewsCard from '../components/news/NewsCard';
import '../styles/Home.css';

function HomePage() {
    const [articles, set_articles] = useState([]);
    const [loading, set_loading] = useState(true);
    const [message, set_message] = useState('');
    const [search, set_search] = useState('');

    useEffect(() => {
        async function load_articles() {
            try {
                set_loading(true);
                const data = await getAllArticles();
                set_articles(data);
            } catch (error) {
                set_message(error.message);
            } finally {
                set_loading(false);
            }
        }

        load_articles();
    }, []);

    const filtered_articles = useMemo(() => {
        return articles.filter((article) =>
            article.title.toLowerCase().includes(search.toLowerCase())
        );
    }, [articles, search]);

    const main_article = filtered_articles[0];
    const side_articles = filtered_articles.slice(1, 3);
    const latest_articles = filtered_articles.slice(3);

    return (
        <div className="home-page">
            <Navbar search={search} setSearch={set_search} />

            <main className="home-page_main">
                {loading && <p className="home-page_state">Загрузка...</p>}
                {message && <p className="home-page_state home-page_state-error">{message}</p>}

                {!loading && !message && (
                    <>
                        <section className="home-page_top-news">
                            <div className="home-page_top-main">
                                {main_article ? (
                                    <Link
                                        to={`/news/${main_article._id}`}
                                        className="home-page_hero-link"
                                        style={{
                                            backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.65)), url(${main_article.image || 'https://via.placeholder.com/1200x700?text=News'})`,
                                        }}
                                    >
                                        <div className="home-page_hero-content">
                                            <span className="home-page_hero-badge">СРОЧНЫЕ НОВОСТИ</span>
                                            <h2 className="home-page_hero-title">{main_article.title}</h2>
                                            <p className="home-page_hero-text">{main_article.summary}</p>
                                        </div>
                                    </Link>
                                ) : (
                                    <div className="home-page_hero-empty" />
                                )}
                            </div>

                            <div className="home-page_top-side">
                                {side_articles.map((article) => (
                                    <Link
                                        key={article._id}
                                        to={`/news/${article._id}`}
                                        className="home-page_side-card"
                                    >
                                        <p className="home-page_side-category">
                                            {article.category.toUpperCase()}
                                        </p>

                                        <h3 className="home-page_side-title">{article.title}</h3>

                                        <p className="home-page_side-date">
                                            {new Date(article.createdAt).toLocaleDateString()}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </section>

                        <section className="home-page_latest">
                            <h2 className="home-page_latest-title">Последние новости</h2>
                            <div className="home-page_latest-line" />

                            {filtered_articles.length === 0 ? (
                                <p className="home-page_state">Ничего не найдено.</p>
                            ) : (
                                <div className="home-page_latest-grid">
                                    {latest_articles.map((article) => (
                                        <NewsCard key={article._id} article={article} />
                                    ))}
                                </div>
                            )}
                        </section>
                    </>
                )}
            </main>
        </div>
    );
}

export default HomePage;