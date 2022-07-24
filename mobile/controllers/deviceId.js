const initDeviceId = `INSERT INTO deviceIDs (publicId, deviceName) values (?,?)`;

const getDeviceId = `SELECT * deviceIDs`;

export { initDeviceId, getDeviceId};
