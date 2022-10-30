import * as React from "react";
import { useBasket } from "../Hooks/useBasket";
import { Button, CircularProgress, Typography } from "@material-ui/core";
import { ShowModal } from "../../Services/StoreSlices/ModalSlice";
import { Basket } from "./Basket";
import { useDispatch } from "react-redux";

export const ShowBasketButton = () => {
  const { hasBasket, processing } = useBasket();
  const dispatch = useDispatch();

  if (!hasBasket) {
    return null;
  }

  const handleClick = () => {
    dispatch(ShowModal(Basket));
  };

  return (
    <>
      <div style={{ height: 50 }}>
        <Button
          style={{
            width: "90%",
            margin: "5px 5%",
            padding: 15,
            position: "relative",
          }}
          disabled={processing}
          variant="contained"
          color="secondary"
          onClick={handleClick}
        >
          {processing ? (
            <CircularProgress
              color="secondary"
              style={{ width: "20px", height: "20px" }}
            />
          ) : (
            <Typography var>برای ثبت محصول های انتخاب شده،کلیک کنید</Typography>
          )}
        </Button>
      </div>
    </>
  );
};
