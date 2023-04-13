import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useDispatch } from "react-redux";
import { setUser } from "../../state/user";
import Swal from "sweetalert2";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
        Swal.fire({
          title: "Email o contraseña incorrectas. Intente nuevamente",
          icon: "error",
          timer: "3000",
        });
      });
  };

  return (
    <div className="cont-login">
      <div className="cont-titulo">
        <h3 className="h3-house">HOUSE</h3>
        <h3 className="h3-of-dev">OF DEV.</h3>
      </div>
      <Form className="form-login" onSubmit={handleSubmit}>
        <Form.Group className="form-inputs" controlId="formBasicEmail">
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
        <Form.Group className="form-inputs" controlId="formBasicPassword">
          <Form.Control
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Ingrese su contraseña"
            required
            className="input"
          />
        </Form.Group>
        <button className="btn-login" type="submit">
          LOGIN
          <Link to="/" />
        </button>
      </Form>
    </div>
  );
}

export default Login;
