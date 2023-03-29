import React from "react";
import "./Alquiler.css";
import { Grid } from "../../commons/Grid/Grid";

export const Alquiler = () => {
  return (
    <>
      <div className="banner-inicio">
        <img
          src="https://images.pexels.com/photos/7512042/pexels-photo-7512042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          class="mx-auto d-block"
          alt="Responsive image"
          style={{ marginTop: "5%", marginBottom: "2%" }}
          height={"450px"}
          width={"80%"}
        ></img>
      </div>
      <hr className="hr-alquiler" />
      <Grid />
    </>
  );
};
