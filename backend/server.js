const express = require('express')
const products = require('./data/products')

const app = express()
const port = 5000

app.get('/', (req, res) => {
    res.send('API is running....')
})

app.get('/api/products', (req, res) => {
    console.log("hello")
    res.send(products)
})

app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p._id === req.params.id)
    res.send(product)
})

app.listen(port, () => {
    console.log('Server is up and running on port', port)
})