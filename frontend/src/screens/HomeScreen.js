import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col} from 'react-bootstrap'
import Product from '../components/Product' 
import Loader from '../components/Loader' 
import Message from '../components/Message' 

import { listProduct } from '../actions/productAction'


const HomeScreen = () => {

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    console.log(productList)
    const { loading, error, products} = productList

    useEffect(() => {
        dispatch(listProduct())
    }, [dispatch])

    return (
        <>
            <h1>Latest Products</h1>
            {
                loading ? 
                    <Loader /> : 
                error ? 
                    <Message variant={'danger'} children={error}/> : 
                    <Row>
                        {products.map( product => {
                            return (
                                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                    <Product product={product} />
                                </Col>
                            )   
                        })}
                    </Row>  

            }
            
        </>
    )
}

export default HomeScreen