const S = require("sequelize");
const bcrypt = require("bcrypt");
const db = require("../db/");

class User extends S.Model {
  hash(password, salt) {
    return bcrypt.hash(password, salt);
  }

  validatePassword(password) {
    return this.hash(password, this.salt).then(
      (newHash) => newHash === this.password
    );
  }
}

User.init(
  {
    /*     is_admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }, */
    first_name: {
      type: S.STRING,
      allowNull: false,
    },
    last_name: {
      type: S.STRING,
      allowNull: false,
    },
    email: {
      type: S.STRING,
      allowNull: false,
      /*       validate: {
        isEmail: true,
      },
      unique: true, */
    },
    password: {
      type: S.STRING,
      allowNull: false,
      validate: {
        len: [8, 32],
      },
    },
    salt: {
      type: S.STRING,
    },
  },
  { sequelize: db, modelName: "user" }
);

User.beforeCreate((user) => {
  const salt = bcrypt.genSaltSync(9);
  user.salt = salt;
  return user.hash(user.password, user.salt).then((hash) => {
    user.password = hash;
  });
});

module.exports = User;
