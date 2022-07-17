const fs = require("fs");
const { Sequelize, DataTypes} = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

let deviceId;

try {
  const data = fs.readFileSync("./deviceId.json", "utf8");
  deviceId = JSON.parse(data).id;
} catch (err) {
  console.log(`Error reading file from disk: ${err}`);
}

// module.exports =  sequelize;

module.exports = { sequelize, DataTypes, deviceId };
