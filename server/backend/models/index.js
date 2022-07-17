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
});

// Relationships
Device.hasMany(File, { as: "files" });
File.belongsTo(Device);

sequelize.sync();

// Setup Device key
Device.count().then((count) => {
  if (count == 0) {
    console.log(count);
    const devID = {
      id: v4(),
    };
    fs.writeFile("./deviceId", JSON.stringify(devID), () =>
      console.log("File Saved")
    );
  }
});



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
