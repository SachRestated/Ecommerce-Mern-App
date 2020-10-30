const express = require('express')
const router = new express.Router()
const {authUser, getUserProfile, registerUser} = require('../controllers/userController')
const auth = require('../middleware/auth')


router.post('/login', authUser) 
router.route('/profile').get(auth, getUserProfile)
router.route('/').post(registerUser)

module.exports = router