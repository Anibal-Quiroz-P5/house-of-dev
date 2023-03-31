const express = require("express");
const favouritesRouter = express.Router();
const { User, Favourites, Property } = require("../models");
//obtener todos los favoritos
favouritesRouter.get("/favourites", (req, res) => {
  Favourites.findAll({ include: [{ model: User, Property }] })
    .then((favourites) => {
      res.status(200).send(favourites);
    })
    .catch((err) => res.status(500).send(err));
});

//con tabla intermedia
/* router.post("/:userId/add/:carId", (req, res) => {
  const { userId, carId } = req.params;

  User.findOne({ where: { id: userId } })
    .then((user) => {
      Car.findOne({ where: { id: carId } })
        .then((car) => {
          user
            .addCar(car)
            .then(() => {
              res.status(201).send("Auto agregado como favorito");
            })
            .catch((err) => res.send(err));
        })
        .catch((err) => res.send(err));
    })
    .catch((err) => res.status(404).send("Usuario no encontrado"));
}); */

//sin tabla intermedia
//que un usuario agregue un favorito
favouritesRouter.post("/:userId/add/:propertyId", (req, res) => {
  const { userId, propertyId } = req.params;
  User.findOne({ where: { id: userId } })
    .then((user) => {
      Property.findOne({ where: { id: parseInt(propertyId) } })
        .then((property) => {
          Favourites.create({ userId: user.id, propertyId: property.id })
            .then(() => {
              res.status(201).send("Propiedad agregada a favoritos");
            })
            .catch((err) => res.send(err));
        })
        .catch((err) => res.send(err));
    })
    .catch((err) => res.status(404).send("Usuario no encontrado"));
});

//con tabla intermedia
/* router.get("/:userId/favourites", (req, res) => {
  const userId = req.params.userId;

  User.findOne({ where: { id: userId }, include: Car })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => res.status(404).send("Usuario no encontrado"));
}); */

//sin tabla intermedia
//buscar los favoritos de un usuario
favouritesRouter.get("/:userId/favourites", (req, res) => {
  const { userId } = req.params;
  User.findOne({
    where: { id: userId },
    include: [
      {
        model: Property,
        through: { model: Favourites },
      },
    ],
  })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => res.status(404).send(err));
});

//ruta para eliminar de favoritos
favouritesRouter.delete("/:userId/delete/:propertyId", (req, res) => {
  const { userId, propertyId } = req.params;
  User.findOne({ where: { id: userId } })
    .then((user) => {
      Property.findOne({ where: { id: parseInt(propertyId) } })
        .then((property) => {
          Favourites.destroy({
            where: { userId: user.id, propertyId: property.id },
          })
            .then(() => {
              res.status(201).send("Propiedad eliminada de los favoritos");
            })
            .catch((err) => res.send(err));
        })
        .catch((err) => res.send(err));
    })
    .catch((err) => res.status(404).send("Usuario no encontrado"));
});
module.exports = favouritesRouter;
