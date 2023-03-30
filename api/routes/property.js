const express = require("express");
const { Property } = require("../models");
const propertyRouter = express.Router();

propertyRouter.post("/", (req, res) => {
  Property.bulkCreate(req.body)
    .then((property) => {
      res.status(201).send(property);
    })
    .catch((err) => console.log(err));
});
propertyRouter.get("/", (req, res) => {
  Property.findAll().then((property) => res.json(property));
});

//traer una sola propiedad
propertyRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  Property.findOne({ where: { id } }).then((property) => {
    console.log("entre a la ruta");
    res.send(property);
  });
});

propertyRouter.get("/condition/:condition", (req, res) => {
  Property.findAll({
    where: {
      condition: { [Op.iLike]: `%${req.params.condition}%` },
    },
  }).then((property) => res.json(property));
});

module.exports = propertyRouter;
