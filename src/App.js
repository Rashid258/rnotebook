import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import About from "./Components/About";
import NoteState from "./Context/notes/NoteState";
import Alert from "./Components/Alert";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Notes from "./Components/Notes";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Footer from "./Components/Footer";


function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }
  return (
    <div>
      <NoteState>
      <Router>
        <Navbar  showAlert={showAlert}/>
        <Alert alert={alert} />
        <div className="container">
        <Routes>
          <Route exact path="/" element={<Notes showAlert={showAlert} />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/login" element={<Login showAlert={showAlert} />} />
          <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
        </Routes>
        </div>
        <Footer />
      </Router>
      </NoteState>
    </div>
  );
}

export default App;
