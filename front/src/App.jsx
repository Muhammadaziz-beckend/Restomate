import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./static/css/style.css";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Login from "./pages/Login";
import Dressed from "./pages/Dressed";
import Check from "./pages/Check";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="login/" element={<Login />} />
        <Route path="/" element={<Tables />} />
        <Route path="tables/:id/id/:id_tl" element={<Home />} />
        <Route path="dressed/" element={<Dressed />} />
        <Route path="check/:id/" element={<Check />}/>
      </Routes>
    </Router>
  );
};

export default App;
