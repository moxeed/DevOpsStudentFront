import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import IDivider from "../Reusable/IDivider";
import Grid from "@material-ui/core/Grid";
import Select from "../../Assets/Images/select.png";
import { Button, CircularProgress, Typography } from "@material-ui/core";
import OrderSerivce from "../../Services/Financial/OrderService";
import { useDispatch, useSelector } from "react-redux";
import { ShowModal } from "../../Services/StoreSlices/ModalSlice";
import OrderCheckOut from "../Financial/OrderCheckOut";
import { useHistory } from "react-router-dom";
import { IsAuthenticated } from "../../Services/StoreSlices/UserSlice";
import { PickerVitrine } from "./PickerVitrine";
import { SingleItemVitrine } from "./SingleItemVitrine";
import { MultiItemVitrine } from "./MultiItemVitrine";
import {
  AddItem,
  BasketSelector,
  ProductKey,
  RemoveItem,
  Reset,
} from "../../Basket/BascketSlice";
import { toast } from "react-toastify";
import usePersistedState from "src/Utility/usePersistedState";
import { GApushData } from "src/v2/components/GAlog/GAlog";
import { GetUserId } from "src/Services/Authentication/useAuthentication";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
    direction: "rtl",
    textAlign: "center",
    transition: "all 1s",
    border: "0px solid red",
    padding: "10px",
  },
  prevPrice: {
    textDecoration: "line-through",
  },
  demo: {
    height: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    textAlign: "center",
    color: "#98A39A",
  },
  disableButton: {
    padding: " 7px 12px",
    backgroundColor: "#d9d9d9",
    color: "#808080",
    boxShadow: "none",
    border: "none",
    margin: "5px",
  },
}));

const VitrineTypes = {
  SingleItem: "SingleItem",
  Picker: "Picker",
  MultiItem: "MultiItem",
};

export default function Vitrine({ data, postActions, AfterPurchased }) {
  const [loading, setLoading] = useState(true);
  const isAuthenticated = useSelector(IsAuthenticated);
  const dispatch = useDispatch();
  const history = useHistory();
  const basket = useSelector(BasketSelector);
  const [openVitrin] = usePersistedState("OPVD", false);

  useEffect(() => {
    if (openVitrin && isAuthenticated) {
      OrderSerivce.CancelCurrentOrder().then(PlaceOrder).catch(PlaceOrder);
    }
  }, [openVitrin]);

  const addItem = (item) => {
    if (item.isPurchased) {
      return;
    }
    if (item.product !== null) dispatch(AddItem({ ...item, ...item.product }));
  };

  const removeItem = (item) => {
    dispatch(RemoveItem(item));
  };

  const resetBasket = () => {
    dispatch(Reset());
  };

  // eslint-disable-next-line no-undefined
  const isSelected = (item) => basket[ProductKey(item)] !== undefined;

  const orderToolBox = { addItem, removeItem, resetBasket, isSelected };

  const handleScheduleSelectCompelete = () => {
    dispatch(ShowModal(OrderCheckOut));
  };

  const classes = useStyles();
  const PlaceOrder = () => {
    const order = Object.values(basket);
    setLoading(false);

    OrderSerivce.PlaceOrder(order).then(
      (items) => {
        if (items.data.isSucceeded) {
          setLoading(true);
          if (
            items.data.details[items.data.details.length - 1].needReserveDate
          ) {
            dispatch(
              ShowModal(() =>
                postActions({
                  onComplete: handleScheduleSelectCompelete,
                  lineItem: items.data.details[items.data.details.length - 1],
                })
              )
            );
          } else {
            handleScheduleSelectCompelete();
          }
        } else {
          setLoading(true);
          toast.error(items.data.errorMessage);
        }
      },
      (e) => {
        setLoading(true);
        toast.error(e.data.errorMessage);
      }
    );
  };

  const handleSubmit = () => {
    const order = Object.values(basket);
    GApushData("order product", {
      productId: order[0].productId,
      userId: GetUserId(),
      productTitle: order[0].title,
    });
    if (!isAuthenticated) {
      sessionStorage.setItem("OPVD", true);
      history.push("/v2/Identity/login");
    } else {
      OrderSerivce.CancelCurrentOrder().then(PlaceOrder).catch(PlaceOrder);
    }
  };

  const canSubmit = Object.keys(basket).length > 0;
  if (!data)
    return (
      <div className={classes.root}>
        <Grid item xs={12}>
          <IDivider title="محصول را انتخاب کنید" />
          <img src={Select} alt="select" style={{ width: "70%" }} />
        </Grid>
      </div>
    );
  return (
    <div className={classes.root}>
      <IDivider title="انتخاب بسته" />
      {data ? (
        <Grid
          item
          xs={12}
          style={{ height: "100%", position: "relative", paddingBottom: 10 }}
        >
          {data.vitrineType === VitrineTypes.Picker ? (
            <PickerVitrine data={data} toolBox={orderToolBox} />
          ) : data.vitrineType === VitrineTypes.SingleItem ? (
            <SingleItemVitrine data={data} toolBox={orderToolBox} />
          ) : data.vitrineType === VitrineTypes.MultiItem ? (
            <MultiItemVitrine data={data} toolBox={orderToolBox} />
          ) : null}
          {loading ? (
            <>
              {data?.item?.isPurchased ? (
                <>
                  {!AfterPurchased ? (
                    <Typography variant="h6">
                      <Button
                        className="Button"
                        onClick={() => history.push("/Profile/Orders")}
                      >
                        <Typography>نمایش</Typography>
                      </Button>
                      محصول خریداری شده
                    </Typography>
                  ) : (
                    <AfterPurchased isPurchased={data.item.isPurchased} />
                  )}
                </>
              ) : canSubmit ? (
                <Button
                  className="Button"
                  onClick={handleSubmit}
                  style={{ width: "50%", padding: "30px !important" }}
                >
                  <Typography> ثبت سفارش</Typography>
                </Button>
              ) : (
                <button className={classes.disableButton} disabled>
                  <Typography>بسته مورد نظر را انتخاب کنید</Typography>
                </button>
              )}
            </>
          ) : (
            <div className={classes.colorSecondary}>
              <CircularProgress size={17.5} color="inherit" />
            </div>
          )}
        </Grid>
      ) : (
        <>
          <IDivider title="در حال دریافت" />
          <Grid
            item
            xs={12}
            style={{ height: "80%" }}
            container
            alignItems="center"
            justifyContent="center"
          >
            <CircularProgress />
          </Grid>
        </>
      )}
    </div>
  );
}
