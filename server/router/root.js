const express = require('express');
const router = express.Router();
const fs = require('fs');
const db = require('../database/index');
const backup = require("../database/backup")
const restore = require("../database/restore")

// 查询所有房间
router.post('/allrooms', (req, res) => {
  var body = req.body;
  db.query('select * from room', (err, result) => {
    if (err)
      return res.send({
        state: 1,
        message: '数据库查询失败',
        error: err,
      });
    console.log("所有房间数据获取成功");

    return res.send({
      state: 0,
      message: '请求成功',
      data: result,
    });
  });
});

// 添加房间
router.post('/addroom', (req, res) => {
  var body = req.body;
  db.query(
    'insert into room(rid,rtype,price,roomdesc,imgURL) values(?,?,?,?,?)',
    [body.rid, body.rtype, body.price, body.roomdesc, body.imgURL],
    (err, result) => {
      if (err) {
        return res.send({
          state: 1,
          message: '数据库请求失败',
          error: err,
        });
      }
      console.log("房间添加成功");

      return res.send({
        state: 0,
        message: '插入成功',
        data: result,
      });
    }
  );
});

// 修改房间单价
router.post('/updateroom', (req, res) => {
  var body = req.body;
  db.query('update room set price=? where rid=?', [body.price, body.rid], (err, result) => {
    if (err) {
      return res.send({
        state: 1,
        message: '数据库执行失败',
        error: err,
      });
    }
    console.log("房间价格修改成功");

    return res.send({
      state: 0,
      message: '修改成功',
      data: result,
    });
  });
});

// 修改房间状态
router.post('/updateroomstate', (req, res) => {
  var body = req.body;
  db.query('update room set rstate=? where rid=?', [body.rstate, body.rid], (err, result) => {
    if (err) {
      return res.send({
        state: 1,
        message: '数据库执行失败',
        error: err,
      });
    }
    console.log("房间状态修改成功");

    return res.send({
      state: 0,
      message: '修改成功',
      data: result,
    });
  });
});

// 删除房间
router.post('/deleteroom', (req, res) => {
  var body = req.body;
  db.query('delete from room where rid=?', [body.rid], (err, result) => {
    if (err) {
      return res.send({
        state: 1,
        message: '数据库执行失败',
        error: err,
      });
    }
    console.log("房间删除成功");

    return res.send({
      state: 0,
      message: '修改成功',
      data: result,
    });
  });
});

// 退出登录 清除信息
router.post('/deleteroot', (req, res) => {
  var body = req.body;
  fs.writeFile('./data/root.json', '', 'utf8', (err) => {
    if (err) {
      return res.send({
        state: 1,
        message: "数据写入失败",
        error: err
      })
    } else {
      console.log("退出登录成功");

      return res.send({
        state: 0,
        message: '写入成功'
      });
    }
  });
});

// 管理员信息
router.post('/root', (req, res) => {
  var body = req.body;
  fs.readFile('./data/root.json', (err, data) => {
    if (err) {
      return res.send({
        state: 1,
        message: '文件读取失败',
        error: err,
      });
    }
    if (data.toString() !== '') {
      user = JSON.parse(data.toString());
      console.log("获取管理员信息成功");

      return res.send({
        state: 0,
        message: '请求成功',
        data: user,
      });
    }
    return res.send({
      state: 1,
      message: '请求失败',
    });
  });
});

// 获取订单信息
router.post('/allorders', (req, res) => {
  var body = req.body;
  db.query('select * from roomorder', (err, result) => {
    if (err)
      return res.send({
        state: 1,
        message: '数据库查询失败',
        error: err,
      });
    console.log("获取订单信息成功");

    return res.send({
      state: 0,
      message: '请求成功',
      data: result,
    });
  });
});

// 办理入住
router.post('/checkin', (req, res) => {
  var body = req.body;
  db.query('update roomorder set orderstate=1 where orderid=?', body.orderid, (err, result) => {
    if (err) {
      return res.send({
        state: 1,
        message: '数据库错误',
        error: err,
      });
    }
    console.log("入住办理成功");

    return res.send({
      state: 0,
      message: '修改成功',
      data: result,
    });
  });
});

// 退房
router.post('/checkoutorder', (req, res) => {
  var body = req.body;
  db.query('update roomorder set orderstate=2 where orderid=?', body.orderid, (err, result) => {
    if (err) {
      return res.send({
        state: 1,
        message: '数据库请求错误',
        error: err,
      });
    }
    db.query('update room set rstate=0 where rid=?', body.rid, (err, result1) => {
      if (err) {
        return res.send({
          state: 1,
          message: '数据库请求错误',
          error: err,
        });
      }
      console.log("退房成功");

      return res.send({
        state: 0,
        message: '更新成功',
        data: result,
      });
    });
  });
});

// 删除订单
router.post('/confdelete', (req, res) => {
  var body = req.body;
  db.query('delete from roomorder where orderid=?', body.orderid, (err, result) => {
    if (err) {
      return res.send({
        state: 1,
        message: '数据库请求错误',
        error: err,
      });
    }
    console.log("删除订单成功");

    return res.send({
      state: 0,
      message: '更新成功',
      data: result,
    });
  });
});

// 获取用户信息
router.post("/getusers", (req, res) => {
  var body = req.body;
  db.query("select * from custom", (err, result) => {
    if (err) {
      return res.send({
        state: 1,
        message: "数据库请求失败",
        error: err
      })
    }
    console.log("用户信息获取成功");

    return res.send({
      state: 0,
      message: "获取成功",
      data: result
    })
  })
})

// 冻结用户
router.post("/freeze", (req, res) => {
  var body = req.body;
  db.query("update custom set authentication=2 where cid=?", body.cid, (err, result) => {
    if (err) {
      return res.send({
        state: 1,
        message: "数据库请求失败！",
        error: err
      })
    }
    console.log("用户冻结成功");

    return res.send({
      state: 0,
      message: "更新成功",
      data: result
    })
  })
})

// 解冻用户
router.post("/nofreeze", (req, res) => {
  var body = req.body;
  db.query("update custom set authentication=0 where cid=?", body.cid, (err, result) => {
    if (err) {
      return res.send({
        state: 1,
        message: "数据库请求失败！",
        error: err
      })
    }
    console.log("用户解冻成功");

    return res.send({
      state: 0,
      message: "更新成功",
      data: result
    })
  })
})

// 删除用户
router.post("/deletecustom", (req, res) => {
  var body = req.body;
  db.query("delete from custom where cid=?", body.cid, (err, result) => {
    if (err) {
      return res.send({
        state: 1,
        message: "数据库请求失败！",
        error: err
      })
    }
    console.log("删除用户成功");

    return res.send({
      state: 0,
      message: "删除成功",
      data: result
    })
  })
})

// 备份数据库
router.post("/backup", (req, res) => {
  backup()
  console.log("备份成功");

  return res.send({
    state: 0,
    message: "备份成功",
  })
})

// 恢复数据库
router.post("/restore", (req, res) => {
  restore()
  console.log("恢复成功");

  return res.send({
    state: 0,
    message: "恢复成功",
  })
})
module.exports = router;