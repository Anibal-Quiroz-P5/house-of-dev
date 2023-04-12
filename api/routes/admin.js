const express = require("express");
const adminRouter = express.Router();
const User = require("../models/User");

// Promover usuarios administradores
adminRouter.put("/:id", (req, res) => {
  User.update({ isAdmin: req.body.isAdmin }, { where: { id: req.params.id } })
    .then(() => res.send("El usuario se actualizo correctmente!"))
    .catch(() =>
      res.status(500).send("Hubo un error al actualizar el usuario")
    );
});

// Ver todos los usuarios
adminRouter.get("/", (req, res) => {
  User.findAll().then((usuarios) => res.send(usuarios));
});

// Eliminar usuarios
adminRouter.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  User.destroy({ where: { id } })
    .then((res) => res.status(204).send("Deleted"))
    .catch((error) => res.status(405).send(error));
});

module.exports = adminRouter;
