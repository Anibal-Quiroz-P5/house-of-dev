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
import EditProperty from "./components/EditProperty/EditProperty";
import { useState, useEffect } from "react";
import { Favoritos } from "./components/Favoritos/Favoritos";
import AddProperty from "./components/EditProperty/AddProperty";
import EditUser from "./components/EditUser/EditUser";

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const userLogueado = JSON.parse(localStorage.getItem("user")) || {};
    setUser(userLogueado);
  }, []);

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
        <Route path="/edituser" element={<EditUser />} />
        <Route path="/venta" element={<Venta />} />
        <Route path="/agregar" element={<AddProperty />} />
        <Route path="/edit/:id" element={<EditProperty />} />
       
        <Route path="/favoritos" element={<Favoritos />} />
        {user.is_admin ? (
          <Route path="/propiedades" element={<AdminProps />} />
        ) : null}
        {user.is_admin ? (
          <Route path="/users" element={<AdminAllUsers />} />
        ) : null}
      </Routes>
    </div>
  );
}

export default App;
