const express = require("express");
const adminRouter = express.Router();
const validateAuth = require("../middleware/auth");
const User = require("../models/User");

// Promover usuarios administradores
adminRouter.put("/:id", (req, res) => {
  // if (!req.user) {
  //   return res
  //     .status(401)
  //     .send("Debe iniciar sesión para realizar esta acción");
  // }

  // if (!req.user.isAdmin) {
  //   return res.status(403).send("No tienes permiso para realizar esta acción");
  // }

  User.update({ isAdmin: req.body.isAdmin }, { where: { id: req.params.id } })
    .then(() => res.send("El usuario se actualizo correctmente!"))
    .catch(() =>
      res.status(500).send("Hubo un error al actualizar el usuario")
    );
});

// Ver todos los usuarios
adminRouter.get("/", (req, res) => {
  // if (!req.user) {
  //   return res
  //     .status(401)
  //     .send("Debe iniciar sesión para realizar esta acción");
  // }
  User.findAll().then((usuarios) => res.send(usuarios));
});

// Eliminar usuarios
adminRouter.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  User.destroy({ where: { id } })
    .then((res) => res.status(204).send("Deleted"))
    .catch((error) => res.status(405).send(error));
  // if (!req.user.isAdmin) {
  //   return res.status(403).send("No tienes permiso para realizar esta acción");
  // // }
  // // User.findByPk(req.params.id).then((user) =>
  // //   user
  // //     ? user.destroy().then(() => res.sendStatus(204))
  // //     : res.status(404).send("El usuario no existe")
  // // );

});

module.exports = adminRouter;
