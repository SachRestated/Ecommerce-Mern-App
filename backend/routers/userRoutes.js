const express = require('express')
const router = new express.Router()
const {authUser, getUserProfile, registerUser, 
    updateUserProfile, getUsers, deleteUser, updateUser, getUserById} = require('../controllers/userController')
const {auth, admin} = require('../middleware/auth')


router.post('/login', authUser) 
router.route('/profile').get(auth, getUserProfile).put(auth, updateUserProfile)
router.route('/').post(registerUser).get(auth, admin, getUsers)
router.route('/:id')
.delete(auth, admin, deleteUser)
.get(auth, admin, getUserById)
.put(auth, admin, updateUser)

module.exports = router