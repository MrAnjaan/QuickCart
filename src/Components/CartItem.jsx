import React, { useEffect, useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AddToCartData, AddToCartList, RemoveFromCartData, RemoveFromCartList } from '../Redux/CartSlice'

const ProductCard = (props) => {
    const CartlistData = useSelector(state => state.CartReducer.cartList)
    const dispatch = useDispatch();

    const [CartList, setCartList] = useState([])
    // const CartList = [1, 2, 3];
    const { id,
        thumbnail,
        title,
        description,
        rating,
        price,
        discountPercentage,
        shippingInformation
    } = props.productData


    useEffect(() => {
        if (CartlistData.length != 0)
            setCartList(CartlistData)

    }, [])


    //button style
    const buttonStyle = CartList?.includes?.(id) ?
        { width: "100%", padding: "5px 5px", borderRadius: "8px", fontWeight: "bold", backgroundColor: "#f9d7da", color: "#6d161d", border: "none" } :
        { width: "100%", padding: "5px 5px", borderRadius: "8px", fontWeight: "bold" }

    return (
        <Card className='h-100'>

            <Link to={`/product-details/${id}`} >
                <Card.Img variant="top" src={thumbnail} style={{ height: '250px', objectFit: 'contain', padding: '10px', loading: 'lazy' }} />
            </Link>
            <Card.Body>
                <Card.Title style={{ fontSize: '2 rem', minHeight: '50px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', textOverflow: 'ellipsis' }}> <strong> {title}|{description} </strong></Card.Title>
                <Card.Subtitle className="mb-2 mt-2 text-warning text-bold">⭐{rating}</Card.Subtitle>
                <Card.Text style={{ fontSize: '1.5 rem', maxHeight: '100px', overflow: 'hidden' }}>
                    <strong>
                        ${props.price} <span className="text-muted"><strike>${(price / (1 - discountPercentage / 100)).toFixed(2)}</strike></span> <span className="text-success">({discountPercentage}% off)</span>
                    </strong>
                </Card.Text>
                <Card.Text className="mb-2 text-muted">FREE {shippingInformation}</Card.Text>
                <Card.Text >
                    <Button
                        variant="warning"
                        onClick={() => {
                            if (CartList?.includes(id)) {
                                dispatch(RemoveFromCartList(id));
                                dispatch(RemoveFromCartData(props.productData))
                                setCartList(prevList => prevList.filter(item => item !== id));
                            } else {
                                dispatch(AddToCartList(id));
                                dispatch(AddToCartData(props.productData))
                                setCartList(prevList => [...prevList, id]);
                            }
                        }}
                        style={buttonStyle}
                    >
                        {CartList?.includes(id) ? (
                            <span style={{ backgroundColor: "#f9d7da", color: "#6d161d" }}>
                                Remove from Cart
                            </span>
                        ) : (
                            <span>Add to cart</span>
                        )}
                    </Button>

                </Card.Text>

            </Card.Body>
        </Card >

    )
}

export default ProductCard




