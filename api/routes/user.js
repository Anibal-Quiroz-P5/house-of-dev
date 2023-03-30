const express = require("express");
const { generateToken } = require("../config/tokens");
const { validateAuth } = require("../middleware/auth");
const { User } = require("../models");
const userRouter = express.Router();
//ruta para obetener todos los usuarios
userRouter.get("/", (req, res) => {
  User.findAll().then((result) => res.send(result));
});

//ruta para buscar un usuario
userRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  User.findOne({ where: { id } }).then((user) => {
    res.send(user);
  });
});
//ruta para crear un nuevo usuario

userRouter.post("/register", (req, res) => {
  const { first_name, last_name, email, password, phone } = req.body;
  User.create({ first_name, last_name, email, password, phone })
    .then((user) => res.status(201).send(user))
    .catch((err) => res.status(500).send(err));
});
//ruta para iniciar sesión
userRouter.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ where: { email } })
    .then((user) => {
      if (!user) return res.sendStatus(401);
      user.validatePassword(password).then((isValid) => {
        if (!isValid) return res.sendStatus(401);
        const payload = {
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
        };
        const token = generateToken(payload);
        res.cookie("token", token).send(user);
        console.log("te logueaste", user);
      });
    })
    .catch(() => console.log("email no valido"));
});
//ruta para cerrar sesión
userRouter.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
});

//ruta para editar un usuario
userRouter.patch("/update/:id", (req, res) => {
  //campos que se pueden llegar a actualizar
  const { id } = req.params;
  const inputs = ["first_name", "last_name", "password", "phone"];
  const inputsUpdate = {};
  //atrapar datos que se pueden actualizar
  inputs.forEach((campo) => {
    if (req.body[campo]) {
      inputsUpdate[campo] = req.body[campo];
    }
  });
  //hacer el cambio
  User.findOne({ where: { id }, returning: true, individualHooks: true }).then(
    (user) => {
      user
        .update(inputsUpdate)
        .then(() => {
          res.status(200).send("Cambios actualizados");
        })
        .catch((err) => err);
    }
  );
});

//rutas para validaciones
userRouter.get("/secret", validateAuth, (req, res) => {
  res.send(req.user);
});
//rutas para validaciones
userRouter.get("/me", validateAuth, (req, res) => {
  res.send(req.user);
});

module.exports = userRouter;
