import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Toggle from "react-toggle";
import ReactSwitch from "react-switch";
import Navbar from './components/Navigation';
import Home from './components/Home';
import Projects from './components/Projects';
import Info from './components/Info';
import DarkMode from './components/DarkMode';
import './App.css';

export const ThemeContext = createContext(null);

function App() {

  // const [isDark, setIsDark] = useState(true);


  return (
    <div className='App'>

    {/* <Toggle
      checked={isDark}
      onChange={({ target }) => setIsDark(target.checked)}
      icons={{ checked: "🌙", unchecked: "🔆" }}
      aria-label="Dark mode toggle"
    /> */}
      <DarkMode />
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
      hello there

      {/* <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="body" id={theme}>
        <div className="settings">
          <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
        </div>
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
      </ThemeContext.Provider> */}
    </div>
  );
}

export default App;
