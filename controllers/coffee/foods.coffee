Food = require '../models/foodModel'

module.exports = (server) ->

  ###
  获取可以编辑的食物列表
  ###
  server.get '/foods', (req, res) ->
    Food.find (err, foods) ->
      console.error err if err

      model =
        foods: foods
      res.render 'foods', model

  ###
  添加一种新的食物
  ###
  server.post '/foods', (req, res) ->
    name = req.body.name && req.body.name.trim()
    # TODO 浮点数精度处理，js bigdecimal
    # https://github.com/justmoon/node-bignum instead.
    price = parseFloat req.body.price, 10
    if name is '' or isNaN price
      res.redirect '/foods#BadInput'
      return

    newFood = new Food(
        name: name,
        price: price
      )

    newFood.whatAmI()

    newFood.save (err) ->
      console.error '保存失败', err if err
      res.redirect '/foods'

  ###
  删除一种食物
  ###
  server.delete '/foods', (req, res) ->
    Food.remove {_id: req.body.item_id}, (err) ->
      console.error '删除失败', err if err
      res.redirect '/foods'

  ###
  编辑食物
  ###
  server.put '/foods', (req, res) ->
    console.log 'PUT received. Ignoring.'
    res.redirect 'foods'