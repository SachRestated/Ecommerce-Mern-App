const express = require('express')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const generateToken = require('../utils/generateToken')

const authUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))) {
        res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid Username or password')
    }
})

const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password} = req.body

    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(400)
        throw new Error('User already Exists')
    }

    const user = await User.create({
        name, 
        email, 
        password
    })

    if (user) {
        res.status(201).send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// get private user profile
const getUserProfile = asyncHandler(async(req, res) => {
    const user = req.user
    res.send(user.formatProp())
}) 

module.exports = {
    authUser,
    getUserProfile,
    registerUser
}