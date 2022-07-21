const { v4 } = require("uuid");
const { sequelize } = require("./config");
const fs = require("fs");
const Files = require("./Files");
const Device = require("./Device");
const DeviceID = require("./DeviceID");

// const Device = sequelize.define("device", {
//   deviceName: DataTypes.STRING,
//   publicId: DataTypes.STRING,
//   deviceType: DataTypes.STRING,
// });

// const DeviceID = sequelize.define("deviceID", {
//   publicId: DataTypes.STRING,
//   deviceName: {
//     type: DataTypes.STRING,
//     defaultValue: "Dian-Exchange-PC",
//   },
// });
// const File = sequelize.define("file", {
//   fileType: DataTypes.STRING,
//   fileName: DataTypes.STRING,
//   publicId: DataTypes.STRING,
//   size: DataTypes.INTEGER,
// });

// Relationships
Device.hasMany(Files, { as: "files" });
Files.belongsTo(Device);

sequelize.sync();

const setUp = async () => {
  const count = await DeviceID.count();
  if (count == 0) {
    const data = {
      publicId: v4(),
      deviceName: "Dian-Exchange-PC",
    };
    DeviceID.create(data);
    fs.writeFileSync("./deviceId", JSON.stringify(data), "utf8");
    console.log("Public Id created Successful");
  }
};

setUp();
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

module.exports = { Files, Device, DeviceID };
