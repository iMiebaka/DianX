const express = require("express");
const router = express.Router();
const fs = require("fs");
const network = require("network");
const { DeviceID, Device, Files } = require("../../../models");
const { sequelize } = require("../../../models/config");

const apiEndPointPrefix = "/";

router.get(apiEndPointPrefix + "device-details", async (req, res, next) => {
  const device = await DeviceID.findOne();
  const data = {
    deviceType: "hostDevice",
    deviceId: device.publicId,
    deviceName: device.deviceName,
  };
  res.json(data);
});

router.get(apiEndPointPrefix + "get-conversation", async (req, res, next) => {
  const deviceId = req.query.deviceid;
  // const socket = req.app.get("socket");
  // socket.to("3c933885-2155-4c30-be73-ccb09974c53f").emit("receive_message", {});
  const files = await Files.findAll({ where: { communicationId: deviceId } });
  // const data = {
  //   fileType: files.fileType,
  //   fileName: files.fileName,
  //   publicId: files.publicId,
  //   sender: files.sender,
  //   communicationId: files.communicationId,
  //   createdAt: files.createdAt,
  // };
  res.json(files);
});

router.post(apiEndPointPrefix + "send/text", (req, res, next) => {
  res.status(201).json({ message: "Text recieved" });
});

router.post(apiEndPointPrefix + "send/file", (req, res, next) => {
  const fileName = req.headers["file-name"];
  req.on("data", (chunk) => {
    fs.appendFileSync("./media/" + fileName, chunk);
  });
  res.json({ message: "Item recieved" });
});

router.get(apiEndPointPrefix + "find-hosts", async (req, res, next) => {
  const device = await Device.findAll();
  res.json({
    device,
  });
});

router.post(apiEndPointPrefix + "find-host", async (req, res, next) => {
  const socket = req.app.get("socket");
  socket.emit("make_handshake", { data: req.body.url });
  const device = await DeviceID.findOne();
  res.json({
    status: "success",
    publicId: device.publicId,
    deviceName: device.deviceName,
  });
});

router.get(apiEndPointPrefix + "connect-client", (req, res, next) => {
  var address = [];
  network.get_interfaces_list((err, ip) => {
    if (!err) {
      ip.forEach((element) => {
        {
          element.ip_address != undefined &&
            address.push(element.ip_address + ":" + req.app.get("LISTENING"));
        }
      });
      res.json({ data: address });
    } else {
      res.statusCode(500).json({ message: err });
    }
  });
});

router.get(apiEndPointPrefix + "test-db", async (req, res, next) => {
  console.log();
  try {
    await sequelize.authenticate();
    res.json({ message: "Connection has been established successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Unable to connect to the database:", error });
  }
});

router.get(apiEndPointPrefix + "test-socket", async (req, res, next) => {
  try {
    const socket = req.app.get("socket");
    socket.broadcast.emit("send_message", { data: "334acd28-7496-451a-9896-5dbb10310701" });
    await sequelize.authenticate();
    res.json({ message: "Socket tested" });
  } catch (error) {
    res.status(500).json({ message: "Unable to init socket:", error });
  }
});

module.exports = router;
