var exec = require('child_process').exec;

module.exports = function backup() {
  var child = exec('mysqldump -uroot -p123456 jiudian > ./jiudian.sql', (error, stdout, stderr) => {
    if (error) {
      return error;
    }
  });
}