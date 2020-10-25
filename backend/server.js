const express = require('express')
const products = require('./data/products')
const colors = require('colors') 
const connectDB = require('./config/db')
const dotenv = require('dotenv')

dotenv.config()
connectDB()

const app = express()
const port = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send('API is running....')
})

app.get('/api/products', (req, res) => {
    // console.log("hello")
    res.send(products)
})

app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p._id === req.params.id)
    res.send(product)
})

app.listen(port, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`.yellow.bold)
})