import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

interface AuthContextType {
    login: (newToken: string | null, newUsername: string | null) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const navigate = useNavigate();
    let token = localStorage.getItem('token');
    const [authenticated, setAuthenticated] = useState(token==null);

    useEffect(() => {
        // This effect ensures that any change to user.token updates isAuthenticated accordingly
        setAuthenticated(!!token);
    }, [token]);

    const login = (newToken: string | null, newUsername: string | null) => {
        localStorage.setItem('token', newToken ?? '');
        localStorage.setItem('username', newUsername ?? '');

        let token = localStorage.getItem('token');
        setAuthenticated(!!token);

        navigate('/standings');
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');

        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated: authenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};