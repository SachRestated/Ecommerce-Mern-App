const express = require('express')
const router = new express.Router()
const { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders } = require('../controllers/orderController')
const {auth} = require('../middleware/auth')


router.route('/myorders').get(auth, getMyOrders)
router.route('/:id').get(auth, getOrderById)
router.route('/:id/pay').put(auth, updateOrderToPaid)
router.route('/').post(auth, addOrderItems)

module.exports = router