const express = require("express");
const { User, Shirt_Model } = require("../models");
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  User.findAll().then((result) => res.send(result));
});

userRouter.post("/register", (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  User.create({ first_name, last_name, email, password })
    .then((user) => res.status(201).send(user))
    .catch((err) => console.log("error al registrar el usuario", err));
});

userRouter.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ where: { email } })
  .then((user) => {
    if (!user) return res.sendStatus(401);
    console.log("te logueaste", user)
    res.send(user)
  })
  .catch(error=> console.log("email no valido"))

});



module.exports = userRouter;