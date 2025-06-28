import { Button, Col, Container, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import { fetchProducts } from '../Network/fetchProducts';
import ProductCard from '../Components/CartItem';
import Loader from '../Components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { AddProds } from '../Redux/ProductSlice';
import { Link } from 'react-router-dom';


const ProductList = () => {
    const storedProds = useSelector((state) => state.prodReducer.storedProds);

    const [loading, setLoading] = useState(false)
    const [isFirstLoad, setIsFirstLoad] = useState(true)
    const [productList, setProductList] = useState(storedProds)
    const [skip, setSkip] = useState(0)

    const dispatch = useDispatch();

    const API = async (newSkip) => {
        try {
            setLoading(true);
            const products = await fetchProducts(newSkip);
            setProductList(products)
            dispatch(AddProds(products));
        }
        catch (err) {
            console.log("error in fetching data", err)
        }
        finally {
            setLoading(false);
            setIsFirstLoad(false);
        }

    }

    useEffect(() => {
        if (storedProds.length != 0) {
            setProductList(storedProds);
        } else {
            console.log('api called')
            // setTimeout(API, 2000);
            API(skip);

        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [])

    const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

        if (scrollTop + clientHeight >= scrollHeight - 5) {
            console.log("Reached end of the screen");
            setLoading(true);
            setSkip(prevSkip => {
                const newSkip = prevSkip + 10;
                API(newSkip);
                return newSkip;
            });
            setTimeout(() => { setLoading(false) }, 2000)


        }
    };

    useEffect(() => { setProductList(storedProds) }, [storedProds])


    return (
        <div>
            <Container className='mt-4' >
                <Row >

                    {/* {console.log("prodLsit", productList)}
                    {console.log("Stored", storedProds)} */}

                    {(isFirstLoad && loading) ?
                        <p>
                            <Loader loading={loading} position="center" />
                        </p> :
                        (
                            productList.map(product => (
                                <Col md={4} key={product.id} className='mb-4' >
                                    <ProductCard productData={product} />
                                </Col>
                            )

                            ))}

                </Row>
                {loading && !isFirstLoad && <div><Loader loading={loading} position="bottom" /></div>}
            </Container>

        </div>
    )
}

export default ProductList