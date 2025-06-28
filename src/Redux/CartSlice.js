import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
    name: "CartSlice",
    initialState: {
        cartList: [],
        cartItems: [],
    },
    reducers: {
        AddToCartData: (state, action) => ({
            ...state,
            cartItems: [...state.cartItems, action.payload]
        }),

        AddToCartList: (state, action) => ({
            ...state,
            cartList: [...state.cartList, action.payload]
        }),

        RemoveFromCartList: (state, action) => ({
            ...state,
            cartList: state.cartList.filter(id => id !== action.payload)
        }),

        RemoveFromCartData: (state, action) => ({
            ...state,
            cartItems: state.cartItems.filter(item => item.id !== action.payload.id)
        })


    }
})

export const { AddToCartData, AddToCartList, RemoveFromCartData, RemoveFromCartList } = CartSlice.actions;

export default CartSlice.reducer;