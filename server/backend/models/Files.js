const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("./config");

class Files extends Model {}

// Comment
Files.init(
  {
    fileType: DataTypes.STRING,
    fileName: DataTypes.STRING,
    publicId: DataTypes.STRING,
    size: DataTypes.INTEGER,
  },
  {
    sequelize,
  }
);

// export
module.exports = Files;
