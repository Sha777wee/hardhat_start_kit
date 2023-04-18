const express = require("express");
const ERC20Model = require("../models/ERC20Model.js");
const router = express.Router();

router.get("/erc20/log", async (req, res) => {
  let result;
  await ERC20Model.find({}).then((docs) => {
    result = docs;
  });
  res.send(result);
});

module.exports = router;
