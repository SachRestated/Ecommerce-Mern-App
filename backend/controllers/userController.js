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

const updateUserProfile = asyncHandler(async(req, res) => {
    const user = req.user

    if(user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password) {
            user.password = req.body.password
        }
        const updatedUser = await user.save()

        res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })
    } else {

        res.status(400)
        throw new Error('User not found')
    }

    
}) 

//get all users - for admin only
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.send(users)
}) 

module.exports = {
    authUser,
    getUserProfile,
    registerUser,
    updateUserProfile,
    getUsers
}