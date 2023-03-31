import React from "react";
import "./Venta.css";
import { Grid } from "../../commons/Grid/Grid";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MdFavoriteBorder } from "react-icons/md";
import { useEffect } from "react";
import { useState } from "react";

export const Venta = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const userLogueado = JSON.parse(localStorage.getItem("user")) || {};
    setUser(userLogueado);
  }, []);

  return (
    <>
      <div
        style={{
          width: "80%",
          margin: "0 auto",
        }}
      >
        <Row>
          <Col
            sm={12}
            style={{
              border: "2px solid #123acb",
              marginTop: "3%",
              padding: "10px",
              color: "#123acb",
              fontFamily: "Montserrat",
              fontWeight: "900",
            }}
          >
            PROPIEDADES EN VENTA
          </Col>
        </Row>
      </div>
      <div
        style={{
          width: "90%",
          display: "flex",
          justifyContent: "end",
        }}
      >
        {user.first_name ? (
          <Link to={"/favourites"}>
            <Button className="buttonFav">
              {" "}
              Favoritos
              <MdFavoriteBorder className="fav" />
            </Button>
          </Link>
        ) : null}
      </div>
      <div className="banner-inicio">
        <img
          src="https://images.pexels.com/photos/7512042/pexels-photo-7512042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          className="mx-auto d-block"
          alt="Responsive image"
          style={{ marginTop: "4%", marginBottom: "2%" }}
          height={"450px"}
          width={"80%"}
        ></img>
      </div>
      <hr className="hr-separador" />
      <Grid />
    </>
  );
};
