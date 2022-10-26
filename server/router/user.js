const express = require('express');
const router = express.Router();
const fs = require('fs');
const db = require('../database/index');
// 用户登录
router.post('/login', (req, res) => {
  var body = req.body;
  db.query('select * from custom where username=?', body.username, (err, results) => {
    if (err) {
      return res.send({
        state: 1,
        message: '数据库请求失败',
        error: err,
      });
    }
    if (results.length === 0) {
      return res.send({
        // 0:success 1:password error 2:no this one
        state: 2,
        message: '查无此人！',
        data: results[0],
      });
    } else {
      if (results[0].password === body.password) {
        console.log('用户登录成功');
        return res.send({
          state: 0,
          message: '登录成功',
          data: results[0],
        });
      } else {
        return res.send({
          state: 1,
          message: '账号或密码错误',
          data: results[0],
        });
      }
    }
  });
});
// 注册用户
router.post('/register', (req, res) => {
  var body = req.body;
  db.query(
    'insert into custom(username,password) values(?,?)',
    [body.username, body.password],
    (err, result) => {
      if (err) {
        return res.send({
          state: 1,
          message: '请求失败',
          error: err,
        });
      }
      console.log('用户注册成功');

      return res.send({
        state: 0,
        message: '请求成功',
        data: result,
      });
    }
  );
});
// 管理员登录
router.post('/rootlogin', (req, res) => {
  var body = req.body;
  db.query('select * from root where rootname=?', body.rootname, (err, results) => {
    if (err) {
      return res.send({
        state: 1,
        message: '数据库连接错误！',
        error: err,
      });
    }
    if (results.length === 0) {
      return res.send({
        // 0:success 1:password error 2:no this one
        state: 2,
        message: '查无此人！',
        data: results[0],
      });
    } else {
      if (results[0].rootpassword === body.password) {
        console.log('管理员登录成功');

        return res.send({
          state: 0,
          message: '登录成功',
          data: results[0],
        });
      } else {
        return res.send({
          state: 1,
          message: '账号或密码错误',
          data: results[0],
        });
      }
    }
  });
});
// 将数据保存到user.json中
router.post('/saveuser', (req, res) => {
  var body = req.body;
  var data = JSON.stringify(body);
  console.log(body);
  fs.writeFile('./data/user.json', data, 'utf8', (err) => {
    if (err) {
      return res.send({
        state: 1,
        message: '文件写入失败',
        error: err,
      });
    } else {
      console.log('文件写入成功');

      return res.send({
        state: 0,
        message: '写入成功',
      });
    }
  });
});
// 管理员数据保存到root.json中
router.post('/saveroot', (req, res) => {
  var body = req.body;
  var data = JSON.stringify(body);
  fs.writeFile('./data/root.json', data, 'utf8', (err) => {
    if (err) {
      return res.send({
        state: 1,
        message: '文件写入失败',
        error: err,
      });
    } else {
      console.log('文件写入成功');

      return res.send({
        state: 0,
        message: '写入成功',
      });
    }
  });
});
// 将身份认证信息插入到数据库
router.post('/insertauth', (req, res) => {
  var body = req.body;
  db.query(
    'update custom set cname=?,ccardid=?,cphone=?,authentication=0 where cid=?',
    [body.cname, body.ccardid, body.cphone, body.cid],
    (err, result) => {
      if (err) {
        return res.send({
          state: 1,
          messgae: '数据库请求错误',
          error: err,
        });
      }
      db.query('select * from custom where cid=?', body.cid, (err, result1) => {
        if (err) {
          return res.send({
            state: 1,
            messgae: '数据库请求错误',
            error: err,
          });
        }
        var result1 = JSON.stringify(result1[0]);
        fs.writeFile('./data/user.json', result1, 'utf8', (err) => {
          if (err) {
            return res.send({
              state: 1,
              messgae: '文件写入失败',
              error: err,
            });
          } else {
            result1 = JSON.parse(result1);
            console.log('订单信息插入成功');

            return res.send({
              state: 0,
              message: '写入成功',
              result1,
            });
          }
        });
      });
    }
  );
});
// 清空 user.json
router.post('/deleteuser', (req, res) => {
  fs.writeFile('./data/user.json', '', 'utf8', (err) => {
    if (err) {
      return res.send({
        state: 1,
        message: '写入失败',
        error: err,
      });
    } else {
      console.log('清空用户数据完成');

      return res.send({
        state: 0,
        message: '写入成功',
      });
    }
  });
});
// 修改密码
router.post('/changepwd', (req, res) => {
  var body = req.body;
  db.query('update custom set password=? where cid=?', [body.newpwd, body.cid], (err, result) => {
    if (err) {
      return res.send({
        state: 1,
        message: '请求错误',
        error: err,
      });
    }
    console.log('密码修改成功');

    return res.send({
      state: 0,
      message: '修改成功',
      data: result,
    });
  });
});

// 导出路由
module.exports = router;
