import {Navigate} from "react-router-dom";
import {useAuth} from "../components/AuthContext";
import React from "react";

export const ProtectedRoute: React.FC<React.PropsWithChildren<{}>> = ({children}) => {
    const {isAuthenticated} = useAuth();

    if (!isAuthenticated) {

        return <Navigate to="/"/>;
    }
    return <>{children}</>;
};