const { Sequelize, DataTypes} = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});


// module.exports =  sequelize;

module.exports = { sequelize, DataTypes };
