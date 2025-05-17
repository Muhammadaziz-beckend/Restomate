import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./static/css/style.css";
import Home from "./pages/Home";
import Tables from "./pages/Tables";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Tables />} />
        <Route path="/:id/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
