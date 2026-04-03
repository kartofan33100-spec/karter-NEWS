import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import NewsCard from '../components/news/NewsCard';
import { getAllArticles } from '../services/newsService';
import '../styles/category-page.css';

function CategoryPage() {
    const { categoryName } = useParams();

    const [articles, set_articles] = useState([]);
    const [message, set_message] = useState('');
    const [loading, set_loading] = useState(true);
    const [search, set_search] = useState('');

    useEffect(() => {
        async function load_articles() {
            try {
                set_loading(true);
                const decoded_category = decodeURIComponent(categoryName);
                const data = await getAllArticles('', decoded_category);
                set_articles(data);
            } catch (error) {
                set_message(error.message);
            } finally {
                set_loading(false);
            }
        }

        load_articles();
    }, [categoryName]);

    const filtered_articles = useMemo(() => {
        return articles.filter((article) =>
            article.title.toLowerCase().includes(search.toLowerCase())
        );
    }, [articles, search]);

    return (
        <div className="category-page">
            <Navbar search={search} setSearch={set_search} />

            <main className="category-page_main">
                <h1 className="category-page_title">
                    {decodeURIComponent(categoryName)}
                </h1>

                {loading && <p className="category-page_state">Загрузка...</p>}

                {message && (
                    <p className="category-page_state category-page_state-error">
                        {message}
                    </p>
                )}

                {!loading && !message && filtered_articles.length === 0 && (
                    <p className="category-page_state">
                        В этой категории ничего не найдено.
                    </p>
                )}

                {!loading && !message && filtered_articles.length > 0 && (
                    <div className="category-page_grid">
                        {filtered_articles.map((article) => (
                            <NewsCard key={article._id} article={article} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

export default CategoryPage;