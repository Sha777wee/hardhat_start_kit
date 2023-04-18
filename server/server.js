const express = require("express");
const db = require("./db/db");
const erc20Router = require("./routers/erc20Router.js");
const erc20Service = require("./service/erc20Service.js");

const app = express();

// 跨域配置
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// 使用路由
app.use(erc20Router);

// 连接数据库
db(() => {
  console.log("数据库连接成功");
  // 启动监听
  app.listen(8080, () => [console.log("服务已启动")]);
});

erc20Service();
