import React, { useEffect, useState } from 'react'
import { Card, Carousel, Col, Container, Row, Badge, ListGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import Loader from '../Components/Loader';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState()

    const fetchProduct = async () => {
        try {
            const response = await fetch(`https://dummyjson.com/products/${id}`);
            const data = await response.json();
            setProduct(data);
            console.log(data);
        }
        catch (error) {
            console.log("Error in fetching data", error)
        }
    }

    useEffect(() => {
        fetchProduct();
    }, [])

    if (!product?.images) return (
        <>
            {/* Loading... */}
            <Loader loading={true} position={"center"} />
        </>
    )

    const {
        title,
        brand,
        category,
        desciption,
        price,
        discountPercentage,
        availabilityStatus,
        stock,
        images,
        rating,
        reviews,
        dimensions,
        weight,
        shippingInformation,
        warrantyInformation,
        returnPolicy,
        sku,
        tags
    } = product;

    return (
        <div>
            <Container fluid className="px-5 py-4" style={{ background: "#f5f5f5", minHeight: "100vh" }}>
                <Row className="g-4 align-items-stretch">

                    {/* Left wala Column */}
                    <Col md={6} className="d-flex">
                        <div className="w-100 bg-white rounded p-3 d-flex align-items-center justify-content-center">
                            {images.length > 1 ? (
                                <Carousel variant="dark" className="w-100">
                                    {images.map((imgUrl, index) => (
                                        <Carousel.Item key={index}>
                                            <div className="w-100 d-flex justify-content-center">
                                                <img
                                                    className="d-block"
                                                    src={imgUrl}
                                                    alt={`Slide ${index + 1}`}
                                                    style={{
                                                        maxHeight: "70vh",
                                                        objectFit: "contain",
                                                        width: "100%",
                                                    }}
                                                />
                                            </div>
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            ) : (
                                <img
                                    src={images[0]}
                                    alt="product"
                                    style={{
                                        maxHeight: "70vh",
                                        objectFit: "contain",
                                        width: "100%",
                                    }}
                                />
                            )}
                        </div>
                    </Col>

                    {/* Right wala Column */}
                    <Col md={6} className="d-flex">
                        <div className="w-100 d-flex flex-column justify-content-between">
                            <div>
                                <h2 className="fw-bold">{title}</h2>
                                <h5 className="text-muted" style={{ fontSize: "1rem" }}>
                                    {brand}
                                </h5>
                                <div className="mb-2">
                                    <Badge bg="success" className="me-2">
                                        {availabilityStatus}
                                    </Badge>
                                    <Badge bg="info">{category}</Badge>
                                </div>

                                <p>{product.description}</p>

                                <div className="price-block mb-3">
                                    <span className="text-primary fs-5 fw-bold">${price}</span>
                                    <span className="text-muted text-decoration-line-through ms-2 fw-bold fs-5">
                                        ${(price / (1 - discountPercentage / 100)).toFixed(2)}
                                    </span>
                                    <Badge bg="danger" className="ms-2 fs-6 fw-bold">
                                        {(discountPercentage || 0).toFixed(2)}% OFF
                                    </Badge>
                                </div>

                                <ListGroup className="w-100" style={{ fontSize: "0.8rem" }}>
                                    <ListGroup.Item><strong>Rating:</strong> ⭐ {rating}</ListGroup.Item>
                                    <ListGroup.Item><strong>Stock:</strong> {stock} items</ListGroup.Item>
                                    <ListGroup.Item><strong>Dimensions:</strong> {dimensions.width}W × {dimensions.height}H × {dimensions.depth}D</ListGroup.Item>
                                    <ListGroup.Item><strong>Weight:</strong> {weight} kg</ListGroup.Item>
                                    <ListGroup.Item><strong>Shipping:</strong> {shippingInformation}</ListGroup.Item>
                                    <ListGroup.Item><strong>Warranty:</strong> {warrantyInformation}</ListGroup.Item>
                                    <ListGroup.Item><strong>Return Policy:</strong> {returnPolicy}</ListGroup.Item>
                                    <ListGroup.Item><strong>SKU:</strong> {sku}</ListGroup.Item>
                                    <ListGroup.Item><strong>Tags:</strong> {tags.map((tag, index) => (
                                        <Badge bg="secondary" className="mx-1" key={index}>
                                            {tag}
                                        </Badge>
                                    ))}</ListGroup.Item>
                                </ListGroup>
                            </div>
                        </div>
                    </Col>
                </Row>


                <Row className="mt-5">
                    <h2 className="mb-4">🗣️ Customer Reviews</h2>
                    {reviews.map((review, idx) => (
                        <Col md={12} key={idx}>
                            <Card className="mb-4 shadow-sm">
                                <Card.Body>
                                    <Card.Title className="d-flex justify-content-between">
                                        <span>⭐ {review.rating} | {review.reviewerName}</span>
                                        <span className="text-muted">{review.date.split("T")[0]} | {review.reviewerEmail}</span>
                                    </Card.Title>
                                    <Card.Text>{review.comment}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

        </div>
    )
}

export default ProductDetails