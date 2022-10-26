const mysql = require('mysql');
const db = mysql.createPool({
  host: 'youHost',
  user: 'Your username',
  password: 'Your password',
  database: 'Your database',
});
module.exports = db;
