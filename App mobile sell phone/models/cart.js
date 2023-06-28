const mongoose = require('mongoose')

// id mongo tự tăng
const cartSchema = new mongoose.Schema({
  product_id: {
    type: String,
    required: true
  },
  product_name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
     default: 1
  },
  price: {
    type: Number,
    required: true,
  },
})

module.exports = mongoose.model('Cart', cartSchema)