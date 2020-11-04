const express = require('express')
const router = new express.Router()
const {authUser, getUserProfile, registerUser, 
    updateUserProfile, getUsers} = require('../controllers/userController')
const {auth, admin} = require('../middleware/auth')


router.post('/login', authUser) 
router.route('/profile').get(auth, getUserProfile).put(auth, updateUserProfile)
router.route('/').post(registerUser).get(auth, admin, getUsers)

module.exports = router