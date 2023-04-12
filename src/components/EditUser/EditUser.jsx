import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [user, setUser] = useState([]);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const userLogueado = JSON.parse(localStorage.getItem("user")) || {};
    setUser(userLogueado);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .patch(`api/user/update/${user.id}`, {
        first_name: firstName,
        last_name: lastName,
        phone: phone,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        alert("Se realizaron los cambios satisfactoriamente");
        navigate("/userview");
      })
      .catch(() => {
        alert("Hubo un error al actualizar los datos");
      });
  };

  return (
    <div>
      <h1>Editar</h1>
      <form onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input
          type="text"
          value={user.firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />{" "}
        <br />
        <label>Apellido:</label>
        <input
          type="text"
          value={user.lastname}
          onChange={(e) => setLastName(e.target.value)}
        />{" "}
        <br />
        <label>Telefono:</label>
        <input
          type="text"
          value={user.phone}
          onChange={(e) => setPhone(e.target.value)}
        />{" "}
        <br />
        {/* <label>Contraseña:</label>
        <input
          type="text"
          value={user.password}
          onChange={(e) =>  setPassword(e.target.value)}
        />{" "} */}
        <br />
        <button>Editar</button>
      </form>
    </div>
  );
};

export default EditUser;
