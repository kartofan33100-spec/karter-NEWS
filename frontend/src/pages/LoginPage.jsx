import React from 'react';
import AuthForm from '../components/auth/AuthForm';
import Navbar from '../components/layout/Navbar';

function LoginPage() {
    return (
        <div style={{ background: '#dcdcdc', minHeight: '100vh' }}>
            <Navbar />
            <AuthForm type="login" />
        </div>
    );
}

export default LoginPage;