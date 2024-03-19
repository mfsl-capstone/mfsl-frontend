import React from 'react';
import './App.css';
import {Outlet} from "react-router-dom";
import NavBar from "./components/NavBar";
import {AuthProvider} from "./components/AuthContext";


function App() {
  return (

    <div >
      <header className="App-header">

          <AuthProvider>
              <NavBar/>
              <Outlet/>
          </AuthProvider>
      </header>
    </div>
  );
}

export default App;
