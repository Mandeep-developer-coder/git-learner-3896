import { createSlice } from "@reduxjs/toolkit";
const ProductSlice=createSlice({
    name:"Product",
    initialState:{
        items:[],
        skip:0
    },
    reducers:{
        addProducts:(state,action)=>{
            state.items=[...state.items,...action.payload],
            state.skip+=action.payload.length;
        }
    }
})
export const {addProducts}=ProductSlice.actions;
export default ProductSlice.reducer;