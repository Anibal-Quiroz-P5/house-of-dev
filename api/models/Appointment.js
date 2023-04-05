const S = require("sequelize");
const db = require("../db/");

class Appointment extends S.Model {}

Appointment.init(
  {
    id: {
      type: S.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: S.INTEGER,
      allowNull: false,
    },
    propertyId: {
      type: S.INTEGER,
      allowNull: false,
    },
    date: {
      type: S.DATEONLY,
      allowNull: false,
    },
    time: {
      type: S.TIME,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "appointment" }
);

module.exports = Appointment;
