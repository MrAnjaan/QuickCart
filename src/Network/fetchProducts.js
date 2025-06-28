import React from 'react'


export const fetchProducts = async (skip) => {
    const url = `https://dummyjson.com/products?limit=10&skip=${skip}`
    console.log(url)
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data.products);
    return data.products
}
