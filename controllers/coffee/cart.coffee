Food = require '../models/foodModel'

module.exports = (server) ->

  ###
  显示购物车
  ###
  server.get '/cart', (req, res) ->
    cart  = req.session.cart
    total = 0
    displayCart =
      items: [],
      total: 0

    if not cart
      res.render 'result', {result: '您的购物车是空的！'}
      return

    for item in cart
      displayCart.items.push cart[item]
      total += cart[item].qty * cart[item].price

    req.session.total = displayCart.total = total.toFixed 2

    model =
      cart: displayCart
    res.render 'cart', model

  ###
  加入购物车
  ###
  server.post '/cart', (req, res) ->
    req.session.cart = req.session.cart or {}
    cart             = req.session.cart
    id               = req.param 'item_id'

    Food.findById id, (err, food) ->
      if err
        console.error '向购物车中添加错误', err
        res.redirect '/cart'
        return

      if cart[id]
       cart[id].qty++
      else
        cart[id] =
          name: food.name,
          price: food.price,
          prettyPrice: food.prettyPrice(),
          qty: 1

      res.redirect '/cart'