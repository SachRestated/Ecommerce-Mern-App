const express = require('express')
const router = new express.Router()
const { addOrderItems, getOrderById, updateOrderToPaid } = require('../controllers/orderController')
const auth = require('../middleware/auth')


router.route('/').post(auth, addOrderItems)
router.route('/:id').get(auth, getOrderById)
router.route('/:id/pay').put(auth, updateOrderToPaid)

module.exports = router