const mongoose = require('mongoose')

// id mongo tự tăng
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  describe: {
    type: String,
    required: true
  },
  screen: {
    type: String,
    required: true
  },
  operating_system: {
    type: String,
    required: true
  },
  rear_camera: {
    type: String,
    required: true
  },
  front_camera: {
    type: String,
    required: true
  },
  ram: {
    type: String,
    required: true
  },
  rom: {
    type: String,
    required: true
  },
  chip: {
    type: String,
    required: true
  },
  sim: {
    type: String,
    required: true
  },
  pin: {
    type: String,
    required: true
  },
  images: {
    type: [String],
    required: true
  },
  color: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Product', productSchema)