import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/login/Login";
import Register from "./components/Register/Register";
import { UserView } from "./components/UserView/UserView";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { Alquiler } from "./components/Alquiler/Alquiler";
import { Property } from "./commons/Property/Property";
import { Venta } from "./components/Venta/Venta";
import { AdminProps } from "./components/AdminProps/AdminProps";
import { AdminAllUsers } from "./components/AdminAllUsers/AdminAllUsers";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/property/:id" element={<Property />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userview" element={<UserView />} />
        <Route path="/alquiler" element={<Alquiler />} />
        <Route path="/venta" element={<Venta />} />
        <Route path="/propiedades" element={<AdminProps />} />
        <Route path="/users" element={<AdminAllUsers />} />
      </Routes>
    </div>
  );
}

export default App;
