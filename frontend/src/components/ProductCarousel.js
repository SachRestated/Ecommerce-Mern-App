import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productAction'

const ProductCarousel = () => {
    const symbol = '₹'
    const dispatch = useDispatch()

    const productTopRated = useSelector((state) => state.productTopRated)
    const { loading, error, products } = productTopRated

    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch])

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
                <Carousel pause='hover' className='bg-dark' style={{display: "flex", flexDirection: 'column'}}>
                    {products.map((product) => (
                        <Carousel.Item key={product._id}>
                            <Link to={`/product/${product._id}`}>
                            <div className="help">
                             <Carousel.Caption className='carousel-caption'>
                                <h2>
                                    {product.name} ({symbol} {Math.floor(80 * product.price)}) 
                                </h2>
                            </Carousel.Caption>
                            </div>
                            <Image src={product.image} alt={product.name} />
                           </Link>
                        </Carousel.Item>
                    ))}
                </Carousel>
            )
}

export default ProductCarousel