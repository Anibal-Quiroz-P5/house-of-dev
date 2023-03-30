import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/login/Login";
import Register from "./components/Register/Register";
import { UserView } from "./components/UserView/UserView";
import { Grid } from "./commons/Grid/Grid";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import { Home } from "./components/Home/Home";
import { Alquiler } from "./components/Alquiler/Alquiler";
import { Card } from "./commons/Card/Card";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/propiedad" element={<Card />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/propiedades-alquiler" element={<Alquiler />} />
        <Route path="/userview" element={<UserView />} />
      </Routes>
    </div>
  );
}

export default App;
