const express = require('express')
const router = new express.Router()
const { addOrderItems } = require('../controllers/orderController')
const auth = require('../middleware/auth')


router.route('/').post(auth, addOrderItems)

module.exports = router