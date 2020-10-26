const express = require('express')
const asyncHandler = require('express-async-handler')
const router = new express.Router()
const Product = require('../models/productModel')

// Fetch all products -- GET /api/products
router.get('/', asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.send(products)
})) 

// Fetch single product by Id -- GET /api/products/:id
router.get('/:id', asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(product) {
        res.send(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
}))

module.exports = router