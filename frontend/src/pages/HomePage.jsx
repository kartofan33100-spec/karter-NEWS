import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllArticles } from '../services/newsService';
import Navbar from '../components/layout/Navbar';
import NewsCard from '../components/news/NewsCard';

function HomePage() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [search, setSearch] = useState('');

    useEffect(() => {
        async function loadArticles() {
            try {
                setLoading(true);
                const data = await getAllArticles();
                setArticles(data);
            } catch (error) {
                setMessage(error.message);
            } finally {
                setLoading(false);
            }
        }

        loadArticles();
    }, []);

    const filteredArticles = useMemo(() => {
        return articles.filter((article) =>
            article.title.toLowerCase().includes(search.toLowerCase())
        );
    }, [articles, search]);

    const mainArticle = filteredArticles[0];
    const sideArticles = filteredArticles.slice(1, 3);
    const latestArticles = filteredArticles.slice(3);

    return (
        <div style={{ background: '#dcdcdc', minHeight: '100vh' }}>
            <Navbar search={search} setSearch={setSearch} />

            <main
                style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '20px',
                    background: '#f4f4f4',
                }}
            >
                {loading && <p>Загрузка...</p>}
                {message && <p style={{ color: 'red' }}>{message}</p>}

                {!loading && !message && (
                    <>
                        <section
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '2fr 1fr',
                                gap: '24px',
                                marginBottom: '40px',
                            }}
                        >
                            <div>
                                {mainArticle ? (
                                    <Link
                                        to={`/news/${mainArticle._id}`}
                                        style={{
                                            display: 'block',
                                            textDecoration: 'none',
                                            color: '#fff',
                                            minHeight: '360px',
                                            padding: '28px',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.65)), url(${mainArticle.image || 'https://via.placeholder.com/1200x700?text=News'})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                        }}
                                    >
                                        <div
                                            style={{
                                                position: 'absolute',
                                                inset: 0,
                                            }}
                                        />

                                        <div
                                            style={{
                                                position: 'relative',
                                                height: '100%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'flex-end',
                                            }}
                                        >
                      <span
                          style={{
                              background: '#c81414',
                              color: '#fff',
                              padding: '8px 12px',
                              width: 'fit-content',
                              fontSize: '12px',
                              fontWeight: '700',
                              marginBottom: '14px',
                          }}
                      >
                        СРОЧНЫЕ НОВОСТИ
                      </span>

                                            <h2 style={{ margin: '0 0 10px', fontSize: '24px' }}>
                                                {mainArticle.title}
                                            </h2>

                                            <p
                                                style={{
                                                    margin: 0,
                                                    fontSize: '18px',
                                                    lineHeight: '1.5',
                                                    maxWidth: '90%',
                                                }}
                                            >
                                                {mainArticle.summary}
                                            </p>
                                        </div>
                                    </Link>
                                ) : (
                                    <div
                                        style={{
                                            minHeight: '360px',
                                            background: '#000',
                                        }}
                                    />
                                )}
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {sideArticles.map((article) => (
                                    <Link
                                        key={article._id}
                                        to={`/news/${article._id}`}
                                        style={{
                                            background: '#ececec',
                                            padding: '18px',
                                            textDecoration: 'none',
                                            color: '#111',
                                            minHeight: '128px',
                                            display: 'block',
                                        }}
                                    >
                                        <p
                                            style={{
                                                color: '#c81414',
                                                fontSize: '12px',
                                                fontWeight: '700',
                                                margin: '0 0 8px',
                                            }}
                                        >
                                            {article.category.toUpperCase()}
                                        </p>

                                        <h3
                                            style={{
                                                margin: '0 0 14px',
                                                fontSize: '20px',
                                                lineHeight: '1.3',
                                            }}
                                        >
                                            {article.title}
                                        </h3>

                                        <p style={{ margin: 0, color: '#555' }}>
                                            {new Date(article.createdAt).toLocaleDateString()}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 style={{ marginBottom: '10px', fontSize: '28px' }}>Последние новости</h2>
                            <div style={{ height: '4px', background: '#c81414', marginBottom: '20px' }} />

                            {filteredArticles.length === 0 ? (
                                <p>Ничего не найдено.</p>
                            ) : (
                                <div
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                                        gap: '12px',
                                        alignItems: 'start',
                                    }}
                                >
                                    {latestArticles.map((article) => (
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