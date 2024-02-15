import React from 'react';
import './App.css';
import {Outlet} from "react-router-dom";
import NavBar from "./components/NavBar";


function App() {
  return (

    <div >
      <header className="App-header">
          <NavBar/>
          <Outlet/>
      </header>
    </div>
  );
}

export default App;
