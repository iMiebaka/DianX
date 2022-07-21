const express = require("express");
const router = express.Router();
const fs = require("fs");
const { DeviceID, sequelize } = require("../../../models");
var network = require("network");

var address = [];
network.get_interfaces_list(function (err, ip) {
  if (!err) {
    ip.forEach((element) => {
      {
        element.ip_address != undefined &&
          address.push(element.ip_address + ":" + 3333);
      }
    });
  } else {
    console.log(err);
  }
});

const apiEndPointPrefix = "/";

router.get(apiEndPointPrefix + "hello", (req, res, next) => {
  res.json({ message: "This is the express server hello page" });
});

router.get(apiEndPointPrefix + "dian", (req, res, next) => {
  res.json({ message: "This is the express server dian page" });
});

router.post(apiEndPointPrefix + "send/text", (req, res, next) => {
  console.log(req.body);
  res.json({ message: "Text recieved" });
});

router.post(apiEndPointPrefix + "send/file", (req, res, next) => {
  const fileName = req.headers["file-name"];
  req.on("data", (chunk) => {
    fs.appendFileSync("./media/" + fileName, chunk);
  });
  res.json({ message: "Item recieved" });
  // res.end("uploaded!")
});

router.post(apiEndPointPrefix + "find-host", async (req, res, next) => {
  const url =  req.body.url
  const socket = req.app.get("socket");
  socket.emit("make_handshake", { data: url });
  const device = await DeviceID.findOne();
  res.json({
    status: "success",
    publicId: device.publicId,
    deviceName: device.deviceName,
  });
});

router.get(apiEndPointPrefix + "connect-client", (req, res, next) => {
  res.json({ data: address });
});

router.get(apiEndPointPrefix + "test-db", async (req, res, next) => {
  try {
    await sequelize.authenticate();
    res.json({ message: "Connection has been established successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Unable to connect to the database:", error });
  }
});

module.exports = router;
