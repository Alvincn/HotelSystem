var exec = require('child_process').exec;

module.exports = function restore() {
  var children = exec('mysql -uroot -p123456 jiudian < ./jiudian.sql', (error, stdout, stderr) => {
    if (error) {
      return error;
    }
  });
}