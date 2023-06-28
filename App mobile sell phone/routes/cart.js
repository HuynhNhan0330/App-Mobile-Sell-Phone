const express = require('express')
const router = express.Router()
const Cart = require('../models/cart')

// Getting all
router.get('/', async (req, res) => {
  try {
    const cart = await Cart.find()
    res.json(cart)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
router.get('/:id', getCart, (req, res) => {
  res.json(res.cart)
})

// Creating one
router.post('/', async (req, res) => {
  const cart = new Cart({
    product_id: req.body.product_id,
    product_name: req.body.product_name,
    image: req.body.image,
    user_id: req.body.user_id,
    price: req.body.price,
  })
  try {
    const newCart = await cart.save()
    res.status(201).json(newCart)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating One
router.patch('/:id', getCart, async (req, res) => {
  if (req.body.product_id != null) {
    res.cart.product_id = req.body.product_id
  }
  if (req.body.product_name != null) {
    res.cart.product_name = req.body.product_name
  }
  if (req.body.user_id != null) {
    res.cart.user_id = req.body.user_id
  }
  if (req.body.quantity != null) {
    res.cart.quantity = req.body.quantity
  }

  if (req.body.image != null) {
    res.cart.image = req.body.image
  }

  try {
    const updatedCart = await res.cart.save()
    res.json(updatedCart)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', async (req, res) => {
  try {
    await Cart.deleteOne({ _id: req.params.id });
    res.json({ message: 'Deleted cart' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getCart(req, res, next) {
  let cart
  try {
    cart = await Cart.findById(req.params.id)
    if (cart == null) {
      return res.status(404).json({ message: 'Cannot find cart' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
  res.cart = cart
  next()
}

module.exports = router