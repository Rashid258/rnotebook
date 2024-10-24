import React from "react";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NoteState from "./Context/notes/NoteState";
import Alert from "./Components/Alert";


function App() {
  return (
    <div>
      <NoteState>
      <Router>
        <Navbar />
        <Alert msg="Rashid rafi is learning react." />
        <div className="container">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
        </Routes>
        </div>
      </Router>
      </NoteState>
    </div>
  );
}

export default App;
