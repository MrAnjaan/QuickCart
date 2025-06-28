import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { TiShoppingCart } from "react-icons/ti";
import { Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const MyNavbar = () => {
    const cartList = useSelector(state => state.CartReducer.cartList);

    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container >
                <Navbar.Brand as={Link} to="/home">QuickCart</Navbar.Brand>
                <Nav className="me-auto ">
                    <Nav.Link as={Link} to="/home">
                        Home
                    </Nav.Link>
                    <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
                </Nav>

                {cartList?.length != 0 ?
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/cart">
                            <TiShoppingCart style={{ marginBottom: "3px" }} /> <strong>Cart</strong>
                            <Badge bg="primary" pill style={{ transform: "translateY(-5px)", borderRadius: "50%" }}>
                                {cartList.length}
                            </Badge>
                        </Nav.Link>
                    </Nav> :
                    null
                }
            </Container>
        </Navbar>
    )
}

export default MyNavbar