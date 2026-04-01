import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import NewsCard from '../components/news/NewsCard';
import { getAllArticles } from '../services/newsService';

function CategoryPage() {
    const { categoryName } = useParams();
    const [articles, setArticles] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        async function loadArticles() {
            try {
                setLoading(true);
                const decodedCategory = decodeURIComponent(categoryName);
                const data = await getAllArticles('', decodedCategory);
                setArticles(data);
            } catch (error) {
                setMessage(error.message);
            } finally {
                setLoading(false);
            }
        }

        loadArticles();
    }, [categoryName]);

    const filteredArticles = articles.filter((article) =>
        article.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={{ background: '#dcdcdc', minHeight: '100vh' }}>
            <Navbar search={search} setSearch={setSearch} />

            <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', background: '#f4f4f4' }}>
                <h1>{decodeURIComponent(categoryName)}</h1>

                {loading && <p>Загрузка...</p>}
                {message && <p style={{ color: 'red' }}>{message}</p>}

                {!loading && !message && filteredArticles.length === 0 && (
                    <p>В этой категории ничего не найдено.</p>
                )}

                {!loading && !message && filteredArticles.length > 0 && (
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: '24px',
                        }}
                    >
                        {filteredArticles.map((article) => (
                            <NewsCard key={article._id} article={article} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

export default CategoryPage;