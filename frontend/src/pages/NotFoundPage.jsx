import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import '../styles/not-found-page.css';

function NotFoundPage() {
    return (
        <div className="not-found-page">
            <Navbar />

            <main className="not-found-page_main">
                <div className="not-found-page_box">
                    <h1 className="not-found-page_code">404</h1>

                    <h2 className="not-found-page_title">Страница не найдена</h2>

                    <p className="not-found-page_text">
                        Такой страницы не существует или она была перемещена.
                    </p>

                    <Link to="/" className="not-found-page_link">
                        На главную
                    </Link>
                </div>
            </main>
        </div>
    );
}

export default NotFoundPage;