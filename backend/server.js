const express = require('express')
const products = require('./data/products')
const colors = require('colors') 
const connectDB = require('./config/db')
const dotenv = require('dotenv')
const {notFound, errorHandler} = require('./middleware/errorMiddleware')
const productRoutes = require('./routers/productRoutes')
const userRoutes = require('./routers/userRoutes')

dotenv.config()
connectDB()

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())

app.get('/', (req, res) => {
    res.send('API is running....')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`.yellow.bold)
})