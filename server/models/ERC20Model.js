const mongoose = require("mongoose");

let ERC20Schema = new mongoose.Schema({
  operation: String,
  from: String,
  to: String,
  value: String,
});

let ERC20Model = mongoose.model("erc20", ERC20Schema);
module.exports = ERC20Model;
