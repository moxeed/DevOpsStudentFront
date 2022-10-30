/* eslint-disable no-console */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderCheckOut from "../../Components/Financial/OrderCheckOut";
import OrderSerivce from "../../Services/Financial/OrderService";
import { ShowModal } from "../../Services/StoreSlices/ModalSlice";
import { IsAuthenticated } from "../../Services/StoreSlices/UserSlice";
import {
  BasketSelector,
  AddItem,
  RemoveItem,
  Reset,
  ProductKey,
} from "../BascketSlice";

export const useBasket = () => {
  const dispatch = useDispatch();
  const basket = useSelector(BasketSelector);
  const [processing, setProcessing] = React.useState(false);
  const isAuthenticated = useSelector(IsAuthenticated);

  const addItem = (item) => {
    // eslint-disable-next-line no-undefined
    if (item.productId === undefined || item.isPurchased === true) {
      return;
    }
    dispatch(AddItem(item));
  };

  const removeItem = (item) => {
    dispatch(RemoveItem(item));
  };

  const reset = () => {
    dispatch(Reset());
  };

  const addRange = (items) => {
    for (const item of items) {
      addItem(item);
    }
  };

  const handleScheduleSelectCompelete = () => {
    dispatch(ShowModal(OrderCheckOut));
  };

  const submit = async () => {
    if (!isAuthenticated) {
      return;
    }
    const order = Object.values(basket);
    setProcessing(true);

    try {
      await OrderSerivce.CancelCurrentOrder();
    } catch {
      console.log("error");
    }
    OrderSerivce.PlaceOrder(order).then(
      (items) => {
        if (items.data.isSucceeded) {
          setProcessing(false);
          handleScheduleSelectCompelete();
        }
      },
      console.log 
      // complete profile
    );
  };

  const hasBasket = Object.keys(basket).length > 0;
  // eslint-disable-next-line no-undefined
  const isSelected = (item) => basket[ProductKey(item)] !== undefined;

  return {
    basket,
    addItem,
    addRange,
    removeItem,
    reset,
    submit,
    processing,
    hasBasket,
    isSelected,
  };
};
