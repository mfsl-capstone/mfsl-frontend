import React, { createContext, useContext, useState } from 'react';
import {useNavigate} from "react-router-dom";

interface AuthContextType {
    user: {
        token: string | null;
        username: string | null;
    };
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

interface UserState {
    token: string | null;
    username: string | null;
}

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [user, setUser] = useState<UserState>({
        token: null,
        username: null,
    });
    const [authenticated,setAuthenticated] = useState(false);
    const navigate = useNavigate();

    const login = (newToken: string | null, newUsername: string | null) => {
        setUser({
            token: newToken ?? user.token,
            username: newUsername ?? user.username,
        });
        setAuthenticated(true);
        navigate('/standings');

    };

    const logout = () => {
        setUser({
            token: null,
            username: null,
        });
        setAuthenticated(false);
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated: authenticated, login, logout, user }}>
            {children}
        </AuthContext.Provider>
    );
};