const express = require('express')
const router = new express.Router()
const { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getOrders, updateOrderToDelivered } = require('../controllers/orderController')
const {auth, admin} = require('../middleware/auth')


router.route('/myorders').get(auth, getMyOrders)
router.route('/:id').get(auth, getOrderById)
router.route('/:id/pay').put(auth, updateOrderToPaid)
router.route('/:id/deliver').put(auth, admin, updateOrderToDelivered)
router.route('/').post(auth, addOrderItems).get(auth, admin, getOrders)

module.exports = router