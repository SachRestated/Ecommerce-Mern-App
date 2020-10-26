const express = require('express')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const authUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))) {
        res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: null
        })
    } else {
        res.status(401)
        throw new Error('Invalid Username or password')
    }
}) 

module.exports = {
    authUser
}