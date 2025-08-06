import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import TextForm from "./Components/TextForm";
import About from "./Components/About";
import Alert from "./Components/Alert";

function App() {
  const [mode, setMode] = useState("light");
  const [alert, setAlert] = useState(null);

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.documentElement.setAttribute('data-theme', 'dark');
      document.body.style.backgroundColor = "#212529";
      document.body.style.color = "#fff";
      showAlert("Dark mode enabled", "success");
    } else {
      setMode("light");
      document.documentElement.setAttribute('data-theme', 'light');
      document.body.style.backgroundColor = "#f8f9fa";
      document.body.style.color = "#212529";
      showAlert("Light mode enabled", "success");
    }
  };

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <Router>
      <Navbar title="TextUtils" mode={mode} toggleMode={toggleMode} />
      <Alert alert={alert} />
      <Routes>
        <Route
          exact
          path="/"
          element={<TextForm mode={mode} showAlert={showAlert} />}
        />
        <Route exact path="/about" element={<About mode={mode} />} />
      </Routes>
    </Router>
  );
}

export default App;
