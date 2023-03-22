import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});
  console.log("user", user);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    axios
      .post("api/user/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log("r4es", res);
        setUser(res.data);
      })
      .catch(() => {
        alert("se rompio");
      });
  };
  // useEffect(() => {
  //   const userLogueado = user || {};

  //   setUser(userLogueado);
  //   console.log("desdeuseefect", userLogueado);
  // }, [user]);

  return (
    <div className="todo">
      <div className="color-overlay d-flex justify-content-center align-items-center">
        <Form className="rounded p-4 p-sm-3" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="Ingrese su Email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Ingrese su contraseña"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Entrar
            <Link to="/" />
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
