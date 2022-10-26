const e = require('express');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const db = require('../database/index');
const moment = require('moment');
// 连接数据库 获取房间数据
router.post('/roomdetails', (req, res) => {
  var body = req.body;
  db.query('select * from room where rstate=0', (err, result) => {
    if (err) {
      return res.send({
        state: 1,
        message: "数据库请求失败",
        error: err
      })
    } else {
      console.log("房间数据获取成功");
      return res.send({
        state: 0,
        message: '请求成功',
        data: result,
      });
    }
  });
});

// 新增订单信息
router.post('/insertorder', (req, res) => {
  var body = req.body;
  fs.readFile('./data/user.json', (err, data) => {
    if (err) {
      return res.send({
        state: 1,
        message: '文件读取失败',
        error: err
      });
    } else {
      user = JSON.parse(data.toString());
      var time = moment(Date.now());
      var day = time.format('DD') * 1 + 1;
      var month = time.format('MM') * 1;
      var year = time.format('YYYY') * 1;
      var starttime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
      inittime(year, month, day);
      // 2022-05-01
      // 2022-12-12
      if (day < 10) {
        day = '0' + day;
      }
      if (month < 10) {
        month = '0' + month;
      }
      var endtime = `${year}-${month}-${day} 12:00:00`;
      var orderid = Math.floor(Math.random() * 100000000);
      db.query(
        'insert into roomorder(orderid,starttime,endtime,cid,rid) values(?,?,?,?,?)',
        [orderid, starttime, endtime, user.cid, body.rid],
        (err, result) => {
          if (err) {
            return res.send({
              state: 1,
              message: '数据库请求失败！',
              error: err
            });
          }

          db.query('update room set rstate=1 where rid=?', [body.rid], (err, result) => {
            if (err) {
              return res.send({
                state: 1,
                message: '数据库请求失败！',
                error: err
              });
            }
            console.log("订单新增成功");

            return res.send({
              state: 0,
              message: '添加成功！数据库已更新！',
              data: result,
            });
          });
        }
      );
    }
  });
});

// 查看订单信息
router.post('/selectorder', (req, res) => {
  fs.readFile('./data/user.json', (err, data) => {
    if (err)
      return res.send({
        state: 1,
        messgae: '文件读取失败',
        error: err
      });
    if (data.toString() !== '') {
      user = JSON.parse(data);
      db.query('select * from roomorder where cid=?', user.cid, (err, result) => {
        if (err) {
          return res.send({
            state: 1,
            message: '请求失败',
            error: err
          });
        }
        var data = [];
        for (let i = 0; i < result.length; i++) {
          db.query('select * from room where rid=?', result[i].rid, (err, result1) => {
            if (err) {
              return res.send({
                state: 1,
                message: '请求失败',
                error: err
              });
            }
            db.query('select * from custom where cid=?', user.cid, (err, result2) => {
              if (err) {
                return res.send({
                  state: 1,
                  message: '请求失败',
                  error: err
                });
              }
              var res1 = {
                imgURL: result1[0].imgURL,
                rid: result1[0].rid,
                cid: result2[0].cid,
                realname: result2[0].cname,
                phone: result2[0].cphone,
                price: result1[0].price,
                roomtype: result1[0].rtype,
                roomdesc: result1[0].roomdesc,
                ordernumber: result[i].orderid,
                starttime: result[i].starttime,
                endtime: result[i].endtime,
                state: result[i].orderstate,
              };
              data.push(res1);
              if (data.length == result.length) {
                console.log("订单读取成功");

                return res.send({
                  state: 0,
                  message: '请求成功',
                  data: data,
                });
              }
            });
          });
        }
      });
    } else {
      return res.send({
        state: 1,
        message: "读取失败"
      })
    }
  });
});

// 退房
router.post('/checkout', (req, res) => {
  var body = req.body;
  db.query('update roomorder set orderstate=2 where orderid=?', body.orderid, (err, result) => {
    if (err) {
      return res.send({
        state: 1,
        messgae: '请求失败',
        error: err
      });
    }
    db.query('select * from roomorder where orderid=?', body.orderid, (err, result1) => {
      if (err) {
        return res.send({
          state: 1,
          messgae: '请求失败',
          error: err
        });
      }
      db.query('select * from room where rid=?', result1[0].rid, (err, result2) => {
        if (err) {
          return res.send({
            state: 1,
            messgae: '请求失败',
            error: err
          });
        }
        db.query('update room set rstate=0 where rid=?', result1[0].rid, (err, result3) => {
          if (err) {
            return res.send({
              state: 1,
              messgae: '请求失败' + err,
              error: err
            });
          }
          console.log("退房成功");

          return res.send({
            state: 0,
            message: '修改成功',
            data: result3
          });
        });
      });
    });
  });
});

// 删除订单信息
router.post('/deleteorder', (req, res) => {
  var body = req.body;
  console.log(body);
  db.query('update roomorder set orderstate=3 where orderid=?', body.orderid, (err, result) => {
    if (err) {
      return res.send({
        state: 1,
        messgae: '请求失败',
        error: err
      });
    }
    console.log("订单删除成功");

    return res.send({
      state: 0,
      messgae: '请求成功',
      data: result,
    });
  });
});

// 用户信息
router.post('/mine', (req, res) => {
  var body = req.body;
  fs.readFile('./data/user.json', (err, data) => {
    if (err) {
      return res.send({
        state: 1,
        message: '文件读取失败',
        error: err
      });
    }
    console.log(data.toString());
    if (data.toString() !== '') {
      user = JSON.parse(data.toString());
      console.log("用户信息获取成功");

      return res.send({
        state: 0,
        message: '请求成功',
        data: user,
      });
    }
    return res.send({
      state: 1,
      message: '请求失败',
      error: err
    });
  });
});

// 格式化时间
function inittime(year, month, day) {
  if (
    month == 1 ||
    month == 3 ||
    month == 5 ||
    month == 7 ||
    month == 8 ||
    month == 10 ||
    month == 12
  ) {
    if (day > 31) day = 1;
  } else if (month == 2) {
    if (year % 4 == 0) {
      if (day > 28) day = 1;
    } else {
      if (day > 29) day = 1;
    }
  } else {
    if (day > 30) day = 1;
  }
}
module.exports = router;