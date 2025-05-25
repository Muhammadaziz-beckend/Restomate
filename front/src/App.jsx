import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./static/css/style.css";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Login from "./pages/Login";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="login/" element={<Login />}/>
        <Route path="/" element={<Tables />} />
        <Route path="tables/:id/id/:id_tl" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
