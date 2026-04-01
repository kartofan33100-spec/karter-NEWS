import React, { useEffect, useMemo, useState } from 'react';
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

            <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', background: '#f4f4f4' }}>
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
                                <div
                                    style={{
                                        background: '#000',
                                        color: '#fff',
                                        minHeight: '320px',
                                        padding: '24px',
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
                          marginBottom: '12px',
                      }}
                  >
                    СРОЧНЫЕ НОВОСТИ
                  </span>

                                    {mainArticle ? (
                                        <>
                                            <h2 style={{ margin: '0 0 8px' }}>{mainArticle.title}</h2>
                                            <p style={{ margin: 0 }}>{mainArticle.summary}</p>
                                        </>
                                    ) : (
                                        <>
                                            <h2 style={{ margin: '0 0 8px' }}>Заголовок</h2>
                                            <p style={{ margin: 0 }}>Описание супер крутой и важной новости</p>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {sideArticles.map((article) => (
                                    <div key={article._id} style={{ background: '#ececec', padding: '18px' }}>
                                        <p style={{ color: '#c81414', fontSize: '12px', fontWeight: '700', margin: '0 0 8px' }}>
                                            {article.category.toUpperCase()}
                                        </p>
                                        <h3 style={{ margin: '0 0 12px', fontSize: '20px' }}>{article.title}</h3>
                                        <p style={{ margin: 0, color: '#555' }}>
                                            {new Date(article.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 style={{ marginBottom: '10px' }}>Последние новости</h2>
                            <div style={{ height: '3px', background: '#c81414', marginBottom: '20px' }} />

                            {filteredArticles.length === 0 ? (
                                <p>Ничего не найдено.</p>
                            ) : (
                                <div
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                                        gap: '24px',
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