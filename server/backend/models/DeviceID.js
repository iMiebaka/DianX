const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("./config");

class DeviceID extends Model {}

// Comment
DeviceID.init(
  {
    publicId: DataTypes.STRING,
    deviceName: {
      type: DataTypes.STRING,
      defaultValue: "Dian-Exchange-PC",
    },
  },
  {
    sequelize,
  }
);

// export
module.exports = DeviceID;
