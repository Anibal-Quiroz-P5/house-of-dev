import axios from "axios";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router";

import "./Register.css";

function BasicExample() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("api/user/register", {
        email: email,
        password: password,
        first_name: firstName,
        last_name: lastName,
        phone: phoneNumber,
      })
      .then((res) => {
        console.log(res.data);
        console.log("Registro completo - ahora puede loguearse !!");
        navigate("/login");
      })
      .catch(() => {
        console.log("error de registro");
      });
  };

  return (
    <div className="cont-login">
      <div className="cont-titulo">
        <h3 className="h3-house">HOUSE</h3>
        <h3 className="h3-of-dev">OF DEV.</h3>
      </div>
      <Form className="form-login" onSubmit={handleSubmit}>
        <Form.Group className="form-inputs" controlId="formBasicName">
          <Form.Control
            required
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            type="text"
            placeholder="Ingrese su nombre"
            className="input"
          />
        </Form.Group>
        <Form.Group className="form-inputs" controlId="formBasicLastName">
          <Form.Control
            required
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            type="text"
            placeholder="Ingrese su apellido"
            className="input"
          />
        </Form.Group>
        <Form.Group className="form-inputs" controlId="formBasicNumber">
          <Form.Control
            required
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
            type="number"
            placeholder="Ingrese su teléfono"
            className="input"
          />
        </Form.Group>

        <Form.Group className="form-inputs" controlId="formBasicEmail">
          <Form.Control
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="Ingrese su email"
            className="input"
          />
        </Form.Group>
        <Form.Group className="form-inputs" controlId="formBasicPassword">
          <Form.Control
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Password"
            className="input"
          />
        </Form.Group>
        <button className="btn-reg" type="submit">
          REGISTRARSE
        </button>
      </Form>
    </div>
  );
}

export default BasicExample;
