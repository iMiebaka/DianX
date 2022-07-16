const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

const Device = sequelize.define("device", {
  deviceId: DataTypes.STRING,
  publicId: DataTypes.STRING,
  deviceType: DataTypes.STRING,
});

const Files = sequelize.define("files", {
  userId: DataTypes.INTEGER,
  fileType: DataTypes.STRING,
  fileName: DataTypes.STRING,
});

Files.belongsTo(Device);
sequelize.sync({ force: true });


Device.create({
  deviceId: "test",
  publicId: "test",
  deviceType: "test",
}).then((myDevice) => {
  console.log(myDevice.device);
});

Files.create({
  userId: 2,
  fileType: "test type",
  fileName: "test file",
});

module.exports = sequelize;
