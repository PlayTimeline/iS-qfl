###
数据库连接
###
mongoose = require 'mongoose'

db = () ->
    config: (conf) ->
      mongoose.connect "mongodb://#{conf.host}/#{conf.database}"
      db = mongoose.connection
      db.on 'error', console.error.bind(console, '数据库连接错误：')
      db.once 'open', () ->
        console.log '数据库连接成功'

module.exports = db()