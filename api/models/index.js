const User = require("./User");
const Property = require("./Property");
const Category = require("./Category");
const Favourites = require("./Favourites");

//aca poner las relaciones
User.belongsToMany(Property, { through: Favourites });
Property.belongsToMany(User, { through: Favourites });

module.exports = { User, Property, Category, Favourites };
