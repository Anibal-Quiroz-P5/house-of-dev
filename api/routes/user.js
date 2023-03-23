const express = require("express");
const { generateToken } = require("../config/tokens");
const { validateAuth } = require("../middleware/auth");
const { User } = require("../models");
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  User.findAll().then((result) => res.send(result));
});

userRouter.post("/register", (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  User.create({ first_name, last_name, email, password })
    .then((user) => res.status(201).send(user))
    .catch((err) => res.status(500).send(err));
});

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

userRouter.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
});

userRouter.get("/secret", validateAuth, (req, res) => {
  res.send(req.user);
});

userRouter.get("/me", validateAuth, (req, res) => {
  res.send(req.user);
});

module.exports = userRouter;
