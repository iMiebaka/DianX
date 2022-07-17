const { sequelize, DataTypes } = require("./config");

const Device = sequelize.define("device", {
  deviceId: DataTypes.STRING,
  publicId: DataTypes.STRING,
  deviceType: DataTypes.STRING,
});

const File = sequelize.define("file", {
  userId: DataTypes.INTEGER,
  fileType: DataTypes.STRING,
  fileName: DataTypes.STRING,
});

// Relationships
Device.hasMany(File, { as: "files" });
File.belongsTo(Device);


sequelize.sync();

// Device.create({
//   deviceId: "test",
//   publicId: "test",
//   deviceType: "test",
// }).then((myDevice) => {
//   myDevice.createFile({
//     userId: 2,
//     fileType: "test type",
//     fileName: "test file",
//   });
// });

// File.create({
//   userId: 2,
//   fileType: "test type",
//   fileName: "test file",
// });

module.exports = sequelize;
