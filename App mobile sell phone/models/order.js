const mongoose = require('mongoose')

// id mongo tự tăng
const orderSchema = new mongoose.Schema({
  product_id: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  user_name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Order', orderSchema)