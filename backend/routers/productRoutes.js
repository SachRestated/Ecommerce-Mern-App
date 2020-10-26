const express = require('express')
const router = new express.Router()
const {getProducts, getProductsById} = require('../controllers/productController')

// Fetch all products -- GET /api/products
router.route('/').get(getProducts) 

// Fetch single product by Id -- GET /api/products/:id
router.route('/:id').get(getProductsById)

module.exports = router