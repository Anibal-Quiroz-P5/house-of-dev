const express = require("express");
const router = express.Router();
//const validateAuth = require("../middleware/auth");
const User = require("../models/User");

// Promover usuarios administradores
router.put("/:userId", (req, res) => {
  // if (!req.user) {
  //   return res
  //     .status(401)
  //     .send("Debe iniciar sesión para realizar esta acción");
  // }

  // if (!req.user.isAdmin) {
  //   return res.status(403).send("No tienes permiso para realizar esta acción");
  // }

  User.update(
    { isAdmin: req.body.isAdmin },
    { where: { id: req.params.userId } }
  )
    .then(() => res.send("El usuario se actualizo correctmente!"))
    .catch(() =>
      res.status(500).send("Hubo un error al actualizar el usuario")
    );
});

// Ver todos los usuarios
router.get("/", (req, res) => {
  // if (!req.user) {
  //   return res
  //     .status(401)
  //     .send("Debe iniciar sesión para realizar esta acción");
  // }
  User.findAll().then((usuarios) => res.send(usuarios));
});

// Eliminar usuarios
router.delete("/:id", (req, res) => {
  // if (!req.user.isAdmin) {
  //   return res.status(403).send("No tienes permiso para realizar esta acción");
  // }
  // User.findByPk(req.params.id).then((user) =>
  //   !user
  //     ? res.status(404).send("El usuario no existe")
  //     : user.destroy().then(() => res.sendStatus(204))
  // );
  const id = req.params.id;
  User.destroy({ where: { id } })
    .then((res) => res.status(204).send("Deleted"))
    .catch((error) => res.status(404).send(error));
});

module.exports = router;
