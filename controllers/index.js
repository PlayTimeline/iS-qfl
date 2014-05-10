var Food;

Food = require('../models/foodModel');

module.exports = function(server) {

  /*
  在首页展示所有的食物
   */
  server.get('/', function(req, res) {
    return Food.find(function(err, foods) {
      var model;
      if (err) {
        console.error(err);
      }
      model = {
        foods: foods
      };
      return res.render('index', model);
    });
  });

  /*
  商家登录
   */
  return server.get('/login', function(req, res) {
    return res.render('login');
  });
};

//# sourceMappingURL=index.js.map
