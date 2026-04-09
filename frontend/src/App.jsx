import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreateArticlePage from './pages/CreateArticlePage';
import EditArticlePage from './pages/EditArticlePage';
import NewsPage from './pages/NewsPage';
import CategoryPage from './pages/CategoryPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import MyArticlesPage from './pages/MyArticlesPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminPage from './pages/AdminPage';
import AdminRoute from './components/routes/AdminRoute';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/news/:id" element={<NewsPage />} />
                <Route path="/category/:categoryName" element={<CategoryPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    path="/articles/create"
                    element={
                        <ProtectedRoute>
                            <CreateArticlePage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/articles/:id/edit"
                    element={
                        <ProtectedRoute>
                            <EditArticlePage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/my-articles"
                    element={
                        <ProtectedRoute>
                            <MyArticlesPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin"
                    element={
                        <AdminRoute>
                            <AdminPage />
                        </AdminRoute>
                    }
                />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;