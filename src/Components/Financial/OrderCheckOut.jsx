import {
  Button,
  Divider,
  Grid,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useBasket } from "../../Basket/Hooks/useBasket";
import OrderSerivce from "../../Services/Financial/OrderService";
import PaymentSerivce from "../../Services/Financial/PaymentService";
import { HideModal } from "../../Services/StoreSlices/ModalSlice";
import TomanConverter from "../../Utility/TomanConverter";
import IDivider from "../Reusable/IDivider";
import { LineItems } from "./LineItems";
import eventBus from "../../Common/EventBus/EventBus";
import OrderEvents from "./OrderEvents";
import { GApushData } from "src/v2/components/GAlog/GAlog";
import { GetUserId } from "src/Services/Authentication/useAuthentication";

const useStyles = makeStyles(() => ({
  centerContainer: {
    textAlign: "center",
    minWidth: "300px",
  },
  container: {
    textAlign: "center",
    color: "#696969",
  },
}));

const OrderCheckOut = () => {
  const [order, setOrder] = useState();
  const [terminal, setTerminal] = useState();
  const [discountCode, setDiscountCode] = useState("");
  const [applyMessage, setApplyMessage] = useState("");
  const [processing, setProcessing] = useState(false);
  const dispatch = useDispatch();
  const { reset } = useBasket();
  useEffect(() => {
    OrderSerivce.GetCurrentOrder()
      .then(setOrder)
      .catch(() => {});
  }, []);
  useEffect(() => {
    if (order) {
      PaymentSerivce.GetTerminalForOrder(order.orderId).then(
        (reponse) => setTerminal(reponse.data),
        () => {}
      );
    }
  }, [order]);
  const applyDiscount = (e) => {
    e.preventDefault();
    if (discountCode !== "") {
      OrderSerivce.ApplyDiscountCode(discountCode).then(
        (response) => {
          setApplyMessage(response.data);
          OrderSerivce.GetCurrentOrder().then(setOrder);
        },
        (response) => {
          setApplyMessage(response.data.errors[0]);
        }
      );
    }
    setTimeout(function () {
      setApplyMessage("");
    }, 6000);
  };

  const handleFreeOrder = async () => {
    setProcessing(true);
    try {
      await OrderSerivce.CheckOutCurrentOrder();
      const { products } = order;
      GApushData("free checkout", {
        products: JSON.stringify(products),
        userId: GetUserId(),
      });

      reset();
      eventBus.cast(OrderEvents.orderCompeleted);
      dispatch(HideModal());
    } catch {
      dispatch(HideModal());
    }
    setProcessing(false);
  };
  const classes = useStyles();
  if (order) {
    const { details, products, userWallet } = order;
    let paymentAmount =
      details.reduce((curr, next) => next.payableAmount + curr, 0) - userWallet;
    if (paymentAmount < 0) paymentAmount = 0;
    if (details.length > 0)
      return (
        <Grid className={classes.centerContainer}>
          <IDivider title="فاکتور خرید" color="#41b64e" />
          {details[0].payableAmount > 0 ? (
            <>
              <LineItems items={products} />
              <Divider variant="middle" />
              <Grid container className={classes.container} item xs="12">
                <Grid item xs={6}>
                  <ListItemText primary={"ارزش سفارش"} />
                </Grid>
                <Grid item xs={6}>
                  <ListItemText
                    primary={TomanConverter({
                      Rial: details.reduce((curr, next) => next.fee + curr, 0),
                    })}
                  />
                </Grid>
              </Grid>
              <Grid container className={classes.container} xs="12">
                <Grid item xs={6}>
                  <ListItemText primary={"موجودی حساب"} />
                </Grid>
                <Grid item xs={6}>
                  <ListItemText
                    primary={TomanConverter({
                      Rial: userWallet,
                    })}
                  />
                </Grid>
              </Grid>
              <Grid container className={classes.container} item xs="12">
                <Grid item xs={6}>
                  <ListItemText primary={"تخفیف"} />
                </Grid>
                <Grid item xs={6}>
                  <ListItemText
                    primary={TomanConverter({
                      Rial: details.reduce(
                        (curr, next) => next.discountAmount + curr,
                        0
                      ),
                    })}
                  />
                </Grid>
              </Grid>
              <Divider variant="middle" />
              <Grid container className={classes.container} item xs="12">
                <Grid item xs={6}>
                  <ListItemText primary={"مجموع قابل پرداخت"} />
                </Grid>
                <Grid item xs={6}>
                  <ListItemText
                    primary={TomanConverter({
                      Rial: paymentAmount,
                    })}
                  />
                </Grid>
                <Grid
                  container
                  item
                  style={{ marginTop: 20, marginBottom: 20 }}
                  className={classes.container}
                  xs="12"
                  alignItems="center"
                >
                  <Grid item xs={9} sm={6}>
                    <input
                      type="text"
                      name="discountCode"
                      autoComplete="off"
                      style={{
                        width: "100%",
                        border: "none",
                        borderBottom: "1px solid #41B64E",
                        outline: "none",
                        padding: "10px 0",
                        marginRight: 20,
                      }}
                      value={discountCode}
                      onChange={(e) => {
                        setDiscountCode(e.target.value);
                      }}
                      placeholder="کد تخفیف را اینجا وارد کنید..."
                    />
                    <lable
                      id="applyMessage"
                      style={{ position: "absolute", color: "#41B64E" }}
                    >
                      {applyMessage}
                    </lable>
                  </Grid>
                  <Grid item xs={3} sm={3}></Grid>
                  <Grid item xs={4} sm={2}>
                    <Button
                      variant="contained"
                      onClick={(e) => {
                        applyDiscount(e);
                      }}
                      className="Button"
                      style={{ margin: 10 }}
                      color="secondary"
                    >
                      اعمال
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              {paymentAmount > 0 ? (
                <a href={terminal} style={{ textDecoration: "none" }}>
                  <Button
                    className="Button"
                    variant="contained"
                    color="secondary"
                  >
                    انتقال به درگاه پرداخت
                  </Button>
                </a>
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  disabled={processing}
                  className={classes.colorSecondary + " Button"}
                  onClick={handleFreeOrder}
                >
                  اتمام سفارش
                </Button>
              )}
            </>
          ) : (
            <>
              <LineItems items={products} />
              <Grid
                container
                item
                className={classes.container}
                justifyContent="center"
                xs="12"
              >
                <Grid item xs={6}>
                  <ListItemText primary={"این محصول رایگان میباشد"} />
                </Grid>
              </Grid>
              <Button
                variant="contained"
                color="secondary"
                disabled={processing}
                className={classes.colorSecondary + " Button"}
                onClick={handleFreeOrder}
              >
                اتمام سفارش
              </Button>
            </>
          )}
        </Grid>
      );
  }
  return null;
};

export default OrderCheckOut;
