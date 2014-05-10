kraken   = require 'kraken-js'
db       = require './lib/database'
language = require './lib/language'
express  = require 'express'
app      = {}

app.configure = (nconf, next) ->
  # 配置数据库
  db.config nconf.get('database-config')
  next null

app.requestStart = (server) ->
  console.log 'hello world.'

app.requestBeforeRoute = (server) ->
  # 加载中间件
  server.use express.methodOverride()
  # 语言环境
  server.use language()

app.requestAfterRoute = (server) ->
  console.log 'the website coming soon!'

kraken.create(app).listen (err) ->
  console.error err if err