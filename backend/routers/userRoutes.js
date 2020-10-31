const express = require('express')
const router = new express.Router()
const {authUser, getUserProfile, registerUser, updateUserProfile} = require('../controllers/userController')
const auth = require('../middleware/auth')


router.post('/login', authUser) 
router.route('/profile').get(auth, getUserProfile).put(auth, updateUserProfile)
router.route('/').post(registerUser)

module.exports = router