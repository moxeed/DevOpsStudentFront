import { Grid, makeStyles, Paper } from "@material-ui/core";
import Background from "../../Assets/Images/Poll.jpg";
import { Typography } from "antd";
import OrderCheckOut from "../../Components/Financial/OrderCheckOut";
import Text from "../../Assets/Text/text.json";
import React from "react";

const useStyles = makeStyles(() => ({
  centerContainer: {
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: `url(${Background})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover , contain",
    height: "92vh",
  },
  paperStyle: {
    background: "transparent",
    boxShadow: "none",
  },

  text: {
    padding: "8px",
    margin: "5px",
    fontSize: "14px",
  },
}));

const OrderCheckoutPage = () => {
  const classes = useStyles();
  return (
    <Grid container justifyContent="center" className={classes.centerContainer}>
      <Grid xs={10} md={4} item>
        <Paper className={classes.paperStyle}>
          <Typography className={classes.text}>
            {Text.orderCheckoutTitle}
          </Typography>
          <Typography className={classes.text}>
            {Text.orderCheckoutText}
          </Typography>
          <OrderCheckOut />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default OrderCheckoutPage;
