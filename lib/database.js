
/*
数据库连接
 */
var db, mongoose;

mongoose = require('mongoose');

db = function() {
  return {
    config: function(conf) {
      mongoose.connect("mongodb://" + conf.host + "/" + conf.database);
      db = mongoose.connection;
      db.on('error', console.error.bind(console, '数据库连接错误：'));
      return db.once('open', function() {
        return console.log('数据库连接成功');
      });
    }
  };
};

module.exports = db();
