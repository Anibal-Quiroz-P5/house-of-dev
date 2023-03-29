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
module.exports = propertyRouter;
