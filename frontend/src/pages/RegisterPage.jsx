import React from 'react';
import Navbar from '../components/layout/Navbar';
import AuthForm from '../components/auth/AuthForm';

function RegisterPage() {
    return (
        <div className="auth-layout">
            <Navbar />
            <AuthForm type="register" />
        </div>
    );
}

export default RegisterPage;