var FoodModel, mongoose;

mongoose = require('mongoose');

FoodModel = function() {
  var foodSchema;
  foodSchema = mongoose.Schema({
    name: String,
    price: Number
  });
  foodSchema.methods.whatAmI = function() {
    var greeting;
    if (this.name) {
      greeting = "我是\"" + this.name + "\"，只要" + this.price + "RMB，就可以到你碗里去哦！";
    } else {
      greeting = '谁知道这货是啥？ :(';
    }
    return console.log(greeting);
  };
  foodSchema.methods.prettyPrice = function() {
    return "" + (this.price.toFixed(2)) + " RMB";
  };
  return mongoose.model('Food', foodSchema);
};

module.exports = new FoodModel();
