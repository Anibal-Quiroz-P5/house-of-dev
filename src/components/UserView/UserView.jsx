import React, { useEffect, useState } from "react";
import "./UserView.css";
import { Link } from "react-router-dom";

export const UserView = () => {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [user, setUser] = useState([]);
  const [phone, setPhone] = useState("");
  const [miVariable, setMiVariable] = useState(1);
  function handleChange() {
    if (miVariable === 1) {
      setMiVariable(0);
    } else {
      setMiVariable(1);
    }
  }
  useEffect(() => {
    const userLogueado = JSON.parse(localStorage.getItem("user")) || {};
    setUser(userLogueado);
  }, []);

  return (
    <div>
      <div className="container rectangle_108">
        <form>
          {" "}
          <div className="rectangle_23">
            <h5> MI PERFIL</h5>
          </div>
          <div className="row">
            <div className="col-md-2">
              <Link to={"/edituser"}>
                <input
                  onClick={handleChange}
                  className="profile-edit-btn"
                  name="btnAddMore"
                  value="EDITAR"
                />
              </Link>
            </div>
          </div>
          <div className="row"></div>
          <div className="col-md-12">
            <div className="col-md-8">
              <div className="tab-content profile-tab" id="myTabContent">
                <div className="row">
                  <div className="col-md-6">
                    <label className="tipografia">Nombre</label>

                    {miVariable === 1 ? (
                      <div className="col-md-6">
                        <input
                          className="sinBorde"
                          value={user.first_name}
                          readonly
                        />
                        <hr className="hr" />
                      </div>
                    ) : (
                      <div className="col-md-6">
                        <input className="sinBorde" value={FirstName} />
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
                            readonly
                          />
                        </div>
                        <hr className="hr" />
                      </div>
                    ) : (
                      <div className="col-md-6">
                        <div className="col-md-2">
                          <input className="sinBorde" value={LastName} />
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
                      <input className="sinBorde" value={user.email} />
                      <hr className="hr" />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <label class="tipografia">Telefono</label>

                    {miVariable === 1 ? (
                      <div className="col-md-6">
                        <div className="col-md-2">
                          <input
                            className="sinBorde"
                            value={user.phone}
                            readonly
                          />
                        </div>
                        <hr className="hr" />
                      </div>
                    ) : (
                      <div className="col-md-6">
                        <div className="col-md-2">
                          <input className="sinBorde" value={phone} />
                        </div>
                        <hr className="hr" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="row"></div>
              </div>
            </div>
          </div>
        </form>
        <div></div>
      </div>
    </div>
  );
};
