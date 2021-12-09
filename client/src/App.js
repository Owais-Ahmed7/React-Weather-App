import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

//components
import SearchWeather from "./components/SearchWeather";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

const App = () => {
    return <Router>
        <Navbar />
        <br />
        <div className="container">
           <Routes>
              <Route exact path="/" element={ <Home /> } />
              <Route path="/searchweather" element={ <SearchWeather /> } />
            </Routes>
        </div>    
    </Router>
}


export default App;