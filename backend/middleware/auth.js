const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const auth = async(req, res, next) => {
    try {
        if(req.header('Authorization') && req.header('Authorization').startsWith('Bearer'))  {
            // console.log('Hello')
            const token = req.header('Authorization').replace('Bearer ', '');
        
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const user = await User.findById( decoded.id)
            if (!user) {
                throw new Error()
            }

            req.token = token
            req.user = user
                    
            next()
        }   
        else {
            throw new Error('Some Error')
        }
        
    } catch (e) {
        // console.log(e)
        console.log(e)
        res.status(401).send({error: 'Please Authenticate'})
    }
}

const admin = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401)
        throw new Error('Not authorized as an admin')
    }
}

module.exports = {
    auth, admin
}