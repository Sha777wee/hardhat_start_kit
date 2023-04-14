const express = require("express");
const homeRouter = require("./routers/homeRouter");

const app = express();
// 使用路由
app.use(homeRouter);

// 连接数据库
const db = require("./db/db");
const BookModel = require("./models/BookModel");
db(() => {
  console.log("数据库连接成功");
  // 启动监听
  app.listen(3000, () => [console.log("服务已启动")]);
});

// 插入数据库
// BookModel.create({
//   name: "shawee",
//   author: "shawee",
//   price: 20,
// });
