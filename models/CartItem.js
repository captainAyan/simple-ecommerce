const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const CartItemSchema = new mongoose.Schema({
  product_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const CartItem = mongoose.model("CartItem", CartItemSchema);

module.exports = CartItem;
