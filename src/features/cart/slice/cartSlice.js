import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "insightsCatalog",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart = [...state.cart, action.payload];
    },
  },
});

export const showCart = (state) => state.cart?.cart;

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
