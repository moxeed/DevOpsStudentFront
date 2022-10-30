import * as React from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { HideModal } from "../../Services/StoreSlices/ModalSlice";
import { IsAuthenticated } from "../../Services/StoreSlices/UserSlice";
import { useBasket } from "../Hooks/useBasket";
import { LineItems } from "./LineItems";

export const Basket = () => {
  const { basket, removeItem, submit, reset, processing } = useBasket();
  const isAuthenticated = useSelector(IsAuthenticated);
  const history = useHistory();
  const dispatch = useDispatch();

  const lineItems = Object.values(basket);

  const handleSubmit = () => {
    if (isAuthenticated) {
      submit();
    } else {
      dispatch(HideModal());
      history.push("/v2/Identity/login");
    }
  };

  const handleRemove = () => {
    reset();
    dispatch(HideModal());
  };

  return (
    <>
      <Typography variant="h6">
        ابتدا از محصولات سبد خرید خود اطمینان حاصل کنید، در صورتی که محصولی مد
        نظر شما نیست میتوانید آن را حذف کنید.
      </Typography>
      <Typography variant="h6">
        پس از بررسی لیست محصولات خود، بر روی ثبت سفارش کلیک کنید تا فاکتور خرید
        شما نمایش داده شود.
      </Typography>
      <LineItems items={lineItems} onDelete={removeItem} />
      <Grid container justifyContent="center">
        <Button
          style={{ padding: 10, margin: 10 }}
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={processing}
        >
          ثبت سفارش
        </Button>
        <Button
          style={{ padding: 10, margin: 10 }}
          variant="contained"
          color="secondary"
          onClick={handleRemove}
          disabled={processing}
        >
          حذف سبد
        </Button>
      </Grid>
    </>
  );
};
