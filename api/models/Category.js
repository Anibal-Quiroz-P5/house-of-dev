const S = require("sequelize");
const db = require("../db/");

class Category extends S.Model {}

Category.init(
  {
    name: { type: S.STRING },
    description: { type: S.TEXT },
  },
  { sequelize: db, modelName: "category", timestamps: false }
);

module.exports = Category;
