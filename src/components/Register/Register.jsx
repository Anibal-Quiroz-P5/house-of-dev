import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "./Register.css";

function BasicExample() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");

    axios
      .post("api/user/register", {
        email: email,
        password: password,
        first_name: firstName,
        last_name: lastName,
      })
      .then((res) => {
        alert("Registro completo - ahora puede loguearse !!")
      })
      .catch(() => {
        alert("Registro incompleto - vuelva a registrarse por favor !!");
      });
  };

  return (   

    <Form   className="form-container"  onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>   </Form.Label>
        <Form.Control
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          type="text"
          placeholder ="Ingrese su nombre"
        />
      </Form.Group>

      <Form.Group
        value={lastName}
        onChange={(e) => {
          setLastName(e.target.value);
        }}
        className="mb-3"
        controlId="formBasicEmail"
      >
        <Form.Label>   </Form.Label>
        <Form.Control type="text" placeholder="Ingrese su apellido" />
      </Form.Group>

      <Form.Group
        value={phoneNumber}
        onChange={(e) => {
          setPhoneNumber(e.target.value);
        }}
        className="mb-3"
        controlId="formBasicEmail"
      >
        <Form.Label>   </Form.Label>
        <Form.Control type="text" placeholder="Ingrese su teléfono" />
      </Form.Group>

      <Form.Group
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        className="mb-3"
        controlId="formBasicEmail"
      >
        <Form.Label>   </Form.Label>
        <Form.Control type="email" placeholder="Ingrese su email" />
      </Form.Group>

      <Form.Group
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        className="mb-3"
        controlId="formBasicPassword"
      >
        <Form.Label>   </Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
      </Form.Group>
      <Button variant="danger" type="submit"  >
        Submit
      </Button>
    </Form>
  );
}


export default BasicExample;
