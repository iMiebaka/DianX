const { v4 } = require("uuid");
const Files = require("./Files");
const Device = require("./Device");
const DeviceID = require("./DeviceID");
const { sequelize } = require("./config");

// Relationships
Device.hasMany(Files, { as: "files" });
Files.belongsTo(Device);


const setUp = async () => {
  await sequelize.sync({ force: process.env.setup });
  const count = await DeviceID.count();
  if (count == 0) {
    const data = {
      publicId: v4(),
      deviceName: "Dian-Exchange-PC",
    };
    DeviceID.create(data);
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
