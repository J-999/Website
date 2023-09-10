// src/components/Router.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Info from './Info';
import Projects from './Projects';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" component={Home} />
        <Route path="/info" component={Info} />
        <Route path="/projects" component={Projects} />
      </Routes>
      
    </Router>
  );
}

export default AppRouter;
