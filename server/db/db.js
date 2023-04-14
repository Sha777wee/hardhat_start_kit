module.exports = function (success, error) {
  if (!error) {
    error = () => {
      console.log("数据库连接失败");
    };
  }
  const mongoose = require("mongoose");
  const { DB_HOST, DB_PORT, DB_NAME } = require("../config/db.config");
  mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`);

  mongoose.connection.once("open", () => {
    success();
  });

  mongoose.connection.on("error", () => {
    error();
  });

  mongoose.connection.on("close", () => {});
};
