import React, { useState, useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails } from '../actions/orderAction'

const OrderScreen = ({ match }) => {
    const symbol = '₹'
    const dispatch = useDispatch()
    const orderId = match.params.id

    const { order, loading, error } = useSelector(state => state.orderDetails)

    useEffect(() => {
        if (!order || order._id !== orderId) {
            dispatch(getOrderDefails(orderId))
        }
    }, [order, orderId]) 


    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
    <>
        <h1>Order {order._id}</h1>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p><strong>Name: </strong>{order.user.name}</p>
                            <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                        <p>
                            <strong>Address:</strong>
                            {order.shippingAddress.address} {order.shippingAddress.city}{' '}
                            {order.shippingAddress.postalCode},{' '}
                            {order.shippingAddress.country}
                        </p>
                            {order.isDelivered ? <Message variant='success'>Delivered on {order.deliveredAt}</Message> :
                                <Message variant='danger'>Not Delivered</Message>}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method:</strong>
                            {order.paymentMethod}
                        </p>
                        {order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message>: 
                        <Message variant='danger'>Not Paid</Message>}
                        
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {order.orderItems.length === 0 ? <Message>Order is empty</Message>
                            : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={2}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col >
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x {symbol}{Math.floor(item.price * 80)} = {symbol}{item.qty * Math.floor(item.price * 80)}
                                                </Col>

                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>{symbol}{order.itemsPrice.toLocaleString('en-IN')}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>{symbol}{order.shippingPrice.toLocaleString('en-IN')}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>{symbol}{order.taxPrice.toLocaleString('en-IN')}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>{symbol}{order.totalPrice.toLocaleString('en-IN')}</Col>
                            </Row>
                        </ListGroup.Item>


                    </ListGroup>
                </Card>
            </Col>
        </Row> 
    </>
}

export default OrderScreen
