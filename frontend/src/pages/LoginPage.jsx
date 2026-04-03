import React from 'react';
import Navbar from '../components/layout/Navbar';
import AuthForm from '../components/auth/AuthForm';

function LoginPage() {
    return (
        <div className="auth-layout">
            <Navbar />
            <AuthForm type="login" />
        </div>
    );
}

export default LoginPage;