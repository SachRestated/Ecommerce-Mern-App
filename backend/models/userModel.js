const mongoose = require('mongoose')
const validator = require('validator')
const becrypt = require('bcryptjs');
const Product = require('./productModel');

const userSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true,
        trim: true
    },
    email: {
        type: String, 
        required: true, 
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        },
        trim: true
    },
    isAdmin: {
        type: Boolean, 
        required: true,
        default:false
    }
}, {
    timestamps: true
})

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await becrypt.compare(enteredPassword, this.password)
}
const User = mongoose.model('User', userSchema)

module.exports = User