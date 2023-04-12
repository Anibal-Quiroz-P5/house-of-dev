const express = require("express");
const appointmentRouter = express.Router();
const moment = require("moment");
const { User, Appointment, Property } = require("../models");

const MIN_HOUR = 7;
const MAX_HOUR = 19;

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
  const MAX_DAYS_IN_FUTURE = 30;
  //ver que la fecha a agendar no sea a mas de 30 dias (se puede agendar en el mismo mes)
  if (
    !moment(date).isSameOrAfter(moment(), "day") ||
    moment(date).diff(moment(), "days") > MAX_DAYS_IN_FUTURE
  ) {
    return res
      .status(400)
      .send(
        `La fecha debe estar entre hoy y ${MAX_DAYS_IN_FUTURE} días en el futuro`
      );
  }
  //ver que sea solo de lunes a viernes
  if (moment(date).day() === 0 || moment(date).day() === 6) {
    return res
      .status(400)
      .send(`Solo se pueden agendar citas de lunes a viernes`);
  }
  const hour = moment(time, "HH:mm").hour();
  //ver que sea solo en los horarios permitidos
  if (hour < MIN_HOUR || hour > MAX_HOUR) {
    return res
      .status(400)
      .send(`La hora debe estar entre las ${MIN_HOUR}:00 y las ${MAX_HOUR}:00`);
  }
  Appointment.findOne({ where: { userId, propertyId, date, time } })
    .then((existingAppointment) => {
      if (existingAppointment) {
        return res.status(400).send("Ya tenias una cita agendada");
      } else {
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
      }
    })
    .catch((err) => res.send(err));
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
