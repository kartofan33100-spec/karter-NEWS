import React from 'react';
import AuthForm from '../components/auth/AuthForm';
import Navbar from '../components/layout/Navbar';

function RegisterPage() {
    return (
        <div style={{ background: '#dcdcdc', minHeight: '100vh' }}>
            <Navbar />
            <AuthForm type="register" />
        </div>
    );
}

export default RegisterPage;