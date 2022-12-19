import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Adduser from "./pages/Adduser";

function App() {
  return (
    <div className="App">
      <ToastContainer position="top-center" />
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/adduser" element={<Adduser />} />
          <Route path="/update/:id" element={<Adduser />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
