import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
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
    <Form className="form-container" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label> </Form.Label>
        <Form.Control
          required
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          type="text"
          placeholder="Ingrese su nombre"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicLastName">
        <Form.Label> </Form.Label>
        <Form.Control
          required
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          type="text"
          placeholder="Ingrese su apellido"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicNumber">
        <Form.Label> </Form.Label>
        <Form.Control
          required
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
          type="number"
          placeholder="Ingrese su teléfono"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label> </Form.Label>
        <Form.Control
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
          placeholder="Ingrese su email"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label> </Form.Label>
        <Form.Control
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          placeholder="Password"
        />
      </Form.Group>
      {/* <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group> */}
      <Button variant="danger" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default BasicExample;
