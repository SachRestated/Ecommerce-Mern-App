const asyncHandler = require('express-async-handler')
const Order = require('../models/productModel')

//Create New Order
const addOrderItems = asyncHandler(async (req, res) => {
    const {orderItems, 
        shippingAddress, 
        paymentMethod, 
        itemsPrice, 
        taxPrice, 
        shippingPrice, 
        totalPrice} = req.body

    if(orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order Items')
        return 
    } else {
        const order = new Order({
            orderItems,
            user = req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })

        const createdOrder = await order.save()
        res.status(201).send(createdOrder) 
    }
})

module.exports = {
    addOrderItems
}