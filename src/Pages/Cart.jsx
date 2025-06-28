import React from 'react'
import { Badge, Button, Card, Col, Container, Row } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { LuTrash } from "react-icons/lu";
import { RemoveFromCartData, RemoveFromCartList } from '../Redux/CartSlice'
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
    const CartData = useSelector(state => state.CartReducer.cartItems);
    // const CartList = useSelector(state => state.CartReducer.CartList);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    if (CartData?.length == 0) {
        return <Container className="text-center py-5 d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "70vh" }}>
            <img
                src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                alt="Empty Cart"
                style={{ width: "120px", marginBottom: "20px", opacity: 0.6 }}
            />
            <h3 className="text-muted">Your cart is empty</h3>
            <p className="text-secondary fs-6 mt-2">Looks like you haven't added anything yet. Let's fix that!</p>
            <Button variant="warning" as={Link} to="/home" className="mt-3 px-4 py-2 fw-semibold shadow-sm">
                🛍️ Start Shopping
            </Button>
        </Container>

    }

    let totalPrice = (CartData.reduce((sum, product) => sum + product.price, 0)).toFixed(2);

    return (
        <>
            <Container fluid className="px-5 py-4" style={{ background: "#f5f5f5", minHeight: "100vh" }} >
                <Row >
                    {/* First column */}
                    <Col md={8}>
                        <h2>Shopping Cart</h2>
                        {CartData.map(item => (
                            <Card className="mb-4 mt-4 shadow-sm" key={item.id}>
                                <Card.Body className="d-flex" style={{ cursor: 'pointer' }}
                                    onClick={() => navigate(`/product-details/${item.id}`)}>

                                    <div style={{ minWidth: "150px", maxWidth: "180px" }}>
                                        <img
                                            src={item.images[0]}
                                            alt="product"
                                            style={{
                                                maxHeight: "30vh",
                                                objectFit: "contain",
                                                width: "100%",
                                            }}
                                        />
                                    </div>
                                    <Card.Title className="d-flex align-items-center justify-content-between w-100 ms-4">
                                        <div>
                                            <p className="fw-bold fs-5 mb-1">{item.title}</p>
                                            <p className="text-muted fs-6 mb-1">{item.brand}</p>
                                            <div className="d-flex align-items-center gap-3 mb-1">
                                                <span className="text-danger fs-5">${item.price}</span>
                                                <Badge bg="warning" className="text-dark fs-6 rounded">
                                                    {item.discountPercentage}% OFF
                                                </Badge>
                                            </div>
                                            <p className="text-muted fs-6 mb-0">{item.availabilityStatus}</p>
                                        </div>

                                        <LuTrash
                                            size={30}
                                            style={{
                                                cursor: "pointer",
                                                color: "red",
                                                border: "1px solid red",
                                                borderRadius: "5px",
                                                padding: "5px 0px",
                                            }}
                                            onClick={e => {
                                                e.stopPropagation();
                                                dispatch(RemoveFromCartList(item.id));
                                                dispatch(RemoveFromCartData(item));
                                            }}
                                            title="Remove from cart"
                                        />
                                    </Card.Title>
                                </Card.Body>
                            </Card>
                        ))}


                    </Col>


                    {/* 2nd Column */}
                    <Col md={4}>
                        <Card className="mb-4 shadow-sm">
                            <Card.Body>
                                <Card.Title className="d-flex ">
                                    <span>Subtotal ({CartData.length} items): </span>
                                    <span className='text-success px-2 fs-5 fw-bold'> ${totalPrice}</span>
                                </Card.Title>
                                <Card.Text><Button variant='warning' className='w-100 mt-3 fs-6 fw-bold'>Proceed to Checkout</Button></Card.Text>
                            </Card.Body>
                            {/* <button onClick={() => { totalPrice -= 5 }}>butt</button> */}
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Cart