mongoose = require 'mongoose'

FoodModel = () ->
  # 定义一个父类
  foodSchema = mongoose.Schema(
      name: String,
      price: Number
    )

  # toString
  foodSchema.methods.whatAmI = () ->
    if @name
      greeting ="我是\"#{@name}\"，只要#{@price}RMB，就可以到你碗里去哦！"
    else
      greeting = '谁知道这货是啥？ :('
    console.log greeting

  foodSchema.methods.prettyPrice = () ->
    return "#{@price.toFixed(2)} RMB"

  mongoose.model 'Food', foodSchema

module.exports = new FoodModel()