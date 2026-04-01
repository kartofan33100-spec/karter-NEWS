import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import CreateArticlePage from '../pages/CreateArticlePage';
import EditArticlePage from '../pages/EditArticlePage';
import ProtectedRoute from '../components/auth/ProtectedRoute';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'login',
                element: <LoginPage />,
            },
            {
                path: 'register',
                element: <RegisterPage />,
            },
            {
                path: 'articles/create',
                element: (
                    <ProtectedRoute>
                        <CreateArticlePage />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'articles/:id/edit',
                element: (
                    <ProtectedRoute>
                        <EditArticlePage />
                    </ProtectedRoute>
                ),
            },
        ],
    },
]);

export default router;