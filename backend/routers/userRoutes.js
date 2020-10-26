const express = require('express')
const router = new express.Router()
const {authUser} = require('../controllers/userController')


router.post('/login', authUser) 


module.exports = router