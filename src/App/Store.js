import { configureStore } from "@reduxjs/toolkit";
import ModalReducer from "../Services/StoreSlices/ModalSlice";
import UserReducer from "../Services/StoreSlices/UserSlice";
import LoadingReducer from "../Services/StoreSlices/LoadingSlice";
import BasketReducer from "../Basket/BascketSlice";

export const Store = configureStore({
  reducer: {
    modal: ModalReducer,
    user: UserReducer,
    loading: LoadingReducer,
    basket: BasketReducer,
  },
});
