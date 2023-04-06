const express = require("express");
const appointmentRouter = express.Router();
const { User, Appointment, Property } = require("../models");

// obtener todas las citas

appointmentRouter.get("/appointments", (req, res) => {
  Appointment.findAll({
    attributes: ["id", "date", "time"],
  })
    .then((appointment) => {
      res.status(200).send(appointment);
    })
    .catch((err) => res.status(500).send(err));
});

//que un usuario agregue una cita
appointmentRouter.post("/:userId/add/:propertyId", (req, res) => {
  const { userId, propertyId } = req.params;
  const { date, time } = req.body;
  User.findOne({ where: { id: userId } })
    .then((user) => {
      Property.findOne({ where: { id: parseInt(propertyId) } })
        .then((property) => {
          Appointment.create({
            userId: user.id,
            propertyId: property.id,
            date: date,
            time: time,
          })
            .then(() => {
              res.status(201).send("Cita agendada");
            })
            .catch((err) => res.send("ya tenes una cita", err));
        })
        .catch((err) => res.send(err));
    })
    .catch((err) => res.status(404).send("Usuario no encontrado"));
});
//buscar las citas de un usuario
appointmentRouter.get("/:userId/appointments", (req, res) => {
  const { userId } = req.params;
  User.findOne({
    where: { id: userId },
    include: [
      {
        model: Property,
        through: { model: Appointment, attributes: ["id", "date", "time"] },
      },
    ],
  })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => res.status(404).send(err));
});
//ruta para cancelar una cita
appointmentRouter.delete("/:userId/delete/:propertyId", (req, res) => {
  const { userId, propertyId } = req.params;
  User.findOne({ where: { id: userId } })
    .then((user) => {
      Property.findOne({ where: { id: parseInt(propertyId) } })
        .then((property) => {
          Appointment.findOne({
            where: { userId: user.id, propertyId: property.id },
          })
            .then((appointment) => {
              Appointment.destroy({
                where: { userId: user.id, propertyId: property.id },
              })
                .then(() => {
                  res
                    .status(201)
                    .send(
                      `Cita cancelada para el día ${appointment.date} a las ${appointment.time}`
                    );
                })
                .catch((err) => res.send(err));
            })
            .catch((err) => res.send(err));
        })
        .catch((err) => res.send(err));
    })
    .catch((err) => res.status(404).send("Usuario no encontrado"));
});

//ruta para editar una cita ya creada
appointmentRouter.patch("/:userId/:appointmentId", (req, res) => {
  const { userId, appointmentId } = req.params;
  const { date, time } = req.body;
  Appointment.findOne({ where: { id: appointmentId, userId: userId } })
    .then((appointment) => {
      if (!appointment) {
        return res.status(404).send("Cita no encontrada");
      }
      appointment.date = date;
      appointment.time = time;
      appointment
        .save()
        .then(() => {
          res.status(200).send("Cita actualizada");
        })
        .catch((err) => res.send(err));
    })
    .catch((err) => res.status(404).send("Usuario no encontrado"));
});

module.exports = appointmentRouter;
