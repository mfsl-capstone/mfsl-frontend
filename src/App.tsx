import React from 'react';
import './App.css';
import {Outlet, useLocation} from "react-router-dom";
import NavBar from "./components/NavBar";
import {AuthProvider} from "./components/AuthContext";


function App() {
    const location = useLocation();
    return (
        <div>
            <header className="App-header">
                <AuthProvider>
                    {location.pathname !== '/' && location.pathname !== '/signup' && <NavBar/>}
                    <Outlet/>
                </AuthProvider>
            </header>
        </div>
    );
}

export default App;
