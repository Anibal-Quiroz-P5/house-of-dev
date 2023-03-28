const S = require("sequelize");
const db = require("../db/");

class Property extends S.Model {}

Property.init(
  {
    title: {
      type: S.STRING,

      allowNull: false,
    },
    address: {
      type: S.STRING,
      allowNull: false,
    },
    city: {
      type: S.STRING,
      allowNull: false,
    },
    state: {
      type: S.STRING,
      allowNull: false,
    },
    country: {
      type: S.STRING,
      allowNull: false,
    },
    description: {
      type: S.TEXT,
      allowNull: false,
    },
    price: {
      type: S.INTEGER,
      allowNull: false,
    },
    image: {
      type: S.ARRAY(S.STRING),
      allowNull: false,
    },
    rooms: {
      type: S.INTEGER,
      allowNull: false,
    },
    area: {
      type: S.INTEGER,
      allowNull: false,
    },
    bedroom: {
      type: S.INTEGER,
      allowNull: false,
    },
    bathroom: {
      type: S.INTEGER,
      allowNull: false,
    },
    condition: {
      type: S.STRING,
      allowNull: false,
    },
    ranking: {
      type: S.ARRAY(S.INTEGER),
      // allowNull: false,
    },
    type: {
      type: S.STRING,
      allowNull: false,
    },
    review: {
      type: S.ARRAY(S.STRING),
      // allowNull: false,
    },
  },
  { sequelize: db, modelName: "property" }
);
module.exports = Property;
