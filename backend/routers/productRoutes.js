const express = require('express')
const router = new express.Router()
const {auth, admin} = require('../middleware/auth')
const { getProducts, getProductsById, deleteProduct,
    createProduct, updateProduct,} = require('../controllers/productController')

// Fetch all products -- GET /api/products
router.route('/').get(getProducts).post(auth, admin, createProduct)

// Fetch single product by Id -- GET /api/products/:id
router.route('/:id')
.get(getProductsById)
.delete(auth, admin, deleteProduct)
.put(auth, admin, updateProduct)

module.exports = router