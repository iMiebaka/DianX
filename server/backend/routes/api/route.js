const express = require("express");
const router = express.Router();

const apiEndPointPrefix = "/";

router.get(apiEndPointPrefix + "hello", (req, res, next) => {
  res.json({ message: "This is the express server hello page" });
});

router.get(apiEndPointPrefix + "dian", (req, res, next) => {
  res.json({ message: "This is the express server dian page" });
});

module.exports = router;
