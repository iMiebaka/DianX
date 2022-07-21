const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("./config");

class Device extends Model {}

// Comment
Device.init(
  {
    deviceName: DataTypes.STRING,
    publicId: DataTypes.STRING,
    deviceType: DataTypes.STRING,
  },
  {
    sequelize,
  }
);

// export
module.exports = Device;
