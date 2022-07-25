import db from "./config";

const getDeviceId = db.transaction((tx) => {
  tx.executeSql(SQL.get.DeviceID, [], (_, { rows }) => {
    return rows._array[0];
  });
});

const create = {
  Devices:
    "CREATE TABLE IF NOT EXISTS `devices` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `deviceName` VARCHAR(255), `publicId` VARCHAR(255), `deviceType` VARCHAR(255));",
  Files:
    "CREATE TABLE IF NOT EXISTS `files` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `fileType` VARCHAR(255), `fileName` VARCHAR(255), `publicId` VARCHAR(255), `size` INTEGER, `deviceId` INTEGER REFERENCES `devices` (`id`) ON DELETE SET NULL ON UPDATE CASCADE);",
  DeviceID:
    "CREATE TABLE IF NOT EXISTS `deviceIDs` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `publicId` VARCHAR(255), `deviceName` VARCHAR(255) DEFAULT 'Dian-Exchange-PC');",
};
const drop = {
  Devices: "DROP TABLE IF EXISTS `devices`;",
  Files: "DROP TABLE IF EXISTS `files`;",
  DeviceID: "DROP TABLE IF EXISTS `deviceIDs`;",
};

const get = {
  DeviceID: "SELECT * FROM deviceIDs;",
  Files: "SELECT * FROM fileTables;",
  Devices: "SELECT * FROM devices;",
};

const add = {
  initDeviceId: `INSERT INTO deviceIDs (publicId, deviceName) values (?,?)`,
};

const SQL = {
  create,
  drop,
  get,
  add,
};

const DEVICE_PRINT = "moblie_device";

export { DEVICE_PRINT, SQL, db };
