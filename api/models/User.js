const { Model, DataTypes } = require("sequelize");

const db = require("../db/");

class User extends Model {

}

User.init(
  {
/*     is_admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }, */
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
/*       validate: {
        isEmail: true,
      },
      unique: true, */
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 32],
      },

    },
  },
  { sequelize: db, modelName: "user" }
);



module.exports = User;
