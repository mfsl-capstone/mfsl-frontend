import { createBrowserRouter } from "react-router-dom";
import React from "react";
import App from "../App";
import LoginPage from "../Pages/LoginPage/LoginPage";
import SignUpPage from "../Pages/SignUpPage/SignUpPage";
import StandingsPage from "../Pages/StandingsPage/StangingsPage";
import ResultsPage from "../Pages/ResultsPage/ResultsPage";
import FixturePage from "../Pages/FixturePage/FixturePage";
import { ProtectedRoute } from "./ProtectedRoute"; // Make sure to import ProtectedRoute
import TeamSelectionPage from "../Pages/TeamSelectionPage/TeamSelectionPage";
import NotFoundPage from "../Pages/NotFoundPage/NotFoundPage";
import TradePage from "../Pages/TradePage/TradePage";

export const router = createBrowserRouter([
    {

        path: '/',
        element: <App/>,
        children:[
            { path: "", element: <LoginPage/> },
            { path: "signup", element: <SignUpPage/> },
            { path: "*", element: <NotFoundPage/> },
            {
                // Wrap the element of protected routes with ProtectedRoute
                path: "standings",
                element: (
                    <ProtectedRoute>
                        <StandingsPage/>
                    </ProtectedRoute>
                ),
            },
            {
                path: "results",
                element: (
                    <ProtectedRoute>
                        <ResultsPage/>
                    </ProtectedRoute>
                ),
            },
            {
                path: "fixtures",
                element: (
                    <ProtectedRoute>
                        <FixturePage/>
                    </ProtectedRoute>
                ),
            },
            {
                path: "team-selection",
                element: (
                    <ProtectedRoute>
                        <TeamSelectionPage/>
                    </ProtectedRoute>
                ),
            },
            {
                path: "trade",
                element: (
                    <ProtectedRoute>
                        <TradePage/>
                    </ProtectedRoute>
                ),
            }
        ]
    }
]);