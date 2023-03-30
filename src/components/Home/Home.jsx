import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export const Home = () => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="back-img">
      <div className="form-inicio">
        <div className="container-home">
          <div className="row fila-home">
            <div className="col-12 columna-home"> ¿QUÉ ESTAS BUSCANDO?</div>

            <div className="col-12 columna-home">
              {" "}
              <div class="form-check">
                <input
                  onChange={handleChange}
                  class="form-check-input"
                  type="radio"
                  name="exampleRadios"
                  id="exampleRadios1"
                  value="comprar"
                  checked={value == "comprar" ? true : false}
                ></input>
                <label class="form-check-label" for="exampleRadios1">
                  Comprar
                </label>
              </div>
              <div className="hr-home"> </div>
              <div class="form-check">
                <input
                  onChange={handleChange}
                  class="form-check-input"
                  type="radio"
                  name="exampleRadios"
                  id="exampleRadios2"
                  value="alquilar"
                  checked={value == "alquilar" ? true : false}
                ></input>
                <label class="form-check-label" for="exampleRadios2">
                  Alquilar
                </label>
              </div>
            </div>
          </div>
          {/* <input
            type="text"
            placeholder="UBICACIÓN"
            className="input-ubicacion"
          /> */}
          <div>
            {value == "comprar" ? (
              <Link to="/venta">
                <button className="btn-ver">VER PROPIEDADES</button>
              </Link>
            ) : (
              <Link to="/alquiler">
                <button className="btn-ver">VER PROPIEDADES</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
