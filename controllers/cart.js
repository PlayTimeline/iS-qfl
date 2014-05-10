var Food;

Food = require('../models/foodModel');

module.exports = function(server) {

  /*
  显示购物车
   */
  server.get('/cart', function(req, res) {
    var cart, displayCart, item, model, total, _i, _len;
    cart = req.session.cart;
    total = 0;
    displayCart = {
      items: [],
      total: 0
    };
    if (!cart) {
      res.render('result', {
        result: '您的购物车是空的！'
      });
      return;
    }
    for (_i = 0, _len = cart.length; _i < _len; _i++) {
      item = cart[_i];
      displayCart.items.push(cart[item]);
      total += cart[item].qty * cart[item].price;
    }
    req.session.total = displayCart.total = total.toFixed(2);
    model = {
      cart: displayCart
    };
    return res.render('cart', model);
  });

  /*
  加入购物车
   */
  return server.post('/cart', function(req, res) {
    var cart, id;
    req.session.cart = req.session.cart || {};
    cart = req.session.cart;
    id = req.param('item_id');
    return Food.findById(id, function(err, food) {
      if (err) {
        console.error('向购物车中添加错误', err);
        res.redirect('/cart');
        return;
      }
      if (cart[id]) {
        cart[id].qty++;
      } else {
        cart[id] = {
          name: food.name,
          price: food.price,
          prettyPrice: food.prettyPrice(),
          qty: 1
        };
      }
      return res.redirect('/cart');
    });
  });
};

//# sourceMappingURL=cart.js.map
