import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useDispatch } from "react-redux";
import { setUser } from "../../state/user";

function Login() {
  // Pruenas redux//
  const dispatch = useDispatch();
  ///
  const navigate = useNavigate();

  // const [user, setUser] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("api/user/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        dispatch(setUser(res.data));
        console.log(res.data);
        navigate("/");
      })
      .catch(() => {
        alert("se rompio");
      });
  };

  return (
    <div className="todo">
      INICIAR SESIÓN
      <div className="color-overlay d-flex justify-content-center align-items-center">
        <Form className="rounded p-4 p-sm-3" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="Ingrese su Email"
              className="input"
              required
            />
          </Form.Group>
          <Form.Group className="mb-5" controlId="formBasicPassword">
            <Form.Control
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Ingrese su contraseña"
              required
            />
          </Form.Group>

          <button className="btn-mi-color" type="submit">
            LOG IN
            <Link to="/" />
          </button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
