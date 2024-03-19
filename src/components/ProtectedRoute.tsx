import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import React from "react";

export const ProtectedRoute: React.FC<React.PropsWithChildren<{}>> = ({ children }) =>{
    const { isAuthenticated } = useAuth();

    console.log("hi",isAuthenticated);
    if (!isAuthenticated) {

        return <Navigate to="/" />;
    }
    return <>{children}</>;
};