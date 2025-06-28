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
            console.log(products);
            setProductList((prev) => [...prev, ...products])
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
        // debugger;
        if (storedProds.length != 0) {
            setProductList(storedProds);
        } else {
            console.log('api called')
            // setTimeout(API, 2000);
            API(skip);

        }

    }, [])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [])

    const handleScroll = () => {
        // debugger;
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 5 && !loading) {
            console.log("Reached end of the screen");
            setSkip(prevSkip => {
                const newSkip = prevSkip + 10;
                console.log("inside scroll", newSkip);
                API(newSkip);
                return newSkip;
            });
            // debugger;
            console.log('skip', skip);
            // setSkip(skip + 10);
            // API(skip)
            // setTimeout(() => { setLoading(false) }, 2000)


        }
    };

    // useEffect(() => { setProductList(storedProds) }, [storedProds])


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