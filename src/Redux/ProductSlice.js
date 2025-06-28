import { createSlice } from "@reduxjs/toolkit";

export const ProductSlice = createSlice({
    name: 'ProductReducer',
    initialState: {
        storedProds: [],
    },
    reducers: {
        AddProds: (state, action) => ({
            ...state,
            storedProds: [...state.storedProds, ...action.payload]
        })

    }
})

export const { AddProds } = ProductSlice.actions;
export default ProductSlice.reducer;