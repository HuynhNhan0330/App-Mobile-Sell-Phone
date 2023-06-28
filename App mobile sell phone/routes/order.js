const express = require('express')
const router = express.Router()
const Order = require('../models/order')

// Getting all
router.get('/', async (req, res) => {
  try {
    const order = await Order.find()
    res.json(order)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
router.get('/:id', getOrder, (req, res) => {
  res.json(res.order)
})

// Creating one
router.post('/', async (req, res) => {
  const order = new Order({
    product_id: req.body.product_id,
    user_id: req.body.user_id,
    user_name: req.body.user_name,
    quantity: req.body.quantity,
    address: req.body.address,
    phone: req.body.phone,
    status: req.body.status,
  })
  try {
    const newOrder = await order.save()
    res.status(201).json(newOrder)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating One
router.patch('/:id', getOrder, async (req, res) => {
  if (req.body.product_id != null) {
    res.order.product_id = req.body.product_id
  }
  if (req.body.product_name != null) {
    res.order.product_name = req.body.product_name
  }
  if (req.body.user_id != null) {
    res.order.user_id = req.body.user_id
  }
  if (req.body.user_name != null) {
    res.order.user_name = req.body.user_name
  }
  if (req.body.quantity != null) {
    res.order.quantity = req.body.quantity
  }
  if (req.body.address != null) {
    res.order.address = req.body.address
  }
  if (req.body.phone != null) {
    res.order.phone = req.body.phone
  }
  if (req.body.status != null) {
    res.order.status = req.body.status
  }
  try {
    const updatedOrder = await res.order.save()
    res.json(updatedOrder)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', async (req, res) => {
  try {
    await Order.deleteOne({ _id: req.params.id });
    res.json({ message: 'Deleted order' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getOrder(req, res, next) {
  let order
  try {
    order = await Order.findById(req.params.id)
    if (order == null) {
      return res.status(404).json({ message: 'Cannot find order' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
  res.order = order
  next()
}

module.exports = router