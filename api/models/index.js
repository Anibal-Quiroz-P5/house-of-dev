const User = require("./User");
const Property = require("./Property");
const Category = require("./Category");
const Favourites = require("./Favourites");
const Appointment = require("./Appointment");

//aca poner las relaciones
//relaciones de favoritos
User.belongsToMany(Property, { through: Favourites });
Property.belongsToMany(User, { through: Favourites });
//relaciones de citas
User.belongsToMany(Property, { through: Appointment });
Property.belongsToMany(User, { through: Appointment });


module.exports = { User, Property, Category, Favourites, Appointment };
