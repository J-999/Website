import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReactSwitch from "react-switch";
import Navbar from './components/Navigation';
import Home from './components/Home';
import Projects from './components/Projects';
import Info from './components/Info';
import './App.css';

export const ThemeContext = createContext(null);

function App() {

  // const [theme, setTheme] = useState("dark");

  // // toggle between dark and light mode
  // const toggleTheme = () => {
  //   setTheme((curr) => (curr === "light" ? "dark" : "light"));
  // };

  return (
    <div className='App'>
      {/* <ThemeContext.Provider value={{ theme, toggleTheme }}> */}
      {/* <div className="body" id={theme}> */}
      <div className="body">
        {/* <div className="settings">
            <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
        </div> */}
        <div className='name-text'>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/info" element={<Info />} />
            </Routes>
          </Router>
        </div>
      </div>
      {/* </ThemeContext.Provider> */}
    </div>
    
  );
}

export default App;
