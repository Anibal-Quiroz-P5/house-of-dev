import React, { useEffect, useState } from "react";
import "./UserView.css";
import axios from "axios";

export const UserView = () => {
  // lo sig me trae el usuario loggeado del local storage

  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [user, setUser] = useState([]);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  /* const [isEditing, setIsEditing] = useState(false); */

  const [miVariable, setMiVariable] = useState(1); // Valor inicial de miVariable = 1  "NO" ME DEJA EDITAR

  function handleChange() {
    if (miVariable === 1) {
      setMiVariable(0); // Si el valor actual es 1, cambia a 0 (se presionó el botón "EDITAR")
    } else {
      setMiVariable(1); // Si el valor actual es 0, cambia a 1 (se presionó el botón "SEND EDITED")
    }
  }

  useEffect(() => {
    const userLogueado = JSON.parse(localStorage.getItem("user")) || {};
    setUser(userLogueado);
  }, []); // si entre corchetes pongo user se didpara error continuo

  const handleSubmitt = (event) => {
    console.log(" ENTRÉ A  HANLE SUBMITTTTTTTT");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .patch(`api/user/update/${user.id}`, {
        first_name: FirstName,
        last_name: LastName,
        phone: phone,
        password: password,
      })
      .then((res) => {
        /* dispatch(setUser(res.data)); */
        localStorage.setItem("user", JSON.stringify(res.data));
        /* setIsEditing(false); */
        setMiVariable(1);

        alert("Se realizaron los cambios satisfactoriamente");
      })
      .catch(() => {
        alert("Hubo un error al actualizar los datos");
      });
  };

  return (
    <div>
      {/*  <div className="container-mayor"> */}
      <div className="container rectangle_108">
        <form /* method="post"  */ onSubmit={handleSubmitt}>
          {" "}
          {/* FORMULARIO */}
          <div className="rectangle_23">
            <h5> MI PERFIL</h5>
          </div>
          <div className="row">
            <div className="col-md-2">
              <input
                onClick={handleChange}
                /* type="submit" */
                className="profile-edit-btn"
                name="btnAddMore"
                value="EDITAR"
                /* checked={value === "EDITAR" ? true : false} */
              />
            </div>

            <div></div>
            <div className="col-md-12">
              <div className="profile-img">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="row">{/* <div className="col-md-3"> */}</div>
          <div className="col-md-12">
            <div className="col-md-8">
              <div className="tab-content profile-tab" id="myTabContent">
                {/* <div> */}

                <div className="row">
                  <div className="col-md-6">
                    <label className="tipografia">Nombre</label>

                    {miVariable === 1 ? (
                      <div className="col-md-6">
                        <input
                          className="sinBorde"
                          value={user.first_name}
                          /* value = {FirstName} */ onChange={(event) =>
                            setFirstName(event.target.value)
                          }
                          readonly
                        />
                        <hr className="hr" />
                      </div>
                    ) : (
                      <div className="col-md-6">
                        <input
                          className="sinBorde"
                          /* value= {user.first_name} */ value={FirstName}
                          onChange={(event) =>
                            setFirstName(event.target.value)
                          } /* readonly  */
                        />
                        <hr className="hr" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <label className="tipografia">Apellido</label>

                    {miVariable === 1 ? (
                      <div className="col-md-6">
                        <div className="col-md-2">
                          <input
                            className="sinBorde"
                            value={user.last_name}
                            onChange={(event) =>
                              setLastName(event.target.value)
                            }
                            readonly
                          />
                        </div>
                        <hr className="hr" />
                      </div>
                    ) : (
                      <div className="col-md-6">
                        <div className="col-md-2">
                          <input
                            className="sinBorde"
                            value={LastName}
                            onChange={(event) =>
                              setLastName(event.target.value)
                            } /* readonly  */
                          />
                        </div>
                        <hr className="hr" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <label class="tipografia">Email</label>
                    <div className="col-md-6">
                      {/* <p className="tipografia_2">Emigomez@gmail.com</p> */}
                      <input className="sinBorde" value={user.email} />
                      <hr className="hr" />
                    </div>
                  </div>
                </div>
                {/*                  <div className="row">
                   <div className="col-md-6">
                     <label class="tipografia">Telefono</label>
                     <div className="col-md-6">
                        <p className="tipografia_2">+54 9 11 2007-0000</p>
                        <input  className="sinBorde" 
                        value= {user.phone}/>
                        <hr className="hr" />
                     </div>
                   </div>
                </div>  */}

                <div className="row">
                  <div className="col-md-6">
                    <label class="tipografia">Telefono</label>

                    {miVariable === 1 ? (
                      <div className="col-md-6">
                        <div className="col-md-2">
                          <input
                            className="sinBorde"
                            value={user.phone}
                            onChange={(event) => setPhone(event.target.value)}
                            readonly
                          />
                        </div>
                        <hr className="hr" />
                      </div>
                    ) : (
                      <div className="col-md-6">
                        <div className="col-md-2">
                          <input
                            className="sinBorde"
                            value={phone}
                            onChange={(event) =>
                              setPhone(event.target.value)
                            } /* readonly  */
                          />
                        </div>
                        <hr className="hr" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="row">
                  {/*                   <div className="col-md-6">
                    <label class="tipografia">Contraseña</label>

                   {miVariable === 1 ? (
                      <div className="col-md-6">
                        <div className="col-md-2">
                          <input
                            className="sinBorde"
                            value={user.password}
                            onChange={(event) => setPassword(event.target.value)}
                            readonly
                          />
                        </div>
                        <hr className="hr" />
                      </div>
                    ) : (
                      <div className="col-md-6">
                        <div className="col-md-2">
                          <input
                            className="sinBorde"
                            value={password}
                            onChange={(event) =>
                              setPassword(event.target.value)
                            } 
                          />
                        </div>
                        <hr className="hr" />
                      </div>
                    )}
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </form>
        <div>
          {/* <button type="submit" onClick={handleSubmit}>
            {" "}
            SEND EDITED
          </button> */}
        </div>
      </div>
      {/*  </div> */}
    </div>
  );
};
