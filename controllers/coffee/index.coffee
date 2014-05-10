Food = require '../models/foodModel'

module.exports = (server) ->

  ###
  在首页展示所有的食物
  ###
  server.get '/', (req, res) ->
    Food.find (err, foods) ->
      console.error err if err

      model =
        foods: foods
      res.render 'index', model

  ###
  商家登录
  ###
  server.get '/login', (req, res) ->
    res.render 'login'