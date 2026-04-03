import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState('');

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');

        if (savedToken) {
            setToken(savedToken);
        }

        if (savedUser) {
            try {
                const parsedUser = JSON.parse(savedUser);

                const normalizedUser = parsedUser
                    ? {
                        ...parsedUser,
                        id: parsedUser.id || parsedUser._id,
                    }
                    : null;

                setUser(normalizedUser);
            } catch (error) {
                console.error('Failed to parse saved user:', error);
                localStorage.removeItem('user');
            }
        }
    }, []);

    function login(authData) {
        const normalizedUser = authData.user
            ? {
                ...authData.user,
                id: authData.user.id || authData.user._id,
            }
            : null;

        setUser(normalizedUser);
        setToken(authData.token || '');

        localStorage.setItem('token', authData.token || '');
        localStorage.setItem('user', JSON.stringify(normalizedUser));
    }

    function logout() {
        setUser(null);
        setToken('');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}