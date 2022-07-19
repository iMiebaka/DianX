const { sequelize, DataTypes } = require("./config");
const fs = require("fs");

const { v4 } = require("uuid");

const Device = sequelize.define("device", {
  deviceId: DataTypes.STRING,
  publicId: DataTypes.STRING,
  deviceType: DataTypes.STRING,
});

const DeviceID = sequelize.define("deviceID", {
  publicId: DataTypes.STRING,
});
const File = sequelize.define("file", {
  userId: DataTypes.INTEGER,
  fileType: DataTypes.STRING,
  fileName: DataTypes.STRING,
  publicId: DataTypes.STRING,
  size: DataTypes.INTEGER,
});

// Relationships
Device.hasMany(File, { as: "files" });
File.belongsTo(Device);

sequelize.sync({force: true});

const setUp = async () => {
  const count = await Device.count();
  console.log(count);
  if (count == 0) {
    const data = {
      id: v4(),
      deviceName: "Jalon"
    }
    fs.writeFileSync('./deviceId', JSON.stringify(data), "utf8")
    console.log("Public Id created");
    console.log("Successful");
  }
};

// setUp();

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

module.exports = { sequelize };
