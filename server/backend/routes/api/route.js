const express = require("express");
const router = express.Router();
const fs = require("fs");
const sequelize = require("../../models");
const { execSync } = require("child_process");
require("dotenv").config({ path: "./.env" });

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
  const obj = fs.readFileSync("./deviceId", "utf-8");
  const id = JSON.parse(obj).id;
  if (id == req.body.id) {
    res.json({ status: "success", id });
  } else {
    res.status(404).json({ status: "error" });
  }
});

router.get(apiEndPointPrefix + "connect-client", async (req, res, next) => {
  const output = execSync("hostname -I", { encoding: "utf-8" });
  const obj = fs.readFileSync("./deviceId", "utf-8");
  res.json({ id: JSON.parse(obj).id, address: ["172.20.0.1"], port: 3333 });
});

router.get(apiEndPointPrefix + "test-db", async (req, res, next) => {
  try {
    await sequelize.authenticate();
    res.json({ message: "Connection has been established successfully." });
  } catch (error) {
    res.status(500).json({ message: "Unable to connect to the database:", error });
  }
});

module.exports = router;
