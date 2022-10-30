import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  data: {},
};

export const ProductKey = (item) => `po-${item.productId}-${item.providerId}`;
export const LoadingSlice = createSlice({
  name: "BascketSlice",
  initialState,
  reducers: {
    AddItem: (state, action) => {
      state.data[ProductKey(action.payload)] = action.payload;
    },
    RemoveItem: (state, action) => {
      delete state.data[ProductKey(action.payload)];
    },
    Reset: (state) => {
      state.data = {};
    },
  },
});
export const { AddItem, RemoveItem, Reset } = LoadingSlice.actions;
export const BasketSelector = (state) => state.basket.data;
export default LoadingSlice.reducer;
