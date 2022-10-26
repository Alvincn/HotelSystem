// 引入express 框架
const express = require('express');
// 实例化 app
var app = express();
// 支持跨域请求
const cors = require('cors');
// 管理用户的类
const router = require('./router/user');
// 管理房间、订单
const detail = require('./router/detail');
// 管理员
const root = require('./router/root');
// post 请求解析 POST
const bodyParser = require('body-parser');
// 使用中间件
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());
app.use('/api', router);
app.use('/room', detail);
app.use('/root', root);
app.listen(8081, () => {
  console.log('Server is running at http://127.0.0.1:8081');
});