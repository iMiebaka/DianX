const express = require("express");
const router = express.Router();
const fs = require("fs");
const sequelize = require("../../models");


const apiEndPointPrefix = "/";


router.get(apiEndPointPrefix + "hello", (req, res, next) => {
  res.json({ message: "This is the express server hello page" });
});

router.get(apiEndPointPrefix + "dian", (req, res, next) => {
  res.json({ message: "This is the express server dian page" });
});

router.post(apiEndPointPrefix + "send/text", (req, res, next) => {
  res.json({ message: "Text recieved" });
});

router.post(apiEndPointPrefix + "send/file", (req, res, next) => {
  const fileName = req.headers["file-name"];
  req.on("data", chunk => {
      fs.appendFileSync(fileName, chunk)
  })
  res.json({ message: "Item recieved" });
  res.end("uploaded!")
});

router.get(apiEndPointPrefix + "test-db", async (req, res, next) => {
  try {
    await sequelize.authenticate();
    res.json({'message': 'Connection has been established successfully.'});
  } catch (error) {
    res.status(500)
    res.json({'message': 'Unable to connect to the database:', error});
  }
})

module.exports = router;
