const express = require("express");
const categoryRouter = express.Router();
const { Category } = require("../models");

// Crear categorias
categoryRouter.post("/", (req, res) => {
  const { name, description } = req.body;

  Category.create({ name, description })
    .then((category) => res.send(category))
    .catch(() => res.send("error al crear la categoria"));
});

// Obtener todas las categorias
categoryRouter.get("/todo", (req, res) => {
  Category.findAll().then((categories) => res.send(categories));
});

// Editar categorias
categoryRouter.put("/:id", (req, res) => {
  const { name, description } = req.body;

  Category.findByPk(req.params.id)
    .then((category) => category.update({ name, description }))
    .then((changes) => res.status(200).send(changes));
});

// Eliminar una categoria
categoryRouter.delete("/:id", (req, res) => {
  Category.findByPk(req.params.id)
    .then((category) => category.destroy())
    .then(() => res.send("categoria eliminada con exito"));
});

module.exports = categoryRouter;
