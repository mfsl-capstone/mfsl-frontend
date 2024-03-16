import {createBrowserRouter} from "react-router-dom";
import React from "react";
import App from "../App";
import LoginPage from "../Pages/LoginPage/LoginPage";
import SignUpPage from "../Pages/SignUpPage/SignUpPage";
import StandingsPage from "../Pages/StandingsPage/StangingsPage";
import ResultsPage from "../Pages/ResultsPage/ResultsPage";
import FixturePage from "../Pages/FixturePage/FixturePage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children:[
            {path: "", element: <LoginPage/>},
            {path: "signup", element: <SignUpPage/>},
            {path: "standings", element: <StandingsPage/>},
            {path: "results", element: <ResultsPage/>},
            {path: "fixtures", element: <FixturePage/>},
            {path: "results", element: <ResultsPage/>},

        ]
    }
])