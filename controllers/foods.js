var Food;

Food = require('../models/foodModel');

module.exports = function(server) {

  /*
  获取可以编辑的食物列表
   */
  server.get('/foods', function(req, res) {
    return Food.find(function(err, foods) {
      var model;
      if (err) {
        console.error(err);
      }
      model = {
        foods: foods
      };
      return res.render('foods', model);
    });
  });

  /*
  添加一种新的食物
   */
  server.post('/foods', function(req, res) {
    var name, newFood, price;
    name = req.body.name && req.body.name.trim();
    price = parseFloat(req.body.price, 10);
    if (name === '' || isNaN(price)) {
      res.redirect('/foods#BadInput');
      return;
    }
    newFood = new Food({
      name: name,
      price: price
    });
    newFood.whatAmI();
    return newFood.save(function(err) {
      if (err) {
        console.error('保存失败', err);
      }
      return res.redirect('/foods');
    });
  });

  /*
  删除一种食物
   */
  server["delete"]('/foods', function(req, res) {
    return Food.remove({
      _id: req.body.item_id
    }, function(err) {
      if (err) {
        console.error('删除失败', err);
      }
      return res.redirect('/foods');
    });
  });

  /*
  编辑食物
   */
  return server.put('/foods', function(req, res) {
    console.log('PUT received. Ignoring.');
    return res.redirect('foods');
  });
};

//# sourceMappingURL=foods.js.map
