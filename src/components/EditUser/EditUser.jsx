import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [user, setUser] = useState([]);
  const [newPhone, setNewPhone] = useState("");

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
        phone: newPhone,
      })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        alert("Se realizaron los cambios satisfactoriamente");
        navigate("/userview");
      })
      .catch(() => {
        console.log("Hubo un error al actualizar los datos");
      });
  };

  return (
    <div className="cont-login">
      <div className="cont-titulo">
        <h3 className="h3-house">EDITAR USUARIO</h3>
      </div>
      <form className="form-login" onSubmit={handleSubmit}>
        <Form.Group className="form-inputs">
          <input
            placeholder="Ingrese su nuevo nombre"
            type="text"
            value={user.firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />{" "}
        </Form.Group>
        <Form.Group className="form-inputs">
          <input
            placeholder="Ingrese su nuevo apellido"
            type="text"
            value={user.lastname}
            onChange={(e) => setLastName(e.target.value)}
          />{" "}
        </Form.Group>
        <Form.Group className="form-inputs">
          <input
            placeholder="Ingrese su nuevo número"
            type="text"
            value={user.newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
          />{" "}
        </Form.Group>
        <button className="btn-login">Editar</button>
      </form>
    </div>
  );
};

export default EditUser;
