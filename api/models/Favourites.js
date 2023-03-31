const S = require("sequelize");
const db = require("../db/");

class Favourite extends S.Model {}

Favourite.init(
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
  },
  { sequelize: db, modelName: "favourites" }
);

module.exports = Favourite;
