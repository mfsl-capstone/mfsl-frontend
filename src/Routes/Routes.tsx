import {createBrowserRouter} from "react-router-dom";
import React from "react";
import App from "../App";
import LoginPage from "../Pages/LoginPage/LoginPage";
import SignUpPage from "../Pages/SignUpPage/SignUpPage";
import StandingsPage from "../Pages/StandingsPage/StangingsPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children:[
            {path: "", element: <LoginPage/>},
            {path: "signup", element: <SignUpPage/>},
            {path: "standings", element: <StandingsPage/>},

        ]
    }
])